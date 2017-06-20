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
                    <el-input v-model="filters.userId" placeholder="userId/SeqId"
                              style="width: 20%;"></el-input>
                    <el-button type="primary" v-on:click="getAnchorDataStatByParams">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <!--列表-->
        <el-table :data="records" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="index" width="">
            </el-table-column>
            <el-table-column prop="_created" label="日期" width="" sortable>
            </el-table-column>
            <el-table-column
                label="昵称"
                width="">
                <template scope="scope">
                    <router-link :to="{ name: '主播详情',params: {fromUserId : scope.row.userid._id}}">
                        {{ scope.row.userid.nickname }}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="userid.userId" :formatter="showuserId" label="userId" width="" sortable>
            </el-table-column>
            <el-table-column prop="video_num" label="当日视频数量" width="" sortable>
            </el-table-column>
            <el-table-column prop="fri_num" label="有效拉新数量" width="" sortable>
            </el-table-column>
            <el-table-column prop="friact_num" label="新增活跃用户" width="" sortable>
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
    //    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import config from '../../config';
//    import {getAnchorDataStatPage, getBluUid} from '../../api';
    import {getBluUid} from '../../api/users';
    import {getAnchorDataStatPage} from '../../api/userstats';

    export default {

        data() {
            return {
                filters: {
                    beginTime: '',
                    endTime: '',
                    userId: '',
                    defaultBeginTime: '',
                    defaultEndTime: '',
                },
                regex: {
                    userIdRe: /^[a-zA-Z][a-zA-Z0-9_-]{5,20}$/g,
                    seqIdRe: /^\d{8,10}$/g,
                },
                records: [],
                total: 0,
                page: 1,
                listLoading: false
            };
        },
        watch: {
            'filters.userId' (val, oldVal) {
//                console.log('new: %s, old: %s', val, oldVal)
            }
        },
        methods: {
            // 展示userId或seqid
            showuserId(row) {
                if (row.userid.userId) {
                    return row.userid.userId
                }
                return row.userid.seqid
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getAnchorDataStatRecord('');
            },
            // 获取主播信息
            getAnchorDataStatByParams() {

                if (this.filters.userId) {
                    let queryParam = ''
                    if (this.filters.userId.match(this.regex.userIdRe)) {
                        queryParam = '"userId":"' + this.filters.userId + '"'
                    } else if (this.filters.userId.match(this.regex.seqIdRe)) {
                        queryParam = '"seqid":' + this.filters.userId
                    } else {
                        this.$message({
                            message: 'userId格式校验失败',
                            type: 'error'
                        });
                        return
                    }
                    //  根据userId 获取用户的_id
//                 /api/v1/users?where={"seqid":2090028357}&projection={"_id":1}
                    let userId = {
                        where: '{' + queryParam + '}',
                        projection: '{"_id":1}'
                    }

                    getBluUid(userId).then((res) => {

                        let items = res.data._items;
                        if (items.length > 0) {
                            let userIdParam = '"userid":"' + items[0]._id + '"'
                            this.getAnchorDataStatRecord(userIdParam)
                        } else {
                            this.$message({
                                message: '么得这个用户噻',
                                type: 'error'
                            });
                        }
                    }).catch(() => {
                        this.$message({
                            message: '查询userId失败',
                            type: 'error'
                        });
                    });
                } else {
                    this.getAnchorDataStatRecord('')
                }
            },
            //获取消息记录信息
            getAnchorDataStatRecord(userIdParam) {
                let dateParam = ('' != this.filters.beginTime && '' != this.filters.endTime ) ? '"_created":{"$gt":"' + this.filters.beginTime + '","$lt":"' + this.filters.endTime + '"}' : '}';

                if('' !== userIdParam) {
                    if ('}' === dateParam){
                        dateParam = userIdParam + dateParam
                    } else {
                        dateParam = userIdParam +',' + dateParam + '}'
                    }
                }

                let
                    para = {
                        where: '{'+ dateParam,
                        embedded: '{"userid":1}',
                        sort: '-_created',
                        max_results: '20',
                        page: this.page
                    };

                this.listLoading = true;
                //NProgress.start();
                getAnchorDataStatPage(para).then((res) => {
                    this.total = res.data._meta.total;
                    this.records = res.data._items;
                    this.listLoading = false;
                });
            },
        },
        mounted() {
            this.filters.defaultBeginTime = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
            this.filters.defaultEndTime = moment().format('YYYY-MM-DD 0:0:0');
            this.getAnchorDataStatByParams();
        }
    };

</script>
<style scoped>
</style>
