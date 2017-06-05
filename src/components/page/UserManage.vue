<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.beginTime" :placeholder="filters.defaultBeginTime"
                              style="width: 25%;"></el-input>
                    -
                    <el-input v-model="filters.endTime" :placeholder="filters.defaultEndTime"
                              style="width: 25%;"></el-input>
                    |
                    <el-input v-model="filters.userId" placeholder="tel/userId/SeqId"
                              style="width: 20%;"></el-input>
                    <el-button type="primary" v-on:click="getUserList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <p></p>

        <!--列表-->
        <el-table :data="records" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="90">
            </el-table-column>
            <el-table-column label="头像" sortable>
                <template scope="scope">
                    <img :src="avatarSrc[scope.$index]">
                </template>
            </el-table-column>
            <el-table-column
                label="userId">
                <template scope="scope">
                    <el-popover title="接口报文" trigger="hover" placement="top">
                        <p> {{ scope.row | formattedJson }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag type="gray">{{ scope.row | formatuserId }} </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="昵称" sortable>
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>注册时间: {{ scope.row._created | formatBeijingDate }}</p>
                        <p>住址: {{ scope.row.address | formattedDetail }}</p>
                        <p>学校: {{ scope.row.schools | formattedSchools }}</p>
                        <p>工作: {{ scope.row.jobs | formattedJob }}</p>
                        <p>签名: {{ scope.row.sign }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.nickname }} </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                label="手机"
                width="">
                <template scope="scope">
                    <router-link :to="{ name: 'Sys好友管理',params: {userId : scope.row.telphone, currMenu: '/userManage'}}">
                        {{ scope.row.telphone }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column label="性别" sortable>
                <template scope="scope">
                    <el-popover title="恋爱倾向" trigger="hover" placement="top">
                        <p> {{ scope.row.sexual | formattedSexual }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag>{{ scope.row.sex | formattedSex }} </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="生日" sortable>
                <template scope="scope">
                    <el-popover title="星座" trigger="hover" placement="top">
                        <p> {{ scope.row.constellation | formattedConstellation }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag type="gray" v-show="scope.row.birthday">{{ scope.row.birthday | formattedBirthday }}

                            </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="send" label="发气泡" sortable>
            </el-table-column>
            <el-table-column prop="recv" label="收气泡" sortable>
            </el-table-column>
            <el-table-column label="客户端信息" sortable>
                <template scope="scope">
                    <el-popover title="用户手机信息" trigger="hover" placement="top">
                        <p><strong>用户注册手机 ：</strong></p>
                        <p> Android/ios : {{ 1 == scope.row.client.item0.src ? 'Android' : 'iOS' }}</p>
                        <p> 注册APP版本 : {{ scope.row.client.item0.bluVer }}</p>
                        <p> 品牌 : {{ scope.row.client.item0.brand }}</p>
                        <p> 设备型号 : {{ scope.row.client.item0.deviceName }}</p>
                        <p> 设备版本 : {{ scope.row.client.item0.sysVer }}</p>
                        <p> 设备详情 : {{ scope.row.client.item0.sysDesc }}</p>
                        <p><strong>用户当前在用手机 ：</strong></p>
                        <p> 最近登录时间 : {{ scope.row.client | formattedClientLastLoginTime | formatBeijingDate}}</p>
                        <p> 在用APP版本 : {{ scope.row.client | formattedClientLastBluVer}}</p>
                        <p> 品牌 : {{ scope.row.client | formattedClientLastBrand}}</p>
                        <p> 设备型号 : {{ scope.row.client | formattedClientLastDeviceName}}</p>
                        <p> 设备版本 : {{ scope.row.client | formattedClientLastSysVer }}</p>
                        <p> 设备详情 : {{ scope.row.client | formattedClientLastSysDesc}}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag type="success">{{ scope.row.client.item0.deviceName }} </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="用户来源" sortable>
                <template scope="scope">
                    <el-popover title="分享人" trigger="hover" placement="top" :content="shareUsers[scope.$index]">
                        <!--<p> {{ scope.row | formattedFrom }}</p>-->
                        <div slot="reference" class="name-wrapper">
                            <el-tag type="success">{{ scope.row | formattedChannel }} </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="加好友验证" sortable>
                <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>支持手机号搜索 : {{ 0 === scope.row.privacy.seachTel ? '不支持' : '支持' }}</p>
                        <p>支持BludId搜索 : {{ 0 === scope.row.privacy.seachNum ? '不支持' : '支持' }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag type="primary">{{ 0 === scope.row.privacy.addVerify ? '不需要' : '需要' }} </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <!--<el-table-column-->
            <!--label="操作">-->
            <!--<template scope="scope">-->
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <!--&lt;!&ndash;<el-button size="small"&ndash;&gt;-->
            <!--&lt;!&ndash;@click="cancelTimingTask(scope.row._id, scope.$index)">&ndash;&gt;-->
            <!--&lt;!&ndash;删除&ndash;&gt;-->
            <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
            <!--</template>-->
            <!--</el-table-column>-->
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
    import channelCode from '../../../static/channelCode.json';
    import config from '../../config';
    import {getUsersPage, getNickname} from '../../api';

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
                let userId = ''

                let userInfo = JSON.stringify(row);

                let {userId, seqid} = JSON.parse(userInfo);

                if (userId) {
                    userId = userId
                } else {
                    userId = seqid
                }

                return userId;
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
                this.getUserList();
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //获取消息记录信息
            getUserList() {

                let userIdParam = ''

                if (this.filters.userId) {
                    userIdParam = ''
                    if (this.filters.userId.match(this.regex.userIdRe)) {
                        userIdParam = '"userId":"' + this.filters.userId + '"'
                    } else if (this.filters.userId.match(this.regex.seqIdRe)) {
                        userIdParam = '"seqid":' + this.filters.userId
                    } else if (this.filters.userId.match(this.regex.tel)) {
                        userIdParam = '"telphone":"' + this.filters.userId + '"'
                    }
                    else {
                        this.$message({
                            message: '参数格式校验失败',
                            type: 'error'
                        });
                        return
                    }
                }
                let dateParam = ('' != this.filters.beginTime && '' != this.filters.endTime ) ? '"_created":{"$gt":"' + this.filters.beginTime + '","$lt":"' + this.filters.endTime + '"}' : '}';

                if ('' !== userIdParam) {
                    if ('}' === dateParam) {
                        dateParam = userIdParam + dateParam
                    } else {
                        dateParam = userIdParam + ',' + dateParam + '}'
                    }
                }

                let
                    para = {
                        where: '{' + dateParam,
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
            this.filters.defaultBeginTime = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
            this.filters.defaultEndTime = moment().format('YYYY-MM-DD 0:0:0');

            this.initOSSAuth();
            this.getUserList();
        }
    };
</script>

<style scoped>

</style>
