<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    活动定义 :
                    <el-input v-model="filters.beginTime" :placeholder="filters.defaultBeginTime"
                              style="width: 25%;"></el-input>
                    /
                    <el-input v-model="filters.endTime" :placeholder="filters.defaultEndTime"
                              style="width: 25%;"></el-input>
                    <el-button type="primary" v-on:click="GetOperatingAccount">提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="records" border highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="90">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="200" sortable>
            </el-table-column>
            <el-table-column prop="send" label="拉新数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="send" label="新增活跃数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="send" label="2次好友数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="send" label="发消息总数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="send" label="被读消息总数" width="200" sortable>
            </el-table-column>
            <el-table-column
                label="操作"
                width="">
                <template scope="scope">
                    <router-link
                        to="/userManage">
                        账号每日详情


                    </router-link>
                    |

                    <router-link
                        :to="{ name: '自动回复设置',params: {userId : scope.row._id}}">
                        自动回复设置

                    </router-link>
                    |

                    <router-link
                        :to="{ name: '运营账号消息群发',params: {userId : scope.row._id ,nickname : scope.row.nickname}}">
                        消息群发

                    </router-link>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    // 时间处理
    import moment from 'moment';
    import channelCode from '../../../../static/channelCode.json';
    import config from '../../../config';
    import {getUsersPage, getNickname} from '../../../api/users';

    export default {
        data() {
            return {
                ossClient: Object,
                submitted: [],
                filters: {
                    beginTime: '',
                    endTime: '',
                    userId: '',
                    defaultBeginTime: '',
                    defaultEndTime: ''
                },
                regex: {
                    userIdRe: /^[a-zA-Z][a-zA-Z0-9_-]{5,20}$/g,
                    seqIdRe: /^\d{8,10}$/g,
                    tel: /^((1[3578][0-9])|(14[57])|(17[0678]))\d{8}$/g,
                },
                timing: [],
                records: [],
                shareNames: '',
                total: 0,
                page: 1,
                listLoading: false,
                avatarSrc: [],
                shareUsers: [],
            };
        },
        filters: {
            formatuserId(row) {
                let f_userId = ''

                let userInfo = JSON.stringify(row);

                let {userId, seqid} = JSON.parse(userInfo);

                if (userId) {
                    f_userId = userId
                } else {
                    f_userId = seqid
                }

                return f_userId;
            },
            // 格式化数字
            timingTime(time) {
                return moment(time).add(1, 'days').format('YYYY-MM-DD 08:00:00');
            },
            formatBeijingDate(date) {

                let beijingDate = ''
                if (date) {
                    beijingDate = moment(date).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
                }
                return beijingDate;
            },
            formattedJson(str) {
                let jsonStr
                if (str) {
                    jsonStr = JSON.stringify(str)
                } else {
                    jsonStr = '无'
                }
                return jsonStr;
            },
            formatResultType(str) {
                let type;
                if (str) {
                    type = 'success';
                }
                return type
            },
            formattedConstellation(index) {

                let constellationStrings = ["性感的白羊", "傲娇的金牛", "机智的双子", "温暖的巨蟹", "万人迷的狮子"
                    , "高贵的处女", "美味的天秤", "魅惑的天蝎", "色色的射手", "硬核的摩羯", "鬼马的水瓶", "温柔的双鱼", "温柔的双鱼"];

                return constellationStrings[index];

            },
            formattedBirthday(str) {
                let birthday = '';
                if (str) {
                    birthday = str.split(" ")[0];
                }
                return birthday
            },
            formattedSex(sex) {
                let sexName = '不明'
                if (1 === sex) {
                    sexName = '男'
                } else if (2 === sex) {
                    sexName = '女'
                }
                return sexName;
            },
            formattedSexual(sexual) {

                let sexualName = '不明'
                if (1 === sexual) {
                    sexualName = '来个汉子'
                } else if (2 === sexual) {
                    sexualName = '来个妹子'
                } else if (3 === sexual) {
                    sexualName = '人类'
                }
                return sexualName;
            },
            formattedDetail(address){

                let addrJson = JSON.stringify(address);

                let addr = ''

                if (addrJson) {
                    let {item0, item1, item2} = JSON.parse(addrJson);

                    if (item0) {
                        addr += item0.province + '/' + item0.city + item0.region + '/'
                    }
                    if (item1) {
                        addr += item1.detail + '/'
                    }
                    if (item2) {
                        addr += item2.detail + '/'
                    }
                }
                return addr;

            },
            formattedSchools(schools){
                let schoolJson = JSON.stringify(schools);

                let schoolName = '';

                if (schoolJson) {
                    let {item0} = JSON.parse(schoolJson);

                    if (item0) {
                        schoolName += item0.city + '/' + item0.region + '/' + item0.school
                    }
                }
                return schoolName
            },
            formattedJob(job) {

                let jobJson = JSON.stringify(job);

                let jobName = ''

                if (jobJson) {
                    let {c} = JSON.parse(jobJson);

                    if (c) {
                        jobName = c;
                    }
                }
                return jobName;
            },
            formattedClientLastLoginTime(client) {

                let lastLoginTime = ''

                let clientJson = JSON.stringify(client);

                let {last} = JSON.parse(clientJson);

                if (last) {
                    lastLoginTime = last._created;
                }

                return lastLoginTime;
            },

            formattedClientLastBluVer(client) {

                let bluVer = ''

                let clientJson = JSON.stringify(client);

                let {last} = JSON.parse(clientJson);

                if (last) {
                    bluVer = last.bluVer;
                }

                return bluVer;
            },

            formattedClientLastBrand(client) {

                let brand = ''

                let clientJson = JSON.stringify(client);

                let {last} = JSON.parse(clientJson);

                if (last) {
                    brand = last.brand;
                }
                return brand;
            },
            formattedClientLastDeviceName(client) {

                let deviceName = ''

                let clientJson = JSON.stringify(client);

                let {last} = JSON.parse(clientJson);

                if (last) {
                    deviceName = last.deviceName;
                }
                return deviceName;
            },
            formattedClientLastSysVer(client) {

                let sysVer = ''

                let clientJson = JSON.stringify(client);

                let {last} = JSON.parse(clientJson);

                if (last) {
                    sysVer = last.sysVer;
                }
                return sysVer;
            },
            formattedClientLastSysDesc(client) {

                let sysDesc = ''

                let clientJson = JSON.stringify(client);

                let {last} = JSON.parse(clientJson);

                if (last) {
                    sysDesc = last.sysDesc;
                }
                return sysDesc;
            },
            formattedChannel (row) {

                let channelName = ''

                let userInfo = JSON.stringify(row);

                let {channel, from} = JSON.parse(userInfo);

                if (channel) {

                    channelName = null == channelCode[channel] ? channel : channelCode[channel]

                } else if (from) {

                    let channelId = from.channel

                    if (channelId) {
                        channelName = null == channelCode[channelId] ? channelId : channelCode[channel]
                    }
                }

                return channelName;
            },
            formattedFrom (row) {

                let userInfo = JSON.stringify(row);

                let {from} = JSON.parse(userInfo);

                let userId = ''

                if (from) {
                    userId = from.user_id
                }
                return userId;
            },
        },
        methods: {

            showuserId(row) {
                if (row.userId) {
                    return row.userId;
                }
                return row.seqid
            },
            //初始化OSS 权限
            initOSSAuth(){

                let ossSts = JSON.parse(localStorage.getItem('ossSts'));

                let Oss = OSS.Wrapper;

                this.ossClient = new Oss({
                    region: 'oss-cn-beijing',
                    accessKeyId: ossSts.AccessKeyId,
                    accessKeySecret: ossSts.AccessKeySecret,
                    stsToken: ossSts.SecurityToken,
                    bucket: 'dianxinonline',
                });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.GetOperatingAccount();
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //获取消息记录信息
            GetOperatingAccount() {

                let userType = 100

                let currAccount = localStorage.getItem('account');

                if ('58ff28b4b818164c58ae680c' == currAccount || '58871627fd661412c8492d98' == currAccount) {
                    userType = 3
                }
                if (`${config.promoteMain.main1}` === currAccount) {
                    userType = 3
                } else if (`${config.promoteMain.main2}` === currAccount) {
                    userType = 4
                } else if (`${config.promoteMain.main0}` === currAccount) {
                    userType = 3
                }

                let query = '{"usertype":' + userType + '}',

                    para = {
                        where: query,
                        sort: '-_created',
                        max_results: '20',
                        page: this.page
                    };
                this.listLoading = true;
                //NProgress.start();
                getUsersPage(para).then((res) => {
                    this.total = res.data._meta.total;
                    this.records = res.data._items;
                    this.listLoading = false;

                    for (let i = 0; i < this.records.length; i++) {
//
                        let {avatar, from} = this.records[i];

                        if (avatar) {

                            avatar += '@!blu_web_show_avatar';

                            var result = this.ossClient.signatureUrl(avatar, {
                                response: {
                                    // 'content-disposition': 'attachment; filename="' + filename + '"'
                                    'Content-Type': 'image/jpeg'
                                }
                            });

                            this.avatarSrc[i] = result;
                        }

                        if (from) {

                            let {user_id} = from

                            if (user_id) {
                                getNickname(user_id).then((res) => {
                                    let {nickname, userId, seqid} = res;

                                    let shareUser = '昵称 : ' + nickname + ', userId : ';

                                    if (userId) {
                                        shareUser += userId;
                                    } else {
                                        shareUser += seqid;
                                    }

                                    this.shareUsers[i] = shareUser;
                                });
                            }
                        }
                    }
                    //NProgress.done();
                });
            },
        },
        mounted() {
//            this.filters.defaultBeginTime = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
//            this.filters.defaultEndTime = moment().format('YYYY-MM-DD 0:0:0');

            this.initOSSAuth();
            this.GetOperatingAccount();
        }
    };
</script>

<style scoped>

</style>
