<template>
    <section>
        <!--<hr/>-->
        <template>
            <section class="toolbar">
                <div id="massTitle">
                    <div id="whoMass"><strong>{{this.newsMassNickname}} 的群发消息</strong></div>
                </div>
                <p></p>
                <strong>{{this.promptText}}</strong> /
                <router-link to="/operatingAccountManage">
                    返回
                </router-link>
                <news_mass_record :userId="this.userId" :scenes="this.scene.sendNow"
                          :cfgType="this.msgCfgType.sendNow"></news_mass_record>
            </section>
        </template>
    </section>
</template>

<script>
    import newsMassRecord from './NewsMassRecord.vue'
    export default {
        components: {
            'news_mass_record': newsMassRecord,
        },
        data() {
            return {
                scene: {
                    sendNow: '实时群发给所有好友',
                },
                msgCfgType: {
                    sendNow: 'sendnow',
                },
                userId: this.$route.params.userId,
                promptText: '视频要求： 2M以下, 9:16, 10s 以内',
                newsMassNickname: this.$route.params.nickname,
            };
        },
        filters: {},
        methods: {},
        mounted() {

        }
    };
</script>

<style>
    #massTitle {
        display: flex;
        /*width: 400px; !* 宽度值，随便啦 *!*/
        /*height: 400px;  !* 高度值，随便啦 *!*/
        justify-content: center;
        align-items: center;
        background-color: yellow;
    }

    #whoMass {
        /*width: 100px;!* 宽度值，随便啦 *!*/
        /*height: 20px;!* 高度值，随便啦 *!*/
        font-size: 20px;
        background-color: transparent; /* Magic! */
    }
</style>
