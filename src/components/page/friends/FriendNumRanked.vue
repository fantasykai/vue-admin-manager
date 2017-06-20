<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <div id="friendsRankTitle">
                <div id="titleText"><strong>{{ title }}</strong></div>
            </div>
        </el-col>
        <p></p>
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
                    <el-button type="primary" v-on:click="getFriendNumRanked">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
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
//    import {aggregate, getUsersPage}  from '../../../api';
    import {aggregate} from 'api/aggregate';
    import {getUsersPage} from 'api/users';
    import friendNumsRanked from '../../../../static/requestList/friendNumsRanked.json';

    export default {
        data() {
            return {
                title: '好友数量 TOP 50',
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
                records: [],
                userIds: [],
                total: 0,
                page: 1,
                listLoading: false,
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
            initDate: function () {
                this.userIds = [];
                this.records = [];
                this.total= 0;
            },
            //获取消息记录信息
            getFriendNumRanked() {

                this.listLoading = true;
                let params = friendNumsRanked;
                if ('' != this.beginTime && '' != this.endTime) {

                    let starttime = moment(this.beginTime).format('YYYY-MM-DD 0:0:0');
                    let endtime = moment(this.endTime).format('YYYY-MM-DD 0:0:0');
                    params = Object.assign({'starttime': starttime, 'endtime': endtime}, params)
                }
                this.initDate();
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
