<template>
    <div class="header">
        <div class="logo">Sys后台管理系统</div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/avatar.gif">
                    {{name}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
//    import {getNickname} from '../../api';
    import {getNickname} from 'api/users';
    export default {
        data() {
            return {
                name: 'Sys'
            }
        },
        methods: {
            handleCommand(command) {
                if (command == 'loginout') {
                    localStorage.removeItem('account');
                    localStorage.removeItem('token');
                    localStorage.removeItem('expiration');
                    localStorage.removeItem('nickname');
                    this.$router.push('/login');
                }
            },
            getUserInfo() {

                let uid = localStorage.getItem('account');

                getNickname(uid).then((res) => {

                    let {nickname} = res;

                    if (nickname) {
                        this.name = nickname;
                        localStorage.setItem("nickname", nickname)
                    }

                });

            }
        },
        mounted: function () {
            this.getUserInfo();
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }

    .header .logo {
        float: left;
        width: 250px;
        text-align: center;
    }

    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }

    .user-info .el-dropdown-link {
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }

    .user-info .user-logo {
        position: absolute;
        left: 0;
        top: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .el-dropdown-menu__item {
        text-align: center;
    }
</style>
