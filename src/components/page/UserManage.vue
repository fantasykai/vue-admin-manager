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
                            <el-tag type="gray">{{ scope.row | formatuserId }} </el-tag>
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
    </section>
</template>

<script>
    // 时间处理
    import moment from 'moment';
    import channelCode from '../../../static/channelCode.json';
    import config from '../../config';
    //    import {getUsersPage, getNickname} from '../../api';
    import {getUsersPage, getNickname} from '../../api/users';

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
            formatBeijingDate(date) {

                let beijingDate = ''
                if (date) {
                    beijingDate = moment(date).add(8, 'hours').format('YYYY-MM-DD HH:mm:ss')
                }
                return beijingDate;
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
            formattedConstellation(index) {

                let constellationStrings = ["白羊", "金牛", "双子", "巨蟹", "狮子"
                    , "处女", "天秤", "天蝎", "射手", "摩羯", "水瓶", "双鱼", "双鱼"];
                return constellationStrings[index];

            },
            formattedBirthday(str) {
                let birthday = '';
                if (str) {
                    birthday = str.split(" ")[0];
                }
                return birthday
            },
            formattedSex(sex) {
                let sexName = '不明'
                if (1 === sex) {
                    sexName = '男'
                } else if (2 === sex) {
                    sexName = '女'
                }
                return sexName;
            },
            formattedSexual(sexual) {

                let sexualName = '不明'
                if (1 === sexual) {
                    sexualName = '汉子'
                } else if (2 === sexual) {
                    sexualName = '妹子'
                } else if (3 === sexual) {
                    sexualName = '人类'
                }
                return sexualName;
            },
            formattedDetail(address){

                let addrJson = JSON.stringify(address);

                let addr = ''

                if (addrJson) {
                    let {item0, item1, item2} = JSON.parse(addrJson);

                    if (item0) {
                        addr += item0.province + '/' + item0.city + item0.region + '/'
                    }
                    if (item1) {
                        addr += item1.detail + '/'
                    }
                    if (item2) {
                        addr += item2.detail + '/'
                    }
                }
                return addr;

            },
            formattedSchools(schools){
                let schoolJson = JSON.stringify(schools);

                let schoolName = '';

                if (schoolJson) {
                    let {item0} = JSON.parse(schoolJson);

                    if (item0) {
                        schoolName += item0.city + '/' + item0.region + '/' + item0.school
                    }
                }
                return schoolName
            },
            formattedJob(job) {

                let jobJson = JSON.stringify(job);

                let jobName = ''

                if (jobJson) {
                    let {c} = JSON.parse(jobJson);

                    if (c) {
                        jobName = c;
                    }
                }
                return jobName;
            },
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
            //获取消息记录信息
            getUserList() {

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
                }

                let dateParam = ('' != this.filters.beginTime && '' != this.filters.endTime ) ? '"_created":{"$gt":"' + moment(this.filters.beginTime).format('YYYY-MM-DD 0:0:0') + '","$lt":"' + moment(this.filters.endTime).format('YYYY-MM-DD 0:0:0') + '"}}' : '}';

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

                    console.log("this.records : " + this.records);

                    this.listLoading = false;
                    for (let i = 0; i < this.records.length; i++) {

                        let {avatar} = this.records[i];

                        console.log("avatar : " + avatar);

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
