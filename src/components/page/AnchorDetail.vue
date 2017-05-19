<template>
    <section class="toolbar">
        <div class="allActive">
            <el-row class="head">
                <el-col :span="18" style="padding:20px 0;background: #33CCCC;">
                    <el-col :span="8">
                        {{ pullNewsCount }}<br>
                        <el-tooltip class="item" effect="dark" :content="prompt_title.pullNewsCount"
                                    placement="bottom-start">
                            <span>拉新总量</span>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="8">
                        {{ activeUserCount }}<br>
                        <el-tooltip class="item" effect="dark" :content="prompt_title.activeUserCount"
                                    placement="bottom">
                            <span>活跃用户总量</span>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="8" style="border: none;">
                        {{ byBluTimerMsgCount }}<br>
                        <el-tooltip class="item" effect="dark" :content="prompt_title.byBluTimerMsgCount"
                                    placement="bottom-end">
                            <span>群发消息总数</span>
                        </el-tooltip>
                    </el-col>
                </el-col>

                <el-col :span="5" :offset="1" style="background:  #3091F2;padding:40px 0;">
                    {{ personalMsgCount }}<br>
                    <el-tooltip class="item" effect="dark" :content="prompt_title.personalMsgCount"
                                placement="bottom-end">
                        <span>个人消息数</span>
                    </el-tooltip>
                </el-col>
            </el-row>
        </div>

        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.beginTime" :placeholder="filters.defaultBeginTime"
                              style="width: 35%;"></el-input>
                    -
                    <el-input v-model="filters.endTime" :placeholder="filters.defaultEndTime"
                              style="width: 35%;"></el-input>
                    <el-button type="primary" v-on:click="getChatMsgRecord">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="records" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="index" width="">
            </el-table-column>
            <el-table-column
                label="昵称"
                width="">
                <template scope="scope">
                    <el-popover title="执行结果" trigger="hover" placement="top">
                        <p> {{ scope.row.rets | formattedJson }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag :type="scope.row.rets | formatResultType">{{ scope.row.fromUserId.nickname }}
                            </el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="fromUserId.userid" :formatter="showuserid" label="userid" width="" sortable>
            </el-table-column>
            <el-table-column prop="msgTimestamp" label="消息时间" sortable>
            </el-table-column>
            <!--<el-table-column prop="content" :formatter="showVideoPatch" label="消息内容" width="200" sortable>-->
            <el-table-column label="消息内容" width="400" sortable>
                <template scope="scope">
                    <show-video v-if="isVideo[scope.$index]" :src="videoSrc[scope.$index]"></show-video>
                    <img v-if="!isVideo[scope.$index]"
                         :src="videoSrc[scope.$index]">
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
    //    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import config from '../../config';
    import showVideo from '../common/ShowVideo.vue';
    import {
        getChatRecordPage,
        getAnchorDataStatPage
    } from '../../api';

    export default {
        components: {
            'show-video': showVideo
        },
        data() {
            return {
                ossClient: Object,
                submitted: [],
                prompt_title: {
                    pullNewsCount: '拉新总量：用户第一次注册，第一个好友是主播的数',
                    activeUserCount: '活跃用户总量：达到注册7天内有3天发消息给主播的被拉新的用户数',
                    byBluTimerMsgCount: '群发消息总数：通过blutimer群发出来的消息的条数，群发1次算1条',
                    personalMsgCount: '个人消息数：用户通过App发送给好友的消息数量（来源于app同步的数据）',
                },
                pullNewsCount: 0,
                activeUserCount: 0,
                byBluTimerMsgCount: 0,
                personalMsgCount: 0,
                fromUserId: this.$route.params.fromUserId,
                filters: {
                    beginTime: '',
                    endTime: '',
                    defaultBeginTime: '',
                    defaultEndTime: ''
                },
                records: [],
                total: 0,
                page: 1,
                listLoading: false,
                isVideo: [],
                videoSrc: [],
            };
        },
        filters: {
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
                if ("" === str) {
                    type = 'gray';
                }
                if (str) {
                    type = 'success';
                }
                return type
            }
        },
        methods: {
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
            // 展示userid或seqid
            showuserid(row) {
                if (row.fromUserId.userid) {
                    return row.fromUserId.userid
                }
                return row.fromUserId.seqid
            },
            // 展示视频路径
            showVideoPatch(row) {
                let {path} = JSON.parse(row.content);
                return typeof 'undefined' === path ? '' : path;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getChatMsgRecord();
            },
            //获取消息记录信息
            getChatMsgRecord() {
                let dateParam = ('' != this.filters.beginTime && '' != this.filters.endTime ) ? ',"msgTimestamp":{"$gt":"' + this.filters.beginTime + '","$lt":"' + this.filters.endTime + '"}}' : '}';

                // 统计发给某个主播发给timer，并且设置过定时任务的数据
                let
                    para = {
                        where: `{"task_id":{"$exists":true},"$or": [{"objectName": "app:image"}, {"objectName": "app:video"}],"toUserId":"${config.msgStatToUserId}","fromUserId":"` + this.fromUserId + `"` + dateParam,
                        embedded: '{"fromUserId":1}',
                        sort: '-msgTimestamp',
                        max_results: '20',
                        page: this.page
                    };
                this.listLoading = true;
                getChatRecordPage(para).then((res) => {
                    this.total = res.data._meta.total;
                    this.records = res.data._items;
                    this.listLoading = false;

                    if (this.records.length > 0) {
                        this.personalMsgCount = this.records[0].fromUserId.send
                    }

                    for (let i = 0; this.records.length; i++) {
                        //如果记录中已经存在task_id，且task_id不为空，则标志为已经提交,否则默认为false未提交
                        if (this.records[i].task_id) {
                            this.submitted[i] = true;
                        } else {
                            this.submitted[i] = false;
                        }

                        // 判断objectName为app:image app:video
                        let contentType = 'video/mp4';

                        if ('app:video' === this.records[i].objectName) {
                            this.isVideo[i] = true;
                        } else {
                            this.isVideo[i] = false;
                            contentType = 'image/jpeg'
                        }

                        let {path} = JSON.parse(this.records[i].content);

                        if (path) {

                            if ('image/jpeg' === contentType) {
                                path += '@!web_show_blu';
                            }

                            var result = this.ossClient.signatureUrl(path, {
                                response: {
                                    // 'content-disposition': 'attachment; filename="' + filename + '"'
                                    'Content-Type': contentType
                                }
                            });

                            console.log("result : " + result)
                            this.videoSrc[i] = result;
                        }
                    }
                });
            },
            //统计主播的拉新总量，活跃用户总量，群发消息总数，个人消息数
            statAnchorData() {
                let dateParam = ('' != this.filters.beginTime && '' != this.filters.endTime ) ? ',"_created":{"$gt":"' + this.filters.beginTime + '","$lt":"' + this.filters.endTime + +'"}}' : '}';
                // where={"userid":"58b3a7c5fd6614053052f663","_created":{"$gt": "2017-04-16 0:0:0","$lt":"2017-05-20 19:30:0"}}
                let
                    para = {
                        where: '{"userid":"' + this.fromUserId + '"' + dateParam
                    };
                this.listLoading = true;
                //NProgress.start();
                getAnchorDataStatPage(para).then((res) => {

                    let items = res.data._items;

                    for (let i = 0; items.length; i++) {
                        this.pullNewsCount += items[i].fri_num
                        this.activeUserCount += items[i].friact_num
                        this.byBluTimerMsgCount += items[i].video_num
                    }
                });
            },
        },
        mounted() {
            this.filters.defaultBeginTime = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
            this.filters.defaultEndTime = moment().format('YYYY-MM-DD 0:0:0');

            this.initOSSAuth();
            this.getChatMsgRecord();
            this.statAnchorData();
        }
    };

</script>

<style scoped>
    .allActive > .head > .el-col > .el-col {
        padding: 20px 0;
        border-right: solid 1px #fff;
    }

    .allActive .head {
        text-align: center;
        color: #fff;
        font-size: 30px;
        margin-bottom: 50px;
    }

    .allActive .head span {
        font-size: 16px;
    }
</style>
