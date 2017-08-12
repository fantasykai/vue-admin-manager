<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <div class="mix-echarts">
                <IEcharts :option="usernums_city"></IEcharts>
            </div>
        </el-col>
    </section>
</template>
<script>
    import IEcharts from 'vue-echarts-v3/src/full.vue';
    import china from 'static/map/china.json';
    IEcharts.registerMap('china', china);
    //    import {aggregate}  from '../../api';
    import {aggregate} from 'api/aggregate';
    import userNumByGeoReq from 'static/requestList/userNumByGeo.json';
    // 时间处理
    import moment from 'moment';
    export default {
        data: function () {
            return {
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
                queryUser: {
                    userIds: this.$route.params.userIds,
                    nickname: this.$route.params.nickname,
                },
                previousPage: this.$route.params.previousPage,
                showReturnButton: false,
                city_data: [],
                geoCoordMap: {},
                convertedData: [],
                categoryData: [],
                barData: [],
                sum: 0,
                count: 0,
                usernums_city: {
                    backgroundColor: '#404a59',
                    animation: true,
                    animationDuration: 1000,
                    animationEasing: 'cubicInOut',
                    animationDurationUpdate: 1000,
                    animationEasingUpdate: 'cubicInOut',
                    title: [{
                        text: '用户城市分布图',
                        subtext: '数据随便填的',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    }, {
                        id: 'statistic',
                        text: '',
                        right: 120,
                        top: 40,
                        width: 100,
                        textStyle: {
                            color: '#fff',
                            fontSize: 16
                        }
                    }],
                    toolbox: {
                        iconStyle: {
                            normal: {
                                borderColor: '#fff'
                            },
                            emphasis: {
                                borderColor: '#b1e4ff'
                            }
                        },
                        feature: {
                            dataZoom: {},
                            brush: {
                                type: ['rect', 'polygon', 'clear']
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    brush: {
                        outOfBrush: {
                            color: '#abc'
                        },
                        brushStyle: {
                            borderWidth: 2,
                            color: 'rgba(0,0,0,0.2)',
                            borderColor: 'rgba(0,0,0,0.5)',
                        },
                        seriesIndex: [0, 1],
                        throttleType: 'debounce',
                        throttleDelay: 300,
                        geoIndex: 0
                    },
                    geo: {
                        map: 'china',
                        left: '10',
                        right: '35%',
                        center: [117.98561551896913, 31.205000490896193],
                        zoom: 1.5,
                        label: {
                            emphasis: {
                                show: false
                            }
                        },
                        roam: true,
                        itemStyle: {
                            normal: {
                                areaColor: '#323c48',
                                borderColor: '#111'
                            },
                            emphasis: {
                                areaColor: '#2a333d'
                            }
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        right: 40,
                        top: 100,
                        bottom: 40,
                        width: '30%'
                    },
                    xAxis: {
                        type: 'value',
                        scale: true,
                        position: 'top',
                        boundaryGap: false,
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            margin: 2,
                            textStyle: {
                                color: '#aaa'
                            }
                        },
                    },
                    yAxis: {
                        type: 'category',
                        //  name: 'TOP 20',
                        nameGap: 16,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisTick: {
                            show: false,
                            lineStyle: {
                                color: '#ddd'
                            }
                        },
                        axisLabel: {
                            interval: 0,
                            textStyle: {
                                color: '#ddd'
                            }
                        },
                        data: []
                    },
                    series: [{
                        // name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: function (val) {
                            return Math.max(val[2] / 300, 8);
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FF8C00',
                                position: 'right',
                                show: true
                            }
                        }
                    }, {
                        //  name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        data: [],
                        symbolSize: function (val) {
                            return Math.max(val[2] / 500, 8);
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 50,
                                shadowColor: '#EE0000'
                            }
                        },
                        zlevel: 1
                    }, {
                        id: 'bar',
                        zlevel: 2,
                        type: 'bar',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        },
                        data: []
                    }]
                },
            };
        },
        components: {
            IEcharts
        },
        methods: {
            convertData: function (data) {
                let res = [];
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = this.geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            },
            testGeoDate: function () {
                this.city_data = [{
                    name: "上海",
                    value: 29780
                }, {
                    name: "珠海",
                    value: 2186
                }, {
                    name: "三亚",
                    value: 1135
                }, {
                    name: "惠州",
                    value: 1973
                }, {
                    name: "海口",
                    value: 2568
                }, {
                    name: "合肥",
                    value: 4039
                }, {
                    name: "南京",
                    value: 6959
                }, {
                    name: "杭州",
                    value: 5632
                }, {
                    name: "苏州",
                    value: 6707
                }, {
                    name: "无锡",
                    value: 3393
                }, {
                    name: "昆山",
                    value: 1894
                }, {
                    name: "广州",
                    value: 15769
                }, {
                    name: "深圳",
                    value: 8259
                }, {
                    name: "佛山",
                    value: 5741
                }, {
                    name: "东莞",
                    value: 3030
                }, {
                    name: "福州",
                    value: 4542
                }, {
                    name: "厦门",
                    value: 3329
                }, {
                    name: "南宁",
                    value: 3157
                }, {
                    name: "郑州",
                    value: 6690
                }, {
                    name: "武汉",
                    value: 8678
                }, {
                    name: "长沙",
                    value: 5303
                }, {
                    name: "南昌",
                    value: 3025
                }, {
                    name: "北京",
                    value: 20259
                }, {
                    name: "长春",
                    value: 3016
                }, {
                    name: "大连",
                    value: 3202
                }, {
                    name: "沈阳",
                    value: 4540
                }, {
                    name: "哈尔滨",
                    value: 3141
                }, {
                    name: "天津",
                    value: 8626
                }, {
                    name: "济南",
                    value: 4361
                }, {
                    name: "青岛",
                    value: 6667
                }, {
                    name: "太原",
                    value: 4080
                }, {
                    name: "石家庄",
                    value: 6137
                }, {
                    name: "西安",
                    value: 6991
                }, {
                    name: "成都",
                    value: 13873
                }, {
                    name: "重庆",
                    value: 13283
                }, {
                    name: "昆明",
                    value: 4633
                },

                ];
                this.geoCoordMap = {
                    "上海": [121.48, 31.22],
                    "珠海": [113.52, 22.3],
                    "三亚": [109.31, 18.14],
                    "惠州": [114.4, 23.09],
                    "海口": [110.35, 20.02],
                    "合肥": [117.27, 31.86],
                    "南京": [118.78, 32.04],
                    "杭州": [120.19, 30.26],
                    "苏州": [120.62, 31.32],
                    "无锡": [120.29, 31.59],
                    "昆山": [120.95, 31.39],
                    "广州": [113.23, 23.16],
                    "深圳": [114.07, 22.62],
                    "佛山": [113.11, 23.05],
                    "东莞": [113.75, 23.04],
                    "福州": [119.3, 26.08],
                    "厦门": [118.1, 24.46],
                    "南宁": [108.33, 22.84],
                    "郑州": [113.65, 34.76],
                    "武汉": [114.31, 30.52],
                    "长沙": [113, 28.21],
                    "南昌": [115.89, 28.68],
                    "北京": [116.46, 39.92],
                    "长春": [125.35, 43.88],
                    "大连": [121.62, 38.92],
                    "沈阳": [123.38, 41.8],
                    "哈尔滨": [126.63, 45.75],
                    "天津": [117.2, 39.13],
                    "济南": [117, 36.65],
                    "青岛": [120.33, 36.07],
                    "太原": [112.53, 37.87],
                    "石家庄": [114.48, 38.03],
                    "西安": [108.95, 34.27],
                    "成都": [104.06, 30.67],
                    "重庆": [106.54, 29.59],
                    "昆明": [102.73, 25.04],
                };
                this.convertedData = [
                    this.convertData(this.city_data),
                    this.convertData(this.city_data.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 6))
                ];
                this.city_data.sort(function (a, b) {
                    return a.value - b.value;
                });
                this.selectedItems = [];
                this.categoryData = [];
                this.barData = [];
//   var maxBar = 30;
                this.sum = 0;
                this.count = this.city_data.length;
                for (let i = 0; i < this.city_data.length; i++) {
                    this.categoryData.push(this.city_data[i].name);
                    this.barData.push(this.city_data[i].value);
                    this.sum += this.city_data[i].value;
                }

                this.usernums_city.title[1].text = this.count ? '总数: ' + this.sum : '';
                this.usernums_city.yAxis.data = this.categoryData;
                this.usernums_city.series[0].data = this.convertedData[0];
                this.usernums_city.series[1].data = this.convertedData[0];
                this.usernums_city.series[2].data = this.convertedData[0];
            },
            initDate: function () {
                this.usernums_city.title[1].text = '';
                this.usernums_city.yAxis.data = [];
                this.usernums_city.series[0].data = [];
                this.usernums_city.series[1].data = [];
                this.usernums_city.series[2].data = [];
            },
            /**
             * 按城市统计用户数
             */
            getUserNumsByCity: function () {
                let params = userNumByGeoReq;
//                if (null != this.beginTime && null != this.endTime) {
//
//                    let starttime = moment(this.beginTime).subtract(8, 'hours').format('YYYY-MM-DD HH:mm:ss');
//                    let endtime = moment(this.endTime).add(16, 'hours').format('YYYY-MM-DD HH:mm:ss');
//                    params = Object.assign({'starttime': starttime, 'endtime': endtime}, params)
//                }
                this.initDate();
                aggregate(params)
                    .then(data => {
                        let result = data;
                        for (let i = 0; i < result.length; i++) {
                            if (result[i]._id.latitude) {
                                let cityName = result[i]._id.city;
                                let userNum = result[i].num;
                                if (null === cityName) {
                                    cityName = '未知'
                                }
                                let cityUserNum = {
                                    'name': cityName, 'value': userNum
                                };
                                this.city_data.push(cityUserNum);
                                let latitudeAndlongitude = [];
                                let longitude = result[i]._id.longitude;
                                let latitude = result[i]._id.latitude;
                                latitudeAndlongitude = [longitude, latitude];
                                this.geoCoordMap[cityName] = latitudeAndlongitude;

                            }
                        }
                        this.convertedData = [
                            this.convertData(this.city_data),
//                            this.convertData(this.city_data.sort(function (a, b) {
//                                return b.value - a.value;
//                            }).slice(0, 6))
                        ];
//                        this.city_data.sort(function (a, b) {
//                            return a.value - b.value;
//                        });
                        this.selectedItems = [];
                        this.categoryData = [];
                        this.barData = [];
//   var maxBar = 30;
                        this.sum = 0;
                        this.count = this.city_data.length;
                        for (let j = this.count - 1; j >= 0; j--) {
                            let cityInfo = this.city_data[j];
                            // 只展示前30的城市
                            if (j <= 30) {
                                this.categoryData.push(cityInfo.name);
                                this.barData.push(cityInfo.value);
                            }
                            this.sum += cityInfo.value;
                        }

                        this.usernums_city.title[1].text = this.count ? '排行只展示前30城市 | 总数(所有): ' + this.sum : '';
                        this.usernums_city.yAxis.data = this.categoryData;
                        this.usernums_city.series[0].data = this.convertedData[0];
                        this.usernums_city.series[1].data = this.convertedData[0];
                        this.usernums_city.series[2].data = this.barData;
                    });
            },
        },
        mounted: function () {
//            this.getUserNumsByCity();
            this.testGeoDate();
        }
    };
</script>

<style scoped>
    .mix-echarts {
        width: 100%;
        height: 800px;
    }
</style>
