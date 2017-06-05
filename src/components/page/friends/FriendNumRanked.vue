<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <div id="friendsRankTitle">
                <div id="titleText"><strong>好友数量 TOP 50</strong></div>
            </div>
        </el-col>
        <p></p>
        <!--列表-->
        <el-table :data="records" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="90">
            </el-table-column>
            <el-table-column prop="userId" :formatter="showuserId" label="userId">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称">
            </el-table-column>
            <el-table-column
                label="好友数量">
                <template scope="scope">
                    <router-link
                        :to="{ name: 'Sys好友管理',params: {userId : scope.row.telphone, currMenu: '/friendNumRanked'}}">
                        {{ scope.row.friNum }}
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>
    // 时间处理
    import moment from 'moment';
    import {aggregate, getUsersPage}  from '../../../api';
    import friendNumsRanked from '../../../../static/requestList/friendNumsRanked.json';

    export default {
        data() {
            return {
                records: [],
                userIds: [],
                friNum: [],
                shareNames: '',
                total: 0,
                page: 1,
                listLoading: false,
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
            formattedJson(str) {
                let jsonStr
                if (str) {
                    jsonStr = JSON.stringify(str)
                } else {
                    jsonStr = '无'
                }
                return jsonStr;
            },
        },
        methods: {

            showuserId(row) {
                if (row.userId) {
                    return row.userId;
                }
                return row.seqid
            },
            //获取消息记录信息
            getFriendNumRanked() {

                this.listLoading = true;
                let params = friendNumsRanked;
                aggregate(params)
                    .then(data => {
                        this.listLoading = false;

                        for (let i = 0; i < data.length; i++) {
                            this.userIds.push(data[i]._id.userId);
//                            this.friNum.push(data[i].num);

                            this.records.push({
                                '_id': data[i]._id.userId,
                                'nickname': '',
                                'userId': '',
                                'seqid': '',
                                'friNum': data[i].num,
                                'telphone': '',
                            });

                        }

                        let ids = ''

                        if (this.userIds) {

                            for (let i = 0; i < this.userIds.length; i++) {
                                ids += '"' + this.userIds[i] + '"'

                                if (i < this.userIds.length - 1) {
                                    ids += ","
                                }
                            }
                        }

                        let where = '{"_id":{"$in":[' + ids + ']}}';

                        let
                            para = {
                                where: where,
                                projection: '{"nickname":1,"userId":1,"seqid":1,"telphone":1}',
                                max_results: '50',
                                page: this.page
                            };
                        getUsersPage(para).then((res) => {
                            this.listLoading = false;

                            let userInfos = res.data._items;
                            for (let i = 0; i < userInfos.length; i++) {
//                                this.records.push({
//                                    '_id': userInfos[i]._id,
//                                    'nickname': userInfos[i].nickname,
//                                    'userId': userInfos[i].userId,
//                                    'seqid': userInfos[i].seqid,
//                                    'friNum': this.friNum[i],
//                                    'telphone': userInfos[i].telphone,
//                                });

                                for (let j = 0; j < this.records.length; j++) {

                                    if (userInfos[i]._id === this.records[j]._id) {
                                        this.records[j].nickname = userInfos[i].nickname;
                                        this.records[j].userId = userInfos[i].userId;
                                        this.records[j].seqid = userInfos[i].seqid;
                                        this.records[j].telphone = userInfos[i].telphone;

                                    }
                                }
                            }
                        });
                    });
            },
        },
        mounted() {
            this.getFriendNumRanked();
        }
    };
</script>

<style>
    #friendsRankTitle {
        display: flex;
        /*width: 400px; !* 宽度值，随便啦 *!*/
        /*height: 400px;  !* 高度值，随便啦 *!*/
        justify-content: center;
        align-items: center;
        background-color: yellow;
    }

    #titleText {
        /*width: 100px;!* 宽度值，随便啦 *!*/
        /*height: 20px;!* 高度值，随便啦 *!*/
        font-size: 20px;
        background-color: transparent; /* Magic! */
    }
</style>
