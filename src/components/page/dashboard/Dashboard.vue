<template>
    <section class="toolbar">
        <section class="content">
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-aqua" @click="statAll(0)"><i
                        class="ion ion-ios-people-outline"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">总用户数</span>
                        <span class="info-box-number">{{ userTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-red" @click="statAll(1)"><i
                        class="ion ion-android-person-add"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">昨日新增用户</span>
                        <span class="info-box-number">{{ yesterdayTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-green" @click="statAll(7)"><i class="fa fa-bar-chart"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">最近7天新增</span>
                        <span class="info-box-number">{{ weekTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-yellow" @click="statAll(30)"><i class="fa fa-area-chart"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">最近30天新增</span>
                        <span class="info-box-number">{{ monthTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="content">
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-light-blue" @click="statAll(190)"><i
                        class="ion ion-ios-people-outline"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">近90天活跃</span>
                        <span class="info-box-number">{{ threeMonthsActiveTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-blue" @click="statAll(11)"><i
                        class="ion-android-people"></i></span>

                    <div class="info-box-content">
                        <span class="info-box-text">昨日活跃用户</span>
                        <span class="info-box-number">{{ yesterdayActiveTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-teal" @click="statAll(17)"><i
                        class="ion ion-arrow-graph-up-right"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">最近7天活跃</span>
                        <span class="info-box-number">{{ weekActiveTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
            <div class="col-md-3 col-sm-6 col-xs-12">
                <div class="info-box">
                    <span class="info-box-icon bg-olive" @click="statAll(130)"><i class="fa fa-industry"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">最近30天活跃</span>
                        <span class="info-box-number">{{ monthActiveTotal | numFormat }}</span>
                    </div>
                </div>
            </div>
        </section>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="pie"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="pie_radius"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="22">
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="chartBar"></IEcharts>
                    </div>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12">
                <el-card class="box-card">
                    <div class="echarts">
                        <IEcharts :option="bar"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="45" :sm="45" :md="24" :lg="24">
                <el-card class="box-card">
                    <div class="c-charts">
                        <IEcharts :option="phoneBrand_chartBar"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="45" :sm="45" :md="24" :lg="24">
                <el-card class="box-card">
                    <div class="c-charts">
                        <IEcharts :option="pie_class"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="45" :sm="45" :md="24" :lg="24">
                <el-card class="box-card">
                    <div class="c-charts">
                        <IEcharts :option="app_version"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <p/>
        <el-row :gutter="20">
            <el-col :xs="45" :sm="45" :md="24" :lg="24">
                <el-card class="box-card">
                    <div class="c-charts">
                        <IEcharts :option="app_use_version"></IEcharts>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import {aggregate} from 'api/aggregate';
    import devTypebyDate from 'static/requestList/devType.json';
    import phoneModel from 'static/requestList/phoneModel.json';
    import sendMsgCountReq from 'static/requestList/sendMsgCount.json';
    import channelReq from 'static/requestList/channel.json';
    import channelCode from 'static/channelCode.json';
    import phoneBrandReq from 'static/requestList/phoneBrand.json';
    // 用户注册版本统计
    import appVersion from 'static/requestList/appVersion.json';
    // 活跃信息统计
    import activeDevType from 'static/requestList/activeDevType.json';
    import activeAppVersion from 'static/requestList/activeAppVersion.json';
    import activePhoneBrand from 'static/requestList/activePhoneBrand.json';
    import activePhoneModel from 'static/requestList/activePhoneModel.json';

    // 时间处理
    import moment from 'moment';

    export default {
        components: {
            IEcharts
        },
        data: () => ({
            mock: true, //设置为true时，展示mock展示数据
            total: {
                androidNum: 0,
                iosNum: 0,
                android1Num: 0,
                ios1Num: 0,
                android7Num: 0,
                ios7Num: 0,
                android30Num: 0,
                ios30Num: 0
            },
            activeTotal: {
                android90Num: 0,
                ios90Num: 0,
                android1Num: 0,
                ios1Num: 0,
                android7Num: 0,
                ios7Num: 0,
                android30Num: 0,
                ios30Num: 0
            },
            pie: {
//                color: ["#20a0ff","#61a0a8"],
                title: {
                    text: 'android/ios用户总占比',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [
                    {
                        name: 'Android、ios用户总占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            pie_radius: {

                color: ["#20a0ff", "#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"],
                title: {
                    text: '昨日Android/ios用户占比',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [
                    {
                        name: 'Android/ios用户占比',
                        type: 'pie',
                        radius: ['40%', '60%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            },
            chartBar: {
                // #20a0ff,"#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"
                color: ["#FF4949"],
                title: {
                    text: '',
                    subtext: 'app注册渠道'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['渠道']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '渠道',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            pie_class: {
                title: {
                    text: '',
                    x: 'right',
                    y: 'bottom'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
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
                    orient: 'vertical',
                    x: 'left',
                    data: []
                },
                series: [
                    {
                        name: '手机型号统计(android/ios)',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [2, '50%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    },
                    {
                        name: '手机型号',
                        type: 'pie',
                        radius: ['60%', '90%'],
                        data: []
                    }
                ]
            },
            bar: {
                title: {
                    text: '',
                    x: 'right'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    left: 'left',
                    data: []
                },
                grid: {
                    x: '10%',
                    y: '10%',
                    width: '85%',
                    show: true,

                },
                xAxis: {
                    type: 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ddd'
                        }
                    }

                },
                yAxis: {
                    type: 'category',
                    data: [],
                    axisLine: {
                        lineStyle: {
                            color: '#999'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ddd'
                        }
                    }

                },
                series: [
                    {
                        itemStyle: {
                            normal: {
                                color: '#63bbb2',
                                opacity: 0.9
                            }
                        },
                        name: '发送消息数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    },

                    {
                        itemStyle: {
                            normal: {
                                color: '#ef8989',
                                opacity: 0.9
                            }
                        },
                        name: '接收消息数',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: []
                    }
                ]
            },
            phoneBrand_chartBar: {
                // #20a0ff,"#13CE66", "#F7BA2A", "#FF4949", "#61a0a8"
                color: ["#20a0ff"],
                title: {
                    text: '',
                    subtext: 'TOP 20'
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
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: []
                },
                series: [
                    {
                        name: '注册用户数',
                        type: 'bar',
                        data: []
                    }
                ]
            },
            app_version: {
                title: {
                    text: '',
                    subtext: 'android/ios各个版本(注册版本)',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: 'android',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['25%', '50%'],
                        roseType: 'radius',
                        data: []
                    },
                    {
                        name: 'ios',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        data: []
                    },
                ]
            },
            app_use_version: {
                title: {
                    text: '',
                    subtext: 'android/ios各个版本(在用版本)',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x: 'center',
                    y: 'bottom',
                    data: []
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                series: [
                    {
                        name: 'android',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['25%', '50%'],
                        roseType: 'radius',
                        data: []
                    },
                    {
                        name: 'ios',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['75%', '50%'],
                        roseType: 'area',
                        data: []
                    },
                ]
            }
        }),
        filters: {
            // 格式化数字
            numFormat(num)
            {
                var num = (num || 0).toString(), result = '';
                while (num.length > 3) {
                    result = ',' + num.slice(-3) + result;
                    num = num.slice(0, num.length - 3);
                }
                if (num) {
                    result = num + result;
                }
                return result;
            }
        },
        computed: {
            userTotal()
            {
                // 计算属性: 用户总数
                return this.total.androidNum + this.total.iosNum;
            },
            yesterdayTotal()
            {
                // 计算属性: 昨天的用户总数
                return this.total.android1Num + this.total.ios1Num;
            },
            weekTotal()
            {
                // 计算属性: 7天内的用户总数
                return this.total.android7Num + this.total.ios7Num;
            },
            monthTotal()
            {
                // 计算属性: 30天内的用户总数
                return this.total.android30Num + this.total.ios30Num;
            },
            yesterdayActiveTotal()
            {
                // 计算属性: 昨天的活跃用户总数
                return this.activeTotal.android1Num + this.activeTotal.ios1Num;
            },
            weekActiveTotal()
            {
                // 计算属性: 7天内的活跃用户总数
                return this.activeTotal.android7Num + this.activeTotal.ios7Num;
            },
            monthActiveTotal()
            {
                // 计算属性: 30天内的活跃用户总数
                return this.activeTotal.android30Num + this.activeTotal.ios30Num;
            },
            threeMonthsActiveTotal()
            {
                // 计算属性: 90天内的活跃用户总数
                return this.activeTotal.android90Num + this.activeTotal.ios90Num;
            }
        },
        methods: {
            /**
             * android / iso 用户数统计 (汇总数据,昨天,7天前,30天前)
             * @param beginTime
             * @param endTime
             * @param type 0 : all,1 : yesterday, 7 : week,30 : month
             */
            devTypeStat: function (activeStat = false, beginTime = null, endTime = null, type = 0) {
                let params = activeStat ? activeDevType : devTypebyDate;
                // Object.assign 类似于java的继承
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'devTypeStat', 'type': type}, params)
                }
                aggregate(params)
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let devType = data[i]._id.deviceType;
                            if (1 === devType) {
                                devType = 'Android';
                                switch (type) {
                                    case 0:
                                        this.total.androidNum = value;
                                        break;
                                    case 1:
                                        this.total.android1Num = value;
                                        break;
                                    case 7:
                                        this.total.android7Num = value;
                                        break;
                                    case 30:
                                        this.total.android30Num = value;
                                        break;
                                    case 190:
                                        this.activeTotal.android90Num = value;
                                        break;
                                    case 11:
                                        this.activeTotal.android1Num = value;
                                        break;
                                    case 17:
                                        this.activeTotal.android7Num = value;
                                        break;
                                    case 130:
                                        this.activeTotal.android30Num = value;
                                        break;
                                    default:
                                        this.total.androidNum = value;
                                }

                            } else if (2 === devType) {
                                devType = 'ios';
                                switch (type) {
                                    case 0:
                                        this.total.iosNum = value;
                                        break;
                                    case 1:
                                        this.total.ios1Num = value
                                        break;
                                    case 7:
                                        this.total.ios7Num = value
                                        break;
                                    case 30:
                                        this.total.ios30Num = value
                                        break;
                                    case 190:
                                        this.activeTotal.ios90Num = value
                                        break;
                                    case 11:
                                        this.activeTotal.ios1Num = value
                                        break;
                                    case 17:
                                        this.activeTotal.ios7Num = value
                                        break;
                                    case 130:
                                        this.activeTotal.ios30Num = value
                                        break;
                                    default:
                                        this.total.iosNum = value
                                }
                            } else {
                                devType = 'unKnow';
                            }
                            if (0 == type) {
                                this.pie.legend.data.push(devType);
                                this.pie.series[0].data.push({'name': devType, 'value': value})
                            } else if (1 == type) {
                                this.pie_radius.legend.data.push(devType);
                                this.pie_radius.series[0].data.push({'name': devType, 'value': value})
                            }
                        }
                    });
            },
            /**
             * 按渠道统计
             */
            channalStat: function (beginTime = null, endTime = null, statInterval) {
                let params = channelReq;
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                } else {
                    // 渠道统计从4月1号开始
                    params = Object.assign({'starttime': "2017-6-1 0:0:0"}, params)
                }

                if (this.mock) {
                    params = Object.assign({'statFunc': 'channalStat', 'type': 0}, params)
                }

                aggregate(params)
                    .then(data => {
                        this.chartBar.title.text = '渠道统计' + statInterval;
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let name = data[i]._id.channel;
                            // 取不到的，则直接展示渠道编码
                            this.chartBar.yAxis.data.push(null == channelCode[name] ? name : channelCode[name]);
                            this.chartBar.series[0].data.push(value)
                        }
                    });

            },
            /**
             * 按发送消息数统计
             */
            sendMsgCountRank: function (beginTime = null, endTime = null, statInterval) {
                let params = sendMsgCountReq;
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'sendMsgCountRank', 'type': 0}, params)
                }
                aggregate(params)
                    .then(data => {
                        this.bar.title.text = '发送消息数' + statInterval + ' TOP 10'
                        this.bar.legend.data = ['发送消息数', '接收消息数']
                        for (let i = data.length - 1; i >= 0; i--) {
                            let nickname = data[i]._id.nickname;
                            let recv = data[i]._id.recv;
                            let send = data[i]._id.send;

                            this.bar.yAxis.data.push(nickname);
                            this.bar.series[0].data.push(send);
                            this.bar.series[1].data.push(recv);
                        }
                    });

            },
            /**
             * 按手机型号统计
             */
            phoneModelStat: function (activeStat = false, beginTime = null, endTime = null, statInterval) {
                let params = activeStat ? activePhoneModel : phoneModel;
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'phoneModelStat', 'type': 0}, params)
                }
                aggregate(params)
                    .then(data => {
                        let androidNum = 0;
                        let iosNum = 0;
                        let activeUser = activeStat ? '活跃' : ''
                        this.pie_class.title.text = '手机型号' + activeUser + '用户数统计' + statInterval + ' TOP20'
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let deviceModel = data[i]._id.deviceModel;
                            let deviceType = data[i]._id.deviceType;
                            if (1 == deviceType) {
                                deviceType = 'android';
                                androidNum += value;
                            } else if (2 == deviceType) {
                                deviceType = 'ios'
                                iosNum += value;
                            }
                            this.pie_class.legend.data.push(deviceModel);
                            this.pie_class.series[1].data.push({value: value, name: deviceModel})
                        }
                        this.pie_class.series[0].data.push(
                            {
                                value: iosNum,
                                name: 'ios',
                                itemStyle: {
                                    normal: {
                                        color: '#ec7777'
                                    }
                                }
                            },
                            {
                                value: androidNum,
                                name: 'android',
                                selected: true,
                                itemStyle: {normal: {color: '#4cb1a7'}}
                            });
                    });
            },
            /**
             * 按手机品牌统计
             */
            phoneBrandStat: function (activeStat = false, beginTime = null, endTime = null, statInterval) {
                let params = activeStat ? activePhoneBrand : phoneBrandReq;
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'phoneBrandStat', 'type': 0}, params)
                }
                aggregate(params)
                    .then(data => {
                        let activeUser = activeStat ? '(活跃用户)' : ''
                        this.phoneBrand_chartBar.title.text = '手机品牌' + activeUser + statInterval;
                        for (let i = data.length - 1; i >= 0; i--) {
                            let value = data[i].num;
                            let name = data[i]._id.brand;
                            // 取不到的，则直接展示渠道编码
                            this.phoneBrand_chartBar.yAxis.data.push(name);
                            this.phoneBrand_chartBar.series[0].data.push(value)
                        }
                    });
            },
            /**
             * 按APP版本分布统计
             */
            appVersionlStat: function (beginTime = null, endTime = null, statInterval) {
                let params = appVersion;
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'appVersionlStat', 'type': 0}, params)
                }
                aggregate(params)
                    .then(data => {
                        this.app_version.title.text = 'APP 注册版本统计' + statInterval;
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let bluVer = data[i]._id.bluVer;
                            let deviceType = data[i]._id.deviceType;
                            if (1 == deviceType) {
                                deviceType = 'android';
                                this.app_version.series[0].data.push({value: value, name: deviceType + ' ' + bluVer});
                            } else if (2 == deviceType) {
                                deviceType = 'ios'
                                this.app_version.series[1].data.push({value: value, name: deviceType + ' ' + bluVer})
                            }
                            this.app_version.legend.data.push(deviceType + ' ' + bluVer);
                        }
                    });
            },
            /**
             * 按APP版本分布统计
             */
            appUseVersionlStat: function (beginTime = null, endTime = null, statInterval) {
                let params = activeAppVersion;
                if (null != beginTime && null != endTime) {
                    params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
                }
                if (this.mock) {
                    params = Object.assign({'statFunc': 'appUseVersionlStat', 'type': 0}, params)
                }
                aggregate(params)
                    .then(data => {
                        this.app_use_version.title.text = 'APP 在用版本统计' + statInterval;
                        for (let i = 0; i < data.length; i++) {
                            let value = data[i].num;
                            let bluVer = data[i]._id.bluVer;
                            let deviceType = data[i]._id.deviceType;
                            if (1 == deviceType) {
                                deviceType = 'android';
                                this.app_use_version.series[0].data.push({
                                    value: value,
                                    name: deviceType + ' ' + bluVer
                                });
                            } else if (2 == deviceType) {
                                deviceType = 'ios'
                                this.app_use_version.series[1].data.push({
                                    value: value,
                                    name: deviceType + ' ' + bluVer
                                })
                            }
                            this.app_use_version.legend.data.push(deviceType + ' ' + bluVer);
                        }
                    });
            },
            initData: function () {

                this.pie.legend.data = [];
                this.pie.series[0].data = [];
                this.pie_radius.legend.data = [];
                this.pie_radius.series[0].data = [];

                this.chartBar.yAxis.data = [];
                this.chartBar.series[0].data = [];

                this.bar.legend.data = [];
                this.bar.yAxis.data = [];
                this.bar.series[0].data = [];
                this.bar.series[1].data = [];

                this.pie_class.legend.data = [];
                this.pie_class.series[1].data = [];
                this.pie_class.series[0].data = [];


                this.phoneBrand_chartBar.yAxis.data = [];
                this.phoneBrand_chartBar.series[0].data = [];

                this.app_version.series[0].data = [];
                this.app_version.series[1].data = [];
                this.app_version.legend.data = [];

                this.app_use_version.series[0].data = [];
                this.app_use_version.series[1].data = [];
                this.app_use_version.legend.data = [];

            },
            statAll: function (statType) {

                let _this = this;

                // 统计前初始化数据先，新增统计需要在此配置好初始化
                _this.initData();

                // Android和ios的总数占比
                _this.devTypeStat(false, null, null, 0);

                let starttime1 = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');

                let endtime = moment().format('YYYY-MM-DD 0:0:0');

                let starttime7 = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');

                let starttime30 = moment().subtract(30, 'days').format('YYYY-MM-DD 0:0:0');

                let starttime90 = moment().subtract(90, 'days').format('YYYY-MM-DD 0:0:0');

                let beginDate = null;
                let currentDate = null;
                let activeStat = false;

                let statInterval = '';

                switch (statType) {
                    case 0:
                        break;
                    case 1:
                        beginDate = starttime1;
                        currentDate = endtime;
                        statInterval = '(昨天)';
                        break;
                    case 7:
                        beginDate = starttime7;
                        currentDate = endtime;
                        statInterval = '(7天)';
                        break;
                    case 30:
                        beginDate = starttime30;
                        currentDate = endtime;
                        statInterval = '(30天)';
                        break;
                    case 190:
                        activeStat = true;
                        beginDate = starttime90;
                        currentDate = endtime;
                        statInterval = '(90天)';
                        break;
                    case 11:
                        activeStat = true;
                        beginDate = starttime1;
                        currentDate = endtime;
                        statInterval = '(昨天)';
                        break;
                    case 17:
                        activeStat = true;
                        beginDate = starttime7;
                        currentDate = endtime;
                        statInterval = '(7天)';
                        break;
                    case 130:
                        activeStat = true;
                        beginDate = starttime30;
                        currentDate = endtime;
                        statInterval = '(30天)';
                        break;
                    default:
                        break;
                }

                // Android和ios 昨天的占比
                _this.devTypeStat(false, starttime1, endtime, 1);

                // Android和ios 一周内的占比
                _this.devTypeStat(false, starttime7, endtime, 7);

                // Android和ios 一个月的占比
                _this.devTypeStat(false, starttime30, endtime, 30);

                // Android和ios 90天的活跃用户统计
                _this.devTypeStat(true, starttime90, endtime, 190);

                // Android和ios 昨天的活跃用户统计
                _this.devTypeStat(true, starttime1, endtime, 11);

                // Android和ios 一周内的活跃用户统计
                _this.devTypeStat(true, starttime7, endtime, 17);

                // Android和ios 一个月的活跃用户统计
                _this.devTypeStat(true, starttime30, endtime, 130);

//                ------------------------------------------------------------------------

                // 注册渠道占比统计 渠道统计最早从4-1日开始
                _this.channalStat(beginDate, currentDate, statInterval);

                // 手机型号TOP 20
                _this.phoneModelStat(activeStat, beginDate, currentDate, statInterval);

                // 按发送消息数最多的 TOP 10
                _this.sendMsgCountRank(beginDate, currentDate, statInterval);

                // 手机品牌统计 TOP 20
                _this.phoneBrandStat(activeStat, beginDate, currentDate, statInterval);

                // app 注册版本统计
                _this.appVersionlStat(beginDate, currentDate, statInterval);

                // app 在用版本统计
                _this.appUseVersionlStat(beginDate, currentDate, statInterval);
            }
        },
        mounted: function () {
            this.statAll(0);
        }
    } ;
</script>

<style scoped>
    .echarts {
        float: left;
        width: 500px;
        height: 400px;
    }

    .info-box {
        cursor: pointer;
    }

    .info-box-content {
        text-align: center;
        vertical-align: middle;
        display: inherit;
    }

    .c-charts {
        height: 500px;
        width: 100%;
    }

    .info-box {
        cursor: pointer;
    }

    .content {
        min-height: 100px;
    }
</style>
