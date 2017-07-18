<template>
    <section>
        <!--<div class="crumbs">-->
        <!--<el-breadcrumb separator="/">-->
        <!--<el-breadcrumb-item><i class="el-icon-date"></i> 数据趋势</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>7天数据趋势</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <!--</div>-->
        <!--工具条-->
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
                    <el-button type="primary" v-on:click="cycleUserNumsStat">查询</el-button>
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
    //    import {aggregate}  from '../../api';
    import {aggregate} from 'api/aggregate';
    import monthUserNumsReq from 'static/requestList/cycleUserNum.json';
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
                    color: ["#13CE66", "#20a0ff", "#F7BA2A"],
                    title: {
                        text: '用户增长趋势',
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
                            type: "bar",
                            data: []
                        },
                        {
                            name: "",
                            type: "bar",
                            data: []
                        },
                        {
                            name: "",
                            type: "line",
                            data: []
                        },
                    ]
                }
            };
        },
        components: {
            IEcharts
        },
        methods: {
            initDate: function () {

                let _this = this;

                _this.cycle_mix.xAxis.data = [];

                // android的用户数
                _this.cycle_mix.series[0].data = [];

                // ios的用户数ios
                _this.cycle_mix.series[1].data = [];

                // android 及 ios的用户数
                _this.cycle_mix.series[2].data = [];
            },
            /**
             * 统计7天内的用户增长情况
             */
            cycleUserNumsStat: function () {
                let params = monthUserNumsReq;
                if (null != this.beginTime && null != this.endTime) {

                    let starttime = moment(this.beginTime).format('YYYY-MM-DD 0:0:0');
                    let endtime = moment(this.endTime).format('YYYY-MM-DD 0:0:0');


                    params = Object.assign({'starttime': starttime, 'endtime': endtime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'cycleUserNumsStat', 'type': 0}, params)
                }
                this.initDate();
                aggregate(params)
                    .then(data => {
                        this.cycle_mix.legend.data = ['Android', 'ios', '总数'];
                        this.cycle_mix.series[0].name = 'Android';
                        this.cycle_mix.series[1].name = 'ios';
                        this.cycle_mix.series[2].name = '总数';

                        let dateNum = moment(this.endTime).diff(moment(this.beginTime), 'days')

                        for (let j = dateNum; j > 0; j--) {

                            let tododay = moment(this.endTime).subtract(j, 'days').format('YYYY-MM-DD');

                            this.cycle_mix.xAxis.data.push(tododay);

                            let androidNum = 0;
                            let iosNum = 0;
                            for (let i = data.length - 1; i >= 0; i--) {

                                let day = data[i]._id.day;
                                let deviceType = data[i]._id.deviceType;
                                let num = data[i].num;

                                if (day == tododay) {

                                    if (1 == deviceType) {
                                        androidNum = num;

                                    } else if (2 == deviceType) {
                                        iosNum = num;
                                    }
                                }
                            }

                            // android的用户数
                            this.cycle_mix.series[0].data.push(androidNum);

                            // ios的用户数ios
                            this.cycle_mix.series[1].data.push(iosNum);

                            // android 及 ios的用户数
                            this.cycle_mix.series[2].data.push(androidNum + iosNum);
                        }
                    });

            },
        },
        mounted: function () {
            this.beginTime = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
            this.endTime = moment().format('YYYY-MM-DD 0:0:0');

            this.cycleUserNumsStat();
        }
    };
</script>

<style scoped>
    .mix-echarts {
        width: 100%;
        height: 600px;
    }
</style>
