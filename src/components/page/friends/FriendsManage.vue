<template>
    <section class="toolbar">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="我的好友" name="first">
                <user-relation :userId="this.filters.userId" :where="this.queryCfg.friends"
                               :relationName="this.relationNames.friend"
                               :previousPage="this.filters.previousPage"></user-relation>
            </el-tab-pane>
            <el-tab-pane label="待审批" name="second">
                <template v-if="approval">
                    <user-relation :userId="this.filters.userId" :where="this.queryCfg.pending"
                                   :relationName="this.relationNames.pending"
                                   :previousPage="this.filters.previousPage"></user-relation>
                </template>
            </el-tab-pane>
            <el-tab-pane label="已申请" name="third">
                <template v-if="alreadyApplied">
                    <user-relation :userId="this.filters.userId" :where="this.queryCfg.applied"
                                   :relationName="this.relationNames.applied"
                                   :previousPage="this.filters.previousPage"></user-relation>
                </template>
            </el-tab-pane>
            <el-tab-pane label="黑名单" name="fourth">
                <template v-if="blacklist">
                    <user-relation :userId="this.filters.userId" :where="this.queryCfg.blacklist"
                                   :relationName="this.relationNames.blacklist"
                                   :previousPage="this.filters.previousPage"></user-relation>
                </template>
            </el-tab-pane>
            <el-tab-pane label="我的分组" name="rows">
                <template v-if="myRows">
                    <user-rows :userId="this.filters.userId" :relationName="this.relationNames.myRows"
                               :previousPage="this.filters.previousPage"></user-rows>
                </template>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    // 时间处理
    import userRelation from './UserRelationInfo.vue';
    import userRows from './FriendRows.vue';

    export default {
        components: {
            'user-relation': userRelation,
            'user-rows': userRows
        },
        data() {
            return {
                activeName: this.$route.params.activeName ? this.$route.params.activeName : 'first',
                filters: {
                    userId: this.$route.params.userId,
                    previousPage: this.$route.params.currMenu
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
                    myRows: '我的分组',

                },
                isFriend: true,
                approval: false,
                alreadyApplied: false,
                blacklist: false,
                myRows: false,
            };
        },
        methods: {
            handleClick(tab, event) {

                this.isFriend = false;
                this.approval = false;
                this.alreadyApplied = false;
                this.blacklist = false;
                this.myRows = false;

                if ('second' === this.activeName) {
                    this.approval = true
                } else if ('third' === this.activeName) {
                    this.alreadyApplied = true
                } else if ('fourth' === this.activeName) {
                    this.blacklist = true
                } else if ('rows' === this.activeName) {
                    this.myRows = true
                }
            },
        },
        mounted: function () {
            this.handleClick();
        }
    };
</script>

<style scoped>

</style>
