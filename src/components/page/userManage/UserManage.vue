<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-date-picker
                        v-model="filters.beginTime"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="filters.endTime"
                        type="date"
                        placeholder="选择日期时间"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                    |
                    <el-input v-model="filters.userId" placeholder="tel/userId/SeqId"
                              style="width: 20%;"></el-input>
                    <el-button type="primary" v-on:click="getUserList">查询</el-button>
                    <el-button style='margin-bottom:20px;float:right' type="primary" icon="document"
                               @click="handleDownload">导出excel
                    </el-button>
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
                            <el-tag type="gray">{{ scope.row | formatUserId }} </el-tag>
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
                    <router-link
                        :to="{ name: 'Sys好友管理',params: {userId : scope.row.telphone, currMenu: '/userManage'}}">
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
            <el-table-column prop="_created" label="注册时间" sortable>
            </el-table-column>
            <el-table-column
                label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <!--<el-button size="small"-->
                    <!--@click="cancelTimingTask(scope.row._id, scope.$index)">-->
                    <!--删除-->
                    <!--</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizeCfg"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                style="float:right;">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="bluId">
                    <el-input v-model="editForm.bluid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                    <el-input v-model="editForm.nickname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio :label=0>不明</el-radio>
                        <el-radio :label=1>男</el-radio>
                        <el-radio :label=2>女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="恋爱倾向">
                    <el-radio-group v-model="editForm.sexual">
                        <el-radio :label=0>不明</el-radio>
                        <el-radio :label=1>男</el-radio>
                        <el-radio :label=2>女</el-radio>
                        <el-radio :label=3>人类就行</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-radio-group v-model="editForm.usertype">
                        <el-radio-button :label=0>用户</el-radio-button>
                        <el-radio-button :label=2>主播</el-radio-button>
                        <el-radio-button :label=9 :disabled="true">管理员</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="签名">
                    <el-input type="textarea" v-model="editForm.sign"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    // 时间处理
    import moment from 'moment';
    import channelCode from 'static/channelCode.json';
    import config from '../../../config';
    //    import {getUsersPage, getNickname} from '../../api';
    import {getUsersPage, getNickname, updateUserInfo} from '../../../api/users';

    export default {
        data() {
            return {
                mock: true,
                pickerOptions2: {
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
                pageSize: 20,
                pageSizeCfg: [10, 20, 30, 40, 50],
                currentPage: 1,
                listLoading: false,
                avatarSrc: [],
                shareUsers: [],
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    _id: '',
                    seqid: 0,
                    bluid: 0,
                    nickname: '',
                    sex: 0,
                    sexual: 0,
                    usertype: 0,
                    sign: '',
                },
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
                this.getUserList();
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getUserList();
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
//                this.editForm = Object.assign({}, row);

                this.editForm = {
                    _id: row._id,
                    seqid: row.seqid,
                    bluid: row.bluid ? row.bluid : row.seqid,
                    nickname: row.nickname,
                    sex: row.sex ? row.sex : 0,
                    sexual: row.sexual ? row.sexual : 0,
                    usertype: row.usertype,
                    sign: row.sign ? row.sign : '',
                }
            },
            //获取消息记录信息
            getUserList() {

                let _this = this;

                let userIdParam = ''

                if (_this.filters.userId) {
                    userIdParam = ''
                    if (_this.filters.userId.match(_this.regex.userIdRe)) {
                        userIdParam = '"userId":"' + _this.filters.userId + '"'
                    } else if (_this.filters.userId.match(_this.regex.seqIdRe)) {
                        userIdParam = '"seqid":' + _this.filters.userId
                    } else if (this.filters.userId.match(_this.regex.tel)) {
                        userIdParam = '"telphone":"' + _this.filters.userId + '"'
                    }
                    else {
                        _this.$message({
                            message: '参数格式校验失败',
                            type: 'error'
                        });
                        return
                    }
                }

                let dateParam = ('' != _this.filters.beginTime && '' != _this.filters.endTime ) ? '"_created":{"$gt":"' + moment(_this.filters.beginTime).subtract(8, 'hours').format('YYYY-MM-DD HH:mm:ss') + '","$lt":"' + moment(_this.filters.endTime).add(16, 'hours').format('YYYY-MM-DD HH:mm:ss') + '"}}' : '}';

                if ('' !== userIdParam) {
                    if ('}' === dateParam) {
                        dateParam = userIdParam + dateParam
                    } else {
                        dateParam = userIdParam + ',' + dateParam
                    }
                }

                let
                    para = {
                        where: '{' + dateParam,
                        sort: '-_created',
                        max_results: this.pageSize,
                        page: this.page
                    };
                this.listLoading = true;
                //NProgress.start();
                getUsersPage(para).then((res) => {
                    this.total = res.data._meta.total;
                    this.records = res.data._items;

                    this.listLoading = false;
                    for (let i = 0; i < this.records.length; i++) {
                        let {avatar} = this.records[i];
                        if (this.mock) {
                            this.avatarSrc[i] = avatar;
                        } else {
                            if (avatar) {
                                avatar += '@!web_show_avatar';
                                var result = this.ossClient.signatureUrl(avatar, {
                                    response: {
                                        // 'content-disposition': 'attachment; filename="' + filename + '"'
                                        'Content-Type': 'image/jpeg'
                                    }
                                });
                                this.avatarSrc[i] = result;
                            }
                        }
                    }
                });
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交更新吗？', '提示', {}).then(() => {
                            this.editLoading = true;

                            let reqParams = {
                                "nickname": this.editForm.nickname,
                                "sex": this.editForm.sex,
                                "sexual": this.editForm.sexual,
                                "usertype": this.editForm.usertype,
                                "sign": this.editForm.sign,
                            };

                            if (this.editForm.seqid !== this.editForm.bluid) {
                                reqParams = Object.assign({"bluid": this.editForm.bluid}, reqParams);
                            }

                            let params = {
                                uri: `${config.serverURI}/bluapi/v1/users/` + this.editForm._id,
                                patchBody: reqParams
                            };
                            updateUserInfo(params)
                                .then(data => {
                                    this.editLoading = false;
                                    let {_status, _error} = data
                                    if (_status) {
                                        this.$message({
                                            message: '更新成功',
                                            type: 'success'
                                        });
                                        this.$refs['editForm'].resetFields();
                                        this.editFormVisible = false;
//                            this.submitted[index] = false;
                                        this.getUserList();
                                    } else if (!_status) {
                                        this.$message({
                                            message: null != _error ? _error.message : 'Error!',
                                            type: 'error'
                                        });
                                    }
                                }).catch((e) => {
                                this.editLoading = false;
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
            handleDownload() {
                require.ensure([], () => {
                    const {export_json_to_excel} = require('vendor/Export2Excel');
                    const tHeader = ['userId', '昵称', '手机号', '性别', '生日', '注册时间'];
                    const filterVal = ['seqid', 'nickname', 'telphone', 'sex', 'birthday', '_created'];
                    const list = this.records;
                    const data = this.formatJson(filterVal, list);
                    export_json_to_excel(tHeader, data, '用户信息excel');
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            }
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
