<template>
    <section class="toolbar">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="我的好友" name="first">
                <user-relation :userid="this.filters.userid" :where="this.queryCfg.friends"
                               :relationName="this.relationNames.friend"></user-relation>
            </el-tab-pane>
            <el-tab-pane label="待审批" name="second">
                <template v-if="approval">
                    <user-relation :userid="this.filters.userid" :where="this.queryCfg.pending"
                                   :relationName="this.relationNames.pending"></user-relation>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已申请" name="third">
                <template v-if="alreadyApplied">
                    <user-relation :userid="this.filters.userid" :where="this.queryCfg.applied"
                                   :relationName="this.relationNames.applied"></user-relation>
                </template>
            </el-tab-pane>
            <el-tab-pane label="黑名单" name="fourth">
                <template v-if="blacklist">
                    <user-relation :userid="this.filters.userid" :where="this.queryCfg.blacklist"
                                   :relationName="this.relationNames.blacklist"></user-relation>
                </template>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    // 时间处理
    import userRelation from './friends/UserRelationInfo.vue';

    export default {
        components: {
            'user-relation': userRelation
        },
        data() {
            return {
                activeName: 'first',
                filters: {
                    userid: this.$route.params.userId,
                },
                queryCfg: {
                    friends: '{"state":3,"secret": {"$ne": 1}}',
                    pending: '{"state":1}',
                    applied: '{"state":2}',
                    blacklist: '{"secret":1}',
                },
                relationNames: {
                    friend: '好友列表',
                    pending: '待审批',
                    applied: '申请列表',
                    blacklist: '黑名单',

                },
                isFriend: true,
                approval: false,
                alreadyApplied: false,
                blacklist: false,
            };
        },
        methods: {
            handleClick(tab, event) {

                this.isFriend = false;
                this.approval = false;
                this.alreadyApplied = false;
                this.blacklist = false;

                if ('second' === this.activeName) {
                    this.approval = true
                } else if ('third' === this.activeName) {
                    this.alreadyApplied = true
                } else if ('fourth' === this.activeName) {
                    this.blacklist = true
                }
            },
        },
        mounted() {

        }
    };
</script>

<style scoped>

</style>
