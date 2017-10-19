<template>
    <div class="dashboard-container">
        <component v-bind:is="currentRole"></component>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import DashboardBluChat from './Dashboard.vue';
    import DefaultHelloSys from './HelloSys.vue';

    export default {
        name: 'dashboard',
        components: {DashboardBluChat, DefaultHelloSys},
        data() {
            return {
                currentRole: 'DashboardBluChat'
            }
        },
        computed: {
            ...mapGetters([
                'roles'
            ])
        },
        created() {
            if (this.roles.indexOf('admin') >= 0) {
                return;
            }
            this.currentRole = 'DefaultHelloSys';
        }
    }
</script>
