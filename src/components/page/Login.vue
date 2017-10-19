<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="0px"
                 class="demo-ruleForm login-container">
            <h3 class="title">Sys后台管理</h3>
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" placeholder="username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" placeholder="password" v-model="ruleForm.password"
                          @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <div class="login-btn">
                <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">登录
                </el-button>
            </div>
            <p style="font-size:12px;line-height:30px;color:#999;">Tips : admin： 管理员<br> intern： 见习员~ 就是权限管理噻～～</p>
        </el-form>
    </div>
</template>

<script>
    import errCodeCN from '../../../static/errCodeCN.json';
    import {login}  from '../../api';

    export default {
        data: function () {
            return {
                logining: false,
                ruleForm: {
                    username: 'admin',
                    password: '123456'
                },
                rememberMe: true,
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.logining = true;

                        let userAgent = navigator.userAgent;

                        let params = {
                            credentials: {
                                username: this.ruleForm.username,
                                password: this.ruleForm.password
                            },
                            postBody: {
                                deviceid: userAgent,
                                src: 3
                            }
                        };

                        login(params).then((data) => {
                            this.logining = false;
                            let {_status, _error, account, expiration, token} = data;

                            if (null != _status && !_status) {
                                this.$message({
                                    message: null != _error ? errCodeCN[_error.code] : 'Error!',
                                    type: 'error'
                                });
                            } else {
                                this.$store.commit('SET_ACCOUNT', account);
                                this.$store.commit('SET_TOKEN', token);
                                localStorage.removeItem('token');
                                localStorage.setItem('token', token);
                                localStorage.setItem('account', account);
                                localStorage.setItem('expiration', expiration);
                                self.$router.push('/dashboard');
                            }
                        }).catch((e) => {
                            let {_error} = e;
                            this.$message({
                                message: null != _error ? _error.message : 'Error!',
                                type: 'error'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted: function () {
//            this.getErrCodeAll();
        }
    };
</script>

<style lang="scss" scoped>

    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>
