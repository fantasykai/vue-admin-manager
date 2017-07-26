<template>
    <section>
        <p></p>
        <P><strong>个人资料</strong> /
            <router-link :to="{ path: filters.previousPage }">返回
            </router-link>
        </P>
        <!--列表-->
        <el-table :data="profileRecords" highlight-current-row v-loading="profileLoading"
                  style="width: 100%;">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="90">
            </el-table-column>
            <el-table-column label="头像" sortable>
                <template scope="scope">
                    <img :src="profileAvatarSrc[scope.$index]">
                </template>
            </el-table-column>
            <el-table-column prop="userId" :formatter="showuserId" label="userId" sortable>
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
            <el-table-column prop="telphone" label="手机" sortable>
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
        </el-table>
        <template>
            <section>
                <p></p>
                <P><strong>{{ relationName }}</strong>({{this.friendTotal}})</P>
                <!--列表-->
                <el-table :data="friendsRecords" highlight-current-row v-loading="listLoading"
                          style="width: 100%;">
                    <!--<el-table-column type="selection" width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column type="index" width="90">
                    </el-table-column>
                    <el-table-column label="头像" sortable>
                        <template scope="scope">
                            <img :src="friendAvatarSrc[scope.$index]">
                        </template>
                    </el-table-column>
                    <el-table-column prop="fri_id.userId" :formatter="showFrienduserId" label="userId" sortable>
                    </el-table-column>
                    <el-table-column
                        label="昵称">
                        <template scope="scope">
                            <el-popover title="接口报文" trigger="hover" placement="top">
                                <p> {{ scope.row | formattedJson }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag type="gray">{{ scope.row.fri_id.nickname }} </el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="备注" sortable>
                    </el-table-column>
                    <el-table-column prop="how" :formatter="formatHowFriend" label="添加好友的方式" sortable>
                    </el-table-column>
                    <el-table-column prop="why" label="成为好友的理由" sortable>
                    </el-table-column>
                    <el-table-column prop="_created" :formatter="formatBeijingDate" label="创建好友关系的时间" sortable>
                    </el-table-column>
                </el-table>
                <!--工具条-->
                <el-col :span="24" class="toolbar">
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                                   :total="friendTotal" style="float:right;">
                    </el-pagination>
                </el-col>
            </section>

        </template>
    </section>
</template>

<script>
    // 时间处理
    import moment from 'moment';
    import channelCode from '../../../../static/channelCode.json';
    import config from '../../../config';
    import {getUsersPage, getNickname, getFriendsPage} from '../../../api/users';

    export default {
        name: 'userRelation',
        props: ['userId', 'where', 'relationName', 'previousPage'],
        data() {
            return {
                ossClient: Object,
                submitted: [],
                filters: {
                    beginTime: '',
                    endTime: '',
                    userId: this.userId,
                    where: this.where,
                    relationName: this.relationName,
                    previousPage: this.previousPage,
                    defaultBeginTime: '',
                    defaultEndTime: ''
                },
                regex: {
                    userIdRe: /^[a-zA-Z][a-zA-Z0-9_-]{5,20}$/g,
                    seqIdRe: /^\d{8,10}$/g,
                    tel: /^((1[3578][0-9])|(14[57])|(17[0678]))\d{8}$/g,
                },
                timing: [],
                userId: '',
                profileRecords: [],
                friendsRecords: [],
                shareNames: '',
                profileTotal: 0,
                friendTotal: 0,
                page: 1,
                listLoading: false,
                profileLoading: false,
                profileAvatarSrc: [],
                friendAvatarSrc: [],
                shareUsers: [],
                whyList: [],
            };
        },
        filters: {
        },
        methods: {
            formatBeijingDate(row) {

                let beijingDate = ''
                if (row._created) {
                    beijingDate = moment(row._created).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
                }
                return beijingDate;
            },
            formatHowFriend(row) {

                let howStrings = ["查找手机号", "查找userId", "扫一扫", "通讯录好友", "兴趣最搭", "附近好友", "好友邀请超时", "好友推荐", "黑名单"];

                return howStrings[row.how];

            },
            showuserId(row) {
                if (row.userId) {
                    return row.userId;
                }
                return row.seqid
            },
            showFrienduserId(row) {
                if (row.fri_id.userId) {
                    return row.fri_id.userId;
                }
                return row.fri_id.seqid
            },
            //初始化OSS 权限
            initOSSAuth(){
                let ossSts = JSON.parse(localStorage.getItem('ossSts'));

                let Oss = OSS.Wrapper;

                this.ossClient = new Oss({
                    region: 'test',
                    accessKeyId: ossSts.AccessKeyId,
                    accessKeySecret: ossSts.AccessKeySecret,
                    stsToken: ossSts.SecurityToken,
                    bucket: 'test',
                });
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getFriends();
            },
            // 获取用户个人资料
            getProfileUser() {

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
                } else {
                    return
                }

                let
                    para = {
                        where: '{' + userIdParam + '}',
                        sort: '-_created',
                        max_results: '20',
                        page: this.page
                    };
                this.profileLoading = true;
                //NProgress.start();
                getUsersPage(para).then((res) => {
                    this.profileTotal = res.data._meta.total;
                    this.profileRecords = res.data._items;
                    this.profileLoading = false;

                    for (let i = 0; i < this.profileRecords.length; i++) {
//
                        let {_id, avatar, from} = this.profileRecords[i];

                        if (_id) {
                            this.userId = _id;
                        }

                        if (avatar) {

                            avatar += '@!web_show_avatar';

                            var result = this.ossClient.signatureUrl(avatar, {
                                response: {
                                    // 'content-disposition': 'attachment; filename="' + filename + '"'
                                    'Content-Type': 'image/jpeg'
                                }
                            });

                            this.profileAvatarSrc[i] = result;
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
                        this.getFriends();
                    }
                });
            },
            // 获取好友详情
            getFriends() {
                let
                    para = {
                        userId: this.userId,
                        queryParams: {
                            where: this.where,
                            embedded: '{"fri_id":1}',
                            max_results: '20',
                            page: this.page
                        }

                    };
                this.listLoading = true;
                //NProgress.start();
                getFriendsPage(para).then((data) => {
                    this.friendTotal = data._meta.total;
                    this.friendsRecords = data._items;
                    this.listLoading = false;

                    for (let i = 0; i < this.friendsRecords.length; i++) {
//
                        let {fri_id} = this.friendsRecords[i];

                        let {avatar} = fri_id;

                        if (avatar) {

                            avatar += '@!web_show_avatar';

                            var result = this.ossClient.signatureUrl(avatar, {
                                response: {
                                    // 'content-disposition': 'attachment; filename="' + filename + '"'
                                    'Content-Type': 'image/jpeg'
                                }
                            });
                            this.friendAvatarSrc[i] = result;
                        }
//                        whyList
                    }
                    //NProgress.done();
                });
            },
        },
        mounted() {
            this.initOSSAuth();
            this.getProfileUser();
        }
    };
</script>

<style scoped>

</style>
