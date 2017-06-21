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
                        :picker-options="pickerOptions3">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions3">
                    </el-date-picker>
                    <el-button type="primary" v-on:click="cycleMsgNumStat">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <div v-show="showReturnButton">
            <strong>用户聊天消息趋势</strong> /
            <router-link :to="{ path: previousPage }">返回

            </router-link>
        </div>
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
    import cycleMsgNumReq from '../../../../../static/requestList/cycleMsgNum.json';
    // 时间处理
    import moment from 'moment';
    export default {
        data: function () {
            return {
                mock: true,
                pickerOptions3: {
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
                queryUser: {
                    userIds: this.$route.params.userIds,
                    nickname: this.$route.params.nickname,
                },
                previousPage: this.$route.params.previousPage,
                showReturnButton: false,
                cycle_mix: {
                    color: ["#2e4fce", "#3AAAF7", "#CEB210", "#35CE89"],
                    title: {
                        text: '',
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
                            stack: 'send',
                            type: "bar",
                            data: []
                        },
                        {
                            name: "",
                            stack: 'send',
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
                            type: "bar",
                            data: []
                        },
                    ]
                }
            }
        },
        components: {
            IEcharts
        },
        methods: {
            initDate: function () {
                this.cycle_mix.title.text = '';

                this.cycle_mix.xAxis.data = [];

                this.cycle_mix.series[0].data = [];

                this.cycle_mix.series[1].data = [];

                this.cycle_mix.series[2].data = [];

                this.cycle_mix.series[3].data = [];
            },
            /**
             * 统计7天内好友关系相关数据
             */
            cycleMsgNumStat: function () {
                let params = cycleMsgNumReq;


                // 如果 userId存在 TODO 需要重构
                if (null != this.queryUser.userIds) {

                    this.showReturnButton = true

                    params.pipeline = Object.assign(params.pipeline, [{
                        "$match": {
                            "fromUserId": {"$in": [this.queryUser.userIds]}
                        }
                    }, {
                        "$group": {
                            "_id": {
                                "day": {
                                    "$dateToString": {
                                        "format": "%Y-%m-%d",
                                        "date": {"$add": ["$_created", 28800000]}
                                    }
                                },
                                "objectName": "$objectName"
                            },
                            "num": {"$sum": 1}
                        }
                    },
                        {"$sort": {"_id.day": 1}}
                    ]);

                    params = Object.assign({'ObjectId': [[0, '$match', 'fromUserId', '$in']]}, params);
                } else {

                    params.pipeline = Object.assign(params.pipeline, [{
                        "$group": {
                            "_id": {
                                "day": {
                                    "$dateToString": {
                                        "format": "%Y-%m-%d",
                                        "date": {"$add": ["$_created", 28800000]}
                                    }
                                },
                                "objectName": "$objectName"
                            },
                            "num": {"$sum": 1}
                        }
                    },
                        {"$sort": {"_id.day": 1}}
                    ]);
                }

                if ('' != this.beginTime && '' != this.endTime) {

                    let starttime = moment(this.beginTime).format('YYYY-MM-DD 0:0:0');
                    let endtime = moment(this.endTime).format('YYYY-MM-DD 0:0:0');
                    params = Object.assign({'starttime': starttime, 'endtime': endtime}, params)
                }

                if (this.mock) {
                    params = Object.assign({'statFunc': 'cycleMsgNumStat', 'type': 0}, params)
                }
                this.initDate();
                aggregate(params)
                    .then(data => {

                        this.cycle_mix.title.text = null != this.queryUser.nickname ? this.queryUser.nickname + '‘聊天消息数量趋势' : '聊天消息数量趋势';

                        this.cycle_mix.legend.data = ['发送图片', '发送视频', '用户截屏', '消息已读'];
                        this.cycle_mix.series[0].name = '发送图片';
                        this.cycle_mix.series[1].name = '发送视频';
                        this.cycle_mix.series[2].name = '用户截屏';
                        this.cycle_mix.series[3].name = '消息已读';

                        let dateNum = moment(this.endTime).diff(moment(this.beginTime), 'days')

                        for (let j = dateNum; j > 0; j--) {

                            let tododay = moment(this.endTime).subtract(j, 'days').format('YYYY-MM-DD');

                            this.cycle_mix.xAxis.data.push(tododay);

                            let imgNum = 0;
                            let videoNum = 0;
                            let screenShootNum = 0;
                            let readNum = 0;

                            for (let i = data.length - 1; i >= 0; i--) {

                                let day = data[i]._id.day;
                                let objectName = data[i]._id.objectName;
                                let num = data[i].num;

                                if (day == tododay) {

                                    if ('app:image' === objectName) {
                                        imgNum = num;
                                    } else if ('app:video' === objectName) {
                                        videoNum = num;
                                    } else if ('app:screenshoot' === objectName) {
                                        screenShootNum = num;
                                    } else if ('app:receiptMedia' === objectName) {
                                        readNum = num;
                                    }
                                }
                            }

                            this.cycle_mix.series[0].data.push(imgNum);

                            this.cycle_mix.series[1].data.push(videoNum);

                            this.cycle_mix.series[2].data.push(screenShootNum);

                            this.cycle_mix.series[3].data.push(readNum);
                        }
                    });
            },
        },
        mounted: function () {
            this.beginTime = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
            this.endTime = moment().format('YYYY-MM-DD 0:0:0');

            this.cycleMsgNumStat();
        }
    };
</script>

<style scoped>
    .mix-echarts {
        width: 100%;
        height: 600px;
    }
</style>
