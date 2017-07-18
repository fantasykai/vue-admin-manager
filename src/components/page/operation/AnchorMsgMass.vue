<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.beginTime" :placeholder="filters.defaultBeginTime"
                              style="width: 40%;"></el-input>
                    -
                    <el-input v-model="filters.endTime" :placeholder="filters.defaultEndTime"
                              style="width: 40%;"></el-input>
                    <el-button type="primary" v-on:click="getChatMsgRecordAll">查询</el-button>
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
            <el-table-column
                label="昵称"
                width="160">
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
            <el-table-column prop="fromUserId.userId" label="userId" width="160" sortable>
            </el-table-column>
            <el-table-column prop="msgTimestamp" label="消息时间" width="200" sortable>
            </el-table-column>
            <!--<el-table-column prop="content" :formatter="showVideoPatch" label="消息内容" width="200" sortable>-->
            <el-table-column label="消息内容" width="400" sortable>
                <template scope="scope">
                    <show-video v-if="isVideo[scope.$index]" :src="videoSrc[scope.$index]"
                                :thumbnail="thumbnailSrc[scope.$index]"></show-video>
                    <img v-if="!isVideo[scope.$index]"
                         :src="videoSrc[scope.$index]">
                </template>
            </el-table-column>
            <el-table-column label="定时" min-width="180" sortable>
                <template scope="scope">
                    <el-input v-show="!submitted[scope.$index]" :ref="'timingInput' + scope.$index"
                              :value='scope.row.msgTimestamp | timingTime '
                              :name="'timing-' + scope.$index"
                              style="width: 75%;"></el-input>
                    <el-input v-show="submitted[scope.$index]"
                              :value='scope.row.task_starttime'
                              :disabled="true" style="width: 75%;">
                    </el-input>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="100">
                <template scope="scope">
                    <el-button v-if="!submitted[scope.$index]" size="small"
                               @click="submitTimingTask(scope.row._id, scope.$index)">
                        提交
                    </el-button>
                    <el-button v-else-if="submitted[scope.$index]" size="small"
                               @click="cancelTimingTask(scope.row._id, scope.$index)">
                        取消
                    </el-button>
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
    import showVideo from '../../common/ShowVideo.vue';
    import {getChatRecordPage} from 'api/messages';
    import {setMsgTimingTask, cancelMsgTimingTask} from 'api/manage';

    export default {
        components: {
            'show-video': showVideo
        },
        data() {
            return {
                mock: true,
                ossClient: Object,
                submitted: [],
                filters: {
                    beginTime: '',
                    endTime: '',
                    defaultBeginTime: '2017-04-16 00:00:00',
                    defaultEndTime: ''
                },
                timing: [],
                records: [],
                total: 0,
                page: 1,
                listLoading: false,
                isVideo: [],
                videoSrc: [],
                thumbnailSrc: [],
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
            // 展示视频路径
            showVideoPatch(row) {
                let {path} = JSON.parse(row.content);
                return typeof 'undefined' === path ? '' : path;
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getChatMsgRecordAll();
            },
            //获取消息记录信息
            getChatMsgRecordAll() {

                let _this = this;

                let dateParam = ('' != _this.filters.beginTime && '' != _this.filters.endTime ) ? ',"msgTimestamp":{"$gt":"' + _this.filters.beginTime + '","$lt":"' + _this.filters.endTime + '"}}' : '}';

                let
                    para = {
                        where: `{"toUserId":"${config.msgStatToUserId}"` + dateParam,
                        sort: '-msgTimestamp',
                        max_results: '20',
                        page: _this.page
                    };
                this.listLoading = true;
                //NProgress.start();
                getChatRecordPage(para).then((res) => {
                    this.total = res.data._meta.total;
                    this.records = res.data._items;
                    this.listLoading = false;

                    for (let i = 0; i < this.records.length; i++) {

                        let record = this.records[i];

                        if ("task_id" in record && '' !== record.task_id) {
                            this.submitted[i] = true;
                        } else {
                            this.submitted[i] = false;
                        }

                        // 判断objectName为app:image app:video
                        let contentType = 'video/mp4';
                        if ('app:video' === record.objectName) {
                            this.isVideo[i] = true;
                        } else {
                            this.isVideo[i] = false;
                            contentType = 'image/jpeg'
                        }

                        let {path, thumbnail} = record.content;

                        if (this.mock) {
                            this.videoSrc[i] = path;
                            this.thumbnailSrc[i] = thumbnail;
                        } else {
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

                                this.videoSrc[i] = result;
                            }
                            if (thumbnail) {

                                thumbnail += '@!web_show_blu';

                                var thumbnailResult = this.ossClient.signatureUrl(thumbnail, {
                                    response: {
                                        // 'content-disposition': 'attachment; filename="' + filename + '"'
                                        'Content-Type': contentType
                                    }
                                });
                                this.thumbnailSrc[i] = thumbnailResult;
                            }
                        }
                    }
                });
            },
            /**
             * 提交定时发送的时间
             * @param messageId
             * @param taskStartTime
             */
            submitTimingTask: function (messageId, index) {

                // TODO 校验ID 是否为空，校验时间格式是否正确
                var taskTime = document.getElementsByName("timing-" + index)[0].value;

                let params = {
                    "batch_process": "star_user_timer",
                    "message_id": messageId,
                    "task_starttime": taskTime
                }
                setMsgTimingTask(params).then(data => {

                    let {status, _status, _error} = data

                    if (status) {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.handleCurrentChange(this.page);

                    } else if (!_status) {
                        this.$message({
                            message: null != _error ? _error.message : 'Error!',
                            type: 'error'
                        });
                    }
                }).catch((e) => {

                    let {_error} = e

                    this.$message({
                        message: null != _error ? _error.message : 'Error!',
                        type: 'error'
                    });
                });
            },
            cancelTimingTask: function (msg_id, index) {

                // 取消任务，patch task_id 为空即可
                let params = {
                    uri: `${config.serverURI}/api/v1/messages/` + msg_id,
                    patchBody: {
                        "task_id": "",
                        "rets": "",
                    }
                };
                cancelMsgTimingTask(params)
                    .then(data => {
                        let {_status, _error} = data
                        if (_status) {
                            this.$message({
                                message: '取消成功',
                                type: 'success'
                            });
//                            this.submitted[index] = false;
                            this.handleCurrentChange(this.page);
                        } else if (!_status) {
                            this.$message({
                                message: null != _error ? _error.message : 'Error!',
                                type: 'error'
                            });
                        }
                    }).catch((e) => {

                    let {_error} = e

                    this.$message({
                        message: null != _error ? _error.message : 'Error!',
                        type: 'error'
                    });
                });
            }
        },
        mounted() {
            this.filters.defaultBeginTime = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
            this.filters.defaultEndTime = moment().format('YYYY-MM-DD 0:0:0');

            this.initOSSAuth();
            this.getChatMsgRecordAll();
        }
    };
</script>

<style scoped>

</style>
