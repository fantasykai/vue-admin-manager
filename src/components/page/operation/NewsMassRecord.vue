<template>
    <section>
        <!--<hr/>-->
        <template>
            <section>
                <el-col :span="24" style="padding-bottom: 0px;">
                    <el-form :inline="true" :model="msgCfgType">
                        <el-form-item>
                            <el-button type="text" :disabled="true"><strong>{{this.msgCfgType.scenes}}</strong>
                            </el-button>
                            <el-button type="text" @click="sendMassMsg">消息群发</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-table :data="settings" highlight-current-row
                          v-loading="listLoading"
                          style="width: 100%;">
                    <!--<el-table-column type="selection" width="55">-->
                    <!--</el-table-column>-->
                    <el-table-column type="index" width="90">
                    </el-table-column>
                    <el-table-column prop="_created" :formatter="formatBeijingDate" label="发送时间">

                    </el-table-column>
                    <el-table-column label="消息内容" width="400" sortable>
                        <template scope="scope">
                            <show-video v-if="isVideo[scope.$index]" :src="videoSrc[scope.$index]"
                                        :thumbnail="thumbnailSrc[scope.$index]"></show-video>
                            <img v-if="!isVideo[scope.$index]"
                                 :src="videoSrc[scope.$index]">
                        </template>
                    </el-table-column>
                    <el-table-column label="发送结果">
                        <template scope="scope">
                            success
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作">
                        <template scope="scope">
                            <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除记录
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--工具条 分页-->
                <el-col :span="24" class="toolbar">
                    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                                   :total="total" style="float:right;">
                    </el-pagination>
                </el-col>

                <!--发送消息界面-->
                <el-dialog :title="`消息群发 : ` + this.msgCfgType.scenes" v-model="addFormVisible"
                           :close-on-click-modal="false">
                    <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
                        <el-form-item label="上传图片">
                            <el-row :gutter="20">
                                <el-col :xs="20" :sm="10" :md="18" :lg="18">
                                    <el-card class="box-card">
                                        <div>
                                            <upload-ali-oss :url.sync="addForm.content.path" :multiple="true"
                                                            :id="imgUpload.uploadId"
                                                            :inputName="uploadInputName.uploadImg"
                                                            :path="imgUpload.uploadUrl"
                                                            :uploadStatus.sync="addForm.uploadStatus.uploadImgStatus"
                                                            :objectName.sync="addForm.objectName"
                                                            :uploadRes.sync="addForm.uploadRes.img"
                                                            :userId="msgCfgType.userId"></upload-ali-oss>
                                        </div>
                                        <!--<div v-for="path in addForm.content.path">-->
                                        <!--{{ path }}-->
                                        <!--</div>-->
                                        <el-progress :text-inside="true" :stroke-width="15" :percentage="addForm.uploadRes.img"
                                                     status="success"></el-progress>
                                        <div v-show="addForm.uploadStatus.uploadImgStatus"
                                             v-text="addForm.content.path">
                                        </div>
                                        <div> 照片时长 :
                                            <!--<el-select v-model="addForm.content.burnSecond" placeholder="照片时长"-->
                                            <!--style="width: 30%;">-->
                                            <!--<el-option-->
                                            <!--v-for="item in burnSecondOptions"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                            <!--</el-option>-->
                                            <!--</el-select>-->
                                            <el-input v-model="addForm.content.burnSecond"
                                                      style="width: 10%;"></el-input>
                                            'S
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item label="上传视频">
                            <el-row :gutter="20">
                                <el-col :xs="20" :sm="10" :md="18" :lg="18">
                                    <el-card class="box-card">
                                        <div>
                                            <upload-ali-oss :url.sync="addForm.content.path" :multiple="true"
                                                            :inputName="uploadInputName.uploadVideo"
                                                            :id="videoUpload.uploadId"
                                                            :path="videoUpload.uploadUrl"
                                                            :uploadStatus.sync="addForm.uploadStatus.uploadVideoStatus"
                                                            :objectName.sync="addForm.objectName"
                                                            :uploadRes.sync="addForm.uploadRes.video"
                                                            :userId="msgCfgType.userId"></upload-ali-oss>
                                        </div>
                                        <!--<div v-for="url in addForm.content.path">-->
                                        <!--{{ path }}-->
                                        <!--</div>-->
                                        <el-progress :text-inside="true" :stroke-width="15" :percentage="addForm.uploadRes.video"
                                                     status="success"></el-progress>
                                        <div v-show="addForm.uploadStatus.uploadVideoStatus"
                                             v-text="addForm.content.path"></div>
                                        <div>
                                            <upload-ali-oss :url.sync="addForm.content.thumbnail" :multiple="true"
                                                            :id="videoUpload.uploadThumbnailId"
                                                            :inputName="uploadInputName.uploadImgVideoImg"
                                                            :path="videoUpload.uploadUrl"
                                                            :uploadStatus.sync="addForm.uploadStatus.uploadThumbnailStatus"
                                                            :objectName.sync="addForm.objectName"
                                                            :uploadRes.sync="addForm.uploadRes.thumbnail"
                                                            :userId="msgCfgType.userId"></upload-ali-oss>
                                        </div>
                                        <!--<div v-for="url in addForm.content.thumbnail">-->
                                        <!--{{ path }}-->
                                        <!--</div>-->
                                        <el-progress :text-inside="true" :stroke-width="15" :percentage="addForm.uploadRes.thumbnail"
                                                     status="success"></el-progress>
                                        <div v-show="addForm.uploadStatus.uploadThumbnailStatus"
                                             v-text="addForm.content.thumbnail"></div>
                                        <div> 视频时长 :
                                            <!--<el-select v-model="addForm.content.duration" placeholder="视频时长"-->
                                            <!--style="width: 30%;">-->
                                            <!--<el-option-->
                                            <!--v-for="item in durationOptions"-->
                                            <!--:key="item.value"-->
                                            <!--:label="item.label"-->
                                            <!--:value="item.value">-->
                                            <!--</el-option>-->
                                            <!--</el-select>-->
                                            <el-input v-model="addForm.content.duration" style="width: 10%;"></el-input>
                                            'S
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click.native="cancelAdd">取消</el-button>
                        <el-button type="primary" @click.native="sendMassMsgSubmit" :loading="addLoading">发送</el-button>
                    </div>
                </el-dialog>
            </section>
        </template>
    </section>
</template>

<script>
    // 时间处理
    import moment from 'moment';
    import {getMsgConfigs, setMsgConfigs, deleteMsgConfigs} from '../../../api';
    import config from '../../../config';
    import UploadAliOSS from '../uploadOSS/UploadOSS.vue';
    import showVideo from '../../common/ShowVideo.vue';

    export default {
        name: 'autoReplyCfgList',
        props: ['userId', 'scenes', 'cfgType'],
        components: {
            'show-video': showVideo,
            'upload-ali-oss': UploadAliOSS
        },
        data() {
            return {
                ossClient: Object,
                msgCfgType: {
                    scenes: this.scenes,
                    cfgType: this.cfgType,
                    userId: this.userId,
                },
                listLoading: false,
                settings: [],
                isVideo: [],
                videoSrc: [],
                thumbnailSrc: [],
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
//                    name: [
//                        {required: true, message: '请输入姓名', trigger: 'blur'}
//                    ]
                },
                initTimeLimit: {
                    start: '00:00',
                    step: '00:15',
                    end: '24:00',
                },
                //编辑界面数据
                editForm: {
                    msgConfigId: '',
                    fromUserId: '',
                    objectName: '',
                    content: {
                        path: '',
                        thumbnail: '',
                        receiptId: '',
                        burnSecond: 0,
                        duration: 0,
                    },
                    enable: true,
                    type: '',
                    period: {
                        start: '',
                        end: ''
                    },
                    interval: {
                        min: 10,
                        max: 50
                    },
                    uploadStatus: {
                        uploadImgStatus: false,
                        uploadVideoStatus: false,
                        uploadThumbnailStatus: false,
                    },
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
//                    name: [
//                        {required: true, message: '请输入姓名', trigger: 'blur'}
//                    ]
                },
                //发送消息界面数据
                addForm: {
                    fromUserId: '',
                    objectName: '',
                    content: {
                        path: '',
                        thumbnail: '',
                        receiptId: '',
                        burnSecond: 0,
                        duration: 0,
                    },
                    enable: true,
                    type: '',
                    period: {
                        start: '',
                        end: ''
                    },
                    interval: {
                        min: 10,
                        max: 50
                    },
                    uploadStatus: {
                        uploadImgStatus: false,
                        uploadVideoStatus: false,
                        uploadThumbnailStatus: false,
                    },
                    uploadRes: {
                        img: 0,
                        video: 0,
                        thumbnail: 0,
                    }
                },
                uploadInputName: {
                    uploadImg: "上传图片",
                    uploadVideo: "上传视频",
                    uploadImgVideoImg: "上传视频第一帧"
                },
                imgUpload: {
                    uploadUrl: 'chat/c2c/img/',
                    uploadId: 'imgFile',
                    uploadImgStatus: false,
                },
                videoUpload: {
                    uploadUrl: 'chat/c2c/video/',
                    uploadId: 'videoFile',
                    uploadThumbnailId: 'thumbnailFile',
                    uploadVideoStatus: false,
                    uploadThumbnailStatus: false,
                },
                durationOptions: [{
                    value: 1,
                    label: '1\'s'
                },
                    {
                        value: 2,
                        label: '2\'s'
                    }, {
                        value: 3,
                        label: '3\'s'
                    }, {
                        value: 4,
                        label: '4\'s'
                    }, {
                        value: 5,
                        label: '5\'s'
                    }, {
                        value: 6,
                        label: '6\'s'
                    }, {
                        value: 7,
                        label: '7\'s'
                    }, {
                        value: 8,
                        label: '8\'s'
                    }, {
                        value: 9,
                        label: '9\'s'
                    }, {
                        value: 10,
                        label: '10\'s'
                    }],
                burnSecondOptions: [{
                    value: '1',
                    label: '1\'s'
                }, {
                    value: 3,
                    label: '3\'s'
                }, {
                    value: 5,
                    label: '5\'s'
                }, {
                    value: 8,
                    label: '8\'s'
                }, {
                    value: 10,
                    label: '10\'s'
                }],
            };
        },
        filters: {},
        methods: {
            formatBeijingDate(row) {

                let beijingDate = ''
                if (row._created) {
                    beijingDate = moment(row._created).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
                }
                return beijingDate;
            },
            // 视频、图片播放时长
            formatDuration(row) {

                let duration = ''

                if (row.content.burnSecond) {
                    duration = row.content.burnSecond + '\'s'
                } else if (row.content.duration) {
                    duration = row.content.duration + '\'s'
                }
                return duration
            },
            // 随机时延
            formatInterval(row) {
                let min = ''
                let max = ''

                if (row.interval.min) {
                    min = row.interval.min + '\'s'
                }
                if (row.interval.max) {
                    max = row.interval.max + '\'s'
                }
                return min + ' - ' + max;
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
                this.getUserMsgConfigs();
            },
            getUserMsgConfigs() {
                this.getsettings();
            },
            getsettings() {
                //{"fromUserId":"59118c3ecb5e5571a5c6c932","type":"addfriend"}
                let queryAddfriend = '{"fromUserId":"' + this.msgCfgType.userId + '","type":"' + this.msgCfgType.cfgType + '"}',

                    para = {
                        where: queryAddfriend,
                        sort: '-_created',
                        max_results: '50',
                        page: this.page
                    };
                this.listLoading = true;

                getMsgConfigs(para).then((res) => {
                    this.total = res.data._meta.total;
                    this.settings = res.data._items;
                    this.listLoading = false;

                    for (let i = 0; i < this.settings.length; i++) {
//
                        // 判断objectName为app:image app:video
                        let contentType = 'video/mp4';
                        if ('app:video' === this.settings[i].objectName) {
                            this.isVideo[i] = true;
                        } else {
                            this.isVideo[i] = false;
                            contentType = 'image/jpeg'
                        }

                        let {path, thumbnail} = this.settings[i].content;

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
                    //NProgress.done();
                });
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = row._id;
                    deleteMsgConfigs(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUserMsgConfigs();
                    });
                }).catch(() => {

                });
            },
            //发送群发消息
            sendMassMsg: function () {
                this.addFormVisible = true;
                this.addForm = {
                    fromUserId: '',
                    objectName: '',
                    content: {
                        path: '',
                        thumbnail: '',
                        receiptId: '',
                        burnSecond: 10,
                        duration: 10,
                    },
                    enable: true,
                    type: '',
                    period: {
                        start: '08:00',
                        end: '20:00'

                    },
                    interval: {
                        min: 10,
                        max: 50
                    },
                    uploadStatus: {
                        uploadImgStatus: false,
                        uploadVideoStatus: false,
                        uploadThumbnailStatus: false,
                    },
                    uploadRes: {
                        img: 0,
                        video: 0,
                        thumbnail: 0,
                    }
                };
            },
            cancelAdd: function () {
                this.addFormVisible = false;
                this.$refs['addForm'].resetFields();
            },
            //发送消息提交接口
            sendMassMsgSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认发送吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();

                            let params = {
                                "fromUserId": this.msgCfgType.userId,
                                "objectName": this.addForm.objectName,
                                "content": this.addForm.content,
                                "enable": this.addForm.enable,
                                "type": this.msgCfgType.cfgType,
                            }
                            setMsgConfigs(params).then(data => {

                                this.addLoading = false;
                                this.addFormVisible = false;
                                this.$refs['addForm'].resetFields();
                                let {_status, _error} = data

                                if (_status) {

                                    this.$message({
                                        message: '发送成功',
                                        type: 'success'
                                    });
                                    this.getUserMsgConfigs();

                                } else if (!_status) {
                                    this.$message({
                                        message: null != _error ? _error.message : 'Error!',
                                        type: 'error'
                                    });
                                }
                            }).catch((e) => {
                                this.addLoading = false;
                                let {_error} = e

                                this.$message({
                                    message: null != _error ? _error.message : 'Error!',
                                    type: 'error'
                                });
                            });
                        });
                    }
                });
            },
        },
        mounted() {
            this.initOSSAuth();
            this.getUserMsgConfigs();
        }
    };
</script>

<style>

    blu_upload_input input[type=file] {
        display: none !important;;
    }

    .el-upload-list__item.is-success .el-icon-close, .el-upload__input {
        display: none !important;;
    }
</style>
