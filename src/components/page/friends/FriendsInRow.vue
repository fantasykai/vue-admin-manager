<template>
    <section>
        <template>
            <section class="toolbar">
                <p></p>
                <P><strong>分组名称 : {{ this.rowName }}</strong> /
                    <router-link :to="{ name: 'Sys好友管理',params: {userId : this.userId,activeName : 'rows'}}">
                        返回
                    </router-link>
                </P>
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
    import config from '../../../config';
    import {getFriendsInRow} from '../../../api/users';

    export default {
        data() {
            return {
                ossClient: Object,
                userId: this.$route.params.userId,
                userId: this.$route.params.userId,
                rowName: this.$route.params.rowName,
                friendIds: this.$route.params.friendIds,
                timing: [],
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

                let beijingDate = '';
                if (row._created) {
                    beijingDate = moment(row._created).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
                }
                return beijingDate;
            },
            formatHowFriend(row) {

                let howStrings = ["查找手机号","查找userId","扫一扫","通讯录好友","兴趣最搭","附近好友","好友邀请超时","好友推荐","黑名单"];

                return howStrings[row.how];

            },
            showFrienduserId(row) {
                if (row.fri_id.userId) {
                    return row.fri_id.userId;
                }
                return row.fri_id.seqid
            },
            handlePreStep: function () {
                this.$router.go(-1);
                $('html,body').animate({scrollTop: 0}, 500);
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
                this.queryFriendsInRow();
            },
            // 获取分组内的好友
            queryFriendsInRow() {

                let ids = '';

                if (this.friendIds) {

                    for (let i = 0; i < this.friendIds.length; i++) {
                        ids += '"' + this.friendIds[i] + '"';

                        if (i < this.friendIds.length - 1) {
                            ids += ","
                        }
                    }
                }

                let where = '{"fri_id":{"$in":[' + ids + ']}}';
                let
                    para = {
                        userId: this.userId,
                        queryParams: {
                            where: where,
                            embedded: '{"fri_id":1}',
                            max_results: '20',
                            page: this.page
                        }

                    };
                this.listLoading = true;
                //NProgress.start();
                getFriendsInRow(para).then((data) => {
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
            this.queryFriendsInRow();
        }
    };
</script>

<style scoped>

</style>
