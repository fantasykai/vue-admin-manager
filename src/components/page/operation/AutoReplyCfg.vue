<template>
    <section>
        <!--<hr/>-->
        <template>
            <section class="toolbar">
                <p></p>
                <strong>{{this.promptText}}</strong> /
                <router-link to="/operatingAccountManage">
                    返回
                </router-link>
                <cfg_list :userId="this.userId" :scenes="this.scene.addFriend"
                          :cfgType="this.msgCfgType.addFriend"></cfg_list>
                <hr>
                <cfg_list :userId="this.userId" :scenes="this.scene.firstReply"
                          :cfgType="this.msgCfgType.firstReply"></cfg_list>
            </section>
        </template>
    </section>
</template>

<script>

    import autoReplyCfgList from './AutoReplyCfgList.vue'
    export default {
        components: {
            'cfg_list': autoReplyCfgList,
        },
        data() {
            return {
                scene: {
                    addFriend: '加好友自动回复',
                    firstReply: '首次消息自动回复'
                },
                msgCfgType: {
                    addFriend: 'addfriend',
                    firstReply: 'onereply'
                },
                userId: this.$route.params.userId,
                promptText: '视频要求： 2M以下, 9:16, 10s 以内',
            };
        },
        filters: {},
        methods: {},
        mounted() {

        }
    };
</script>

<style scoped>
    hr {
        margin-top: 7px;
        *margin: 0;
        border: 0;
        color: black;
        background-color: black;
        height: 1px
    }
</style>
