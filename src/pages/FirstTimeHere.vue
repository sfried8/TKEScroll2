<template>
    <div>
        <q-toolbar slot="header" class="">
            <q-toolbar-title>
                Tau Kappa Epsilon
                <div slot="subtitle">Xi-Upsilon</div>
            </q-toolbar-title>
        </q-toolbar>
        <div class="layout-padding">
            I am a...
            <q-btn @click="promptForPassword(false)">Brother or Sweetheart</q-btn>
            <q-btn @click="fakeData">Guest</q-btn>

        </div>
    </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import {
    dom,
    event,
    openURL,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    LocalStorage,
    QItemMain,
    TouchSwipe,
    Dialog
} from "quasar";

@Component({
    name: "first-time",
    components: {
        QLayout,
        QToolbar,
        QToolbarTitle,
        QBtn,
        QIcon,
        QList,
        QListHeader,
        QItem,
        QItemSide,
        QItemMain
    }
})
export default class Index extends Vue {
    fakeData() {
        Dialog.create({
            title: "Continue as guest?",
            message:
                "You will be able to view and demo the whole site, but fake information will be used.",
            buttons: [
                "Cancel",
                {
                    label: "OK",
                    handler: () => {
                        LocalStorage.set("brothersPassword", "GUEST");
                        this.$router.push("/");
                    }
                }
            ]
        });
    }
    promptForPassword(retry = false) {
        let attempt = null;
        Dialog.create({
            title: `${retry ? "Invalid " : ""}Password`,
            message: retry
                ? "Please try again. If you do not know the password, ask the Histor or continue as guest."
                : "Please enter the password. You will only have to do this once.",
            form: {
                pass: {
                    type: "text",
                    label: "Password",
                    model: ""
                }
            },
            buttons: [
                "Cancel",
                {
                    label: "Submit",
                    handler: data => {
                        attempt = data.pass;
                        console.log(data);
                        Brothers.authenticate(attempt).then(data2 => {
                            console.log(data2);
                            if (data2.role === "GUEST") {
                                this.promptForPassword(true);
                            } else {
                                LocalStorage.set("brothersPassword", attempt);
                                this.$router.push("/");
                            }
                        });
                    }
                }
            ]
        });
    }
}
</script>

<style lang="stylus">
.layout-page-container {
    padding-left: 0 !important;
}
</style>
