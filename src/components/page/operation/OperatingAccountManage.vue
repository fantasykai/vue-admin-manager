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
        <el-table :data="records" :summary-method="getSummaries" show-summary border highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <!--<el-table-column type="selection" width="55">-->
            <!--</el-table-column>-->
            <el-table-column type="index" width="90">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="200" sortable>
            </el-table-column>
            <el-table-column prop="firsNum" label="好友数量" width="200" sortable>
            </el-table-column>
            <el-table-column prop="newActiveNum" label="新增活跃数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="sendNum" label="发消息总数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="receNum" label="被读消息总数" width="200" sortable>
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
                    to="/userManage">
                    消息发送
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
    import config from '../../../config';
    import {getUsersPage} from '../../../api/users';

    export default {
        data() {
            return {
                ossClient: Object,
                filters: {
                    beginTime: '',
                    endTime: '',
                    userId: '',
                    defaultBeginTime: '',
                    defaultEndTime: ''
                },
                records: [],
                total: 0,
                page: 1,
                listLoading: false,
            };
        },
        filters: {
        },
        methods: {
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
                this.GetOperatingAccount();
            },
            GetOperatingAccount() {

                let userType = 100;

                let currAccount = localStorage.getItem('account');

                if (`${config.promoteMain.main1}` === currAccount) {
                    userType = 10921
                } else if (`${config.promoteMain.main2}` === currAccount) {
                    userType = 10922
                } else if (`${config.promoteMain.main0}` === currAccount) {
                    userType = 10920
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
                });
            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '合计';
                        return;
                    }
                    if (index === 1) {
                        sums[index] = 'N/A';
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '';
                    } else {
                        sums[index] = 'N/A';
                    }
                });
                return sums;
            },
        },
        mounted() {
            this.initOSSAuth();
            this.GetOperatingAccount();
        }
    };
</script>

<style scoped>

</style>
