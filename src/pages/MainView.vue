<template>
    <q-layout view="hHh Lpr fff" :left-class="{ 'bg-grey-2': true }">
        <q-header v-model="header" :reveal="true">
            <q-toolbar>
                <q-btn flat @click.native="left = !left">
                    <q-icon name="menu"></q-icon>
                </q-btn>

                <q-toolbar-title>
                    Tau Kappa Epsilon
                    <div slot="subtitle">Xi-Upsilon</div>
                </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer side="left" v-model="left" overlay>
            <q-list no-border link inset-delimiter>
                <q-item-label header>Navigation</q-item-label>
                <q-item to="/home">
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Home</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item to="/scroll">
                    <q-item-section avatar>
                        <q-icon name="group" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Scroll</q-item-label>
                        <q-item-label caption>View all brothers</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item to="/eboard">
                    <q-item-section avatar>
                        <q-icon name="gavel" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>E-Board</q-item-label>
                        <q-item-label caption>View current officers</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item to="/tree">
                    <q-item-section avatar>
                        <img src="~/assets/familytreeicon.png" style="width:24px;" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Tree</q-item-label>
                        <q-item-label caption>View the chapter family tree</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item v-if="showHistor" to="/histor">
                    <q-item-section avatar>
                        <q-icon name="settings" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Histor Control Panel</q-item-label>
                        <q-item-label caption>Add/Edit brothers and officers</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item :clickable="true" @click="clearCache">
                    <q-item-section avatar>
                        <q-icon name="exit_to_app" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Sign Out</q-item-label>
                        <q-item-label caption>Clear cache and sign out</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
        <!--
        Replace following <> with
        <router-view /> component
        if using subRoutes
        -->
        <q-page-container
            :style="`overflow:visible; max-width:${$route.path === '/tree' ? 'initial' : '700px'}; margin:auto;`">
            <router-view :key="$route.path" />
        </q-page-container>
    </q-layout>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
    data() {
        return {
            left: false,
            header: true,
            showHistor: false
        };
    },
    methods: {
        clearCache() {
            this.$gtm.logEvent(
                "Authorization",
                "Logout",
                LocalStorage.getItem("role") + " Logged out"
            );
            LocalStorage.clear();
            this.$brothers.clearCache();
            this.$router.push("/firsttime");
        }
    },

    mounted() {
        const layoutElement = document.querySelector(".q-layout");
        window.addEventListener("resize", () => {
            layoutElement.style.minHeight = window.innerHeight + "px";
            document.body.style.minHeight = window.innerHeight + "px";
        });
    },
    beforeMount() {
        if (LocalStorage.has("role")) {
            if (LocalStorage.getItem("role").toLowerCase() === "histor") {
                this.showHistor = true;
            }
        }
    }
};
</script>

<style lang="stylus">
    body {
        background: #eee;
    }

    .brother-link {
        color: blue;
        text-decoration: underline;
        cursor: pointer;

        div {
            width: 95%;
        }
    }
</style>
