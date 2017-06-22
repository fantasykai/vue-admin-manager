<template>
    <div>
        <div class="oss_file">{{ this.inputName }}
            <input type="file" :id="id" :multiple="multiple" @change="doUpload"/>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    export default{
        name: 'uploadAliOSS',
        props: {
            multiple: {
                type: Boolean,
                twoWay: false
            },
            id: {
                type: String,
                twoWay: false
            },
            url: {
                type: String,
                twoWay: true
            },
            objectName: {
                type: String,
                twoWay: true
            },
            uploadStatus: {
                type: Boolean,
                twoWay: true
            },
            uploadRes: {
                type: Number,
                twoWay: true
            },
            userId: {
                type: String,
                twoWay: false
            },
            inputName: {
                type: String,
            },
            path: {
                type: String,
            },
        },
        data(){
            return {
                ossClient: Object,
                resultUpload: '',
                objectKey: {
                    userId: this.userId,
                },
                content: {
                    path: this.path,
                    imgObj: 'app:image',
                    videoObj: 'app:video'
                }

            };
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
                    endpoint: 'https://test.aliyuncs.com',
                });
            },
            doUpload(){
                const _this = this;
                const files = document.getElementById(_this.id);
                if (files.files) {

                    if ('上传图片' === _this.inputName) {
                        _this.$emit('update:objectName', _this.content.imgObj);
                        _this.$emit('update:uploadStatus', true);
                    } else if ('上传视频' === _this.inputName) {
                        _this.$emit('update:objectName', _this.content.videoObj);
                        _this.$emit('update:uploadStatus', true);
                    } else if ('上传视频第一帧' === _this.inputName) {
//                        _this.$emit('update:objectName', _this.content.imgObj);
                        _this.$emit('update:uploadStatus', true);
                    }


                    const fileLen = document.getElementById(_this.id).files
                    for (let i = 0; i < fileLen.length; i++) {
                        const file = fileLen[i];
                        const storeAs = file.name;

                        let suffix = storeAs.split(".")[1]

                        let storeKey = _this.content.path + moment().format('YYYY/MM/DD/') + _this.objectKey.userId + '_' + moment.utc() + '.' + suffix;

                        _this.resultUpload = storeKey;

                        _this.ossClient.multipartUpload(storeKey, file, {}).then((results) => {

                            this.$emit('update:uploadRes', 100);

                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                    _this.url = this.resultUpload;

                    _this.$emit('update:url', this.resultUpload);
                }
            }
        },
        mounted() {
            this.initOSSAuth();
        }
    };
</script>

<style type="text/css">
    .oss_file {
        position: relative;
        display: inline-block;
        background: #D0EEFF;
        border: 1px solid #99D3F5;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        color: #1E88C7;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
    }

    .oss_file input {
        position: absolute;
        font-size: 100px;
        right: 0;
        top: 0;
        opacity: 0;
    }

    .oss_file:hover {
        background: #AADFFD;
        border-color: #78C3F3;
        color: #004974;
        text-decoration: none;
    }
</style>
