<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker
                        v-model="beginTime"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-button type="primary" v-on:click="cycleFrisNumStat">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-card class="box-card">
                <div class="mix-echarts">
                    <IEcharts :option="cycle_mix"></IEcharts>
                </div>
            </el-card>
        </el-col>
    </section>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
//    import {aggregate}  from '../../../../api';
    import {aggregate} from 'api/aggregate';
    import cycleFrisNumReq from '../../../../../static/requestList/cycleFrisNum.json';
    // 时间处理
    import moment from 'moment';
    export default {
        data: function () {
            return {
                mock: true,
                pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '7天前',
                        onClick(picker) {
                            const date = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '30天前',
                        onClick(picker) {
                            const date = moment().subtract(30, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }]
                },
                beginTime: '',
                endTime: '',
                cycle_mix: {
                    color: ["#4292ce", "#7291F7", "#13ff13", "#cecec6", "#F7F597", "#020204"],
                    title: {
                        text: '用户关系趋势',
                        x: 'left'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    legend: {
                        data: []
                    },
                    xAxis: {
                        data: []
                    },
                    yAxis: {},
                    series: [
                        {
                            name: "",
                            stack: 'Approval',
                            type: "bar",
                            data: []
                        },
                        {
                            name: "",
                            stack: 'Approval',
                            type: "bar",
                            data: []
                        },
                        {
                            name: "",
                            type: "line",
                            data: []
                        },
                        {
                            name: "",
                            type: "line",
                            data: []
                        },
                        {
                            name: "",
                            type: "line",
                            data: []
                        },
                        {
                            name: "",
                            type: "line",
                            data: []
                        }
                    ]
                }
            }
        },
        components: {
            IEcharts
        },
        methods: {
            initDate: function () {
                this.cycle_mix.xAxis.data = [];

                this.cycle_mix.series[0].data = [];

                this.cycle_mix.series[1].data = [];

                this.cycle_mix.series[2].data = [];

                this.cycle_mix.series[3].data = [];

                this.cycle_mix.series[4].data = [];

                this.cycle_mix.series[5].data = [];

//                this.cycle_mix.series[6].data = [];
            },
            /**
             * 统计7天内好友关系相关数据
             */
            cycleFrisNumStat: function () {
                let params = cycleFrisNumReq;
                if (null != this.beginTime && null != this.endTime) {

                    let starttime = moment(this.beginTime).format('YYYY-MM-DD 0:0:0');
                    let endtime = moment(this.endTime).format('YYYY-MM-DD 0:0:0');
                    params = Object.assign({'starttime': starttime, 'endtime': endtime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'cycleFrisNumStat', 'type': 0}, params)
                }
                this.initDate();
                aggregate(params)
                    .then(data => {
                        this.cycle_mix.legend.data = ['已申请', '待审批', '已是好友', '已删除', '忽略', '加入黑名单'];
                        this.cycle_mix.series[0].name = '已申请';
                        this.cycle_mix.series[1].name = '待审批';
                        this.cycle_mix.series[2].name = '已是好友';
                        this.cycle_mix.series[3].name = '已删除';
                        this.cycle_mix.series[4].name = '忽略';
                        this.cycle_mix.series[5].name = '加入黑名单';
//                        this.cycle_mix.series[6].name = '移除黑名单';

                        let dateNum = moment(this.endTime).diff(moment(this.beginTime), 'days')

                        for (let j = dateNum; j > 0; j--) {

                            let tododay = moment(this.endTime).subtract(j, 'days').format('YYYY-MM-DD');

                            this.cycle_mix.xAxis.data.push(tododay);

                            let applyNum = 0;
                            let pendingNum = 0;
                            let friendNum = 0;
                            let removeFriendNum = 0;
                            let ignoreNum = 0;
                            let addBlacklist = 0;
                            for (let i = data.length - 1; i >= 0; i--) {

                                let day = data[i]._id.day;
                                let state = data[i]._id.state;
                                let secret = data[i]._id.secret;
                                let num = data[i].num;

                                if (day == tododay) {

                                    if (secret) {

                                        if (1 == secret) {
                                            addBlacklist += num
                                        }
                                    }

                                    if (1 == state) {
                                        applyNum += num;
                                    } else if (2 == state) {
                                        pendingNum += num;
                                    } else if (3 == state) {
                                        // 好友关系是双向的
                                        friendNum += num / 2;
                                    } else if (0 == state) {
                                        // 删除好友关系是双向的
                                        removeFriendNum += num / 2;
                                    } else if (4 == state) {
                                        // 忽略
                                        ignoreNum += num;
                                    }
                                }
                            }
                            this.cycle_mix.series[0].data.push(applyNum);

                            this.cycle_mix.series[1].data.push(pendingNum);

                            this.cycle_mix.series[2].data.push(friendNum);

                            this.cycle_mix.series[3].data.push(removeFriendNum);

                            this.cycle_mix.series[4].data.push(ignoreNum);

                            this.cycle_mix.series[5].data.push(addBlacklist);

                        }
                    });
            },
        },
        mounted: function () {
            this.beginTime = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
            this.endTime = moment().format('YYYY-MM-DD 0:0:0');

            this.cycleFrisNumStat();
        }
    };
</script>

<style scoped>
    .mix-echarts {
        width: 100%;
        height: 600px;
    }
</style>
