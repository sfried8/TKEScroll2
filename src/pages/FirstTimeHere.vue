<template>
  <div>
    <q-toolbar
      slot="header"
      class=""
    >
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
    QToolbar,
    QToolbarTitle,
    QBtn,
    Dialog,
    LocalStorage
} from "quasar";

@Component({
    name: "first-time",
    components: {
        QToolbar,
        QToolbarTitle,
        QBtn
    }
})
export default class Index extends Vue {
    fakeData() {
                this.$q.dialog({
            title: "Continue as guest?",
             message:
                "You will be able to view and demo the whole site, but fake information will be used.",
            ok: true,
                cancel:true

            
        }).then(() => {
                        LocalStorage.set("brothersPassword", "GUEST");
                        this.$router.push("/");
                    }).catch(()=>console.log("cancelled"));

    }
    promptForPassword(retry = false) {
        let attempt = null;
        this.$q.dialog({
            title: `${retry ? "Invalid " : ""}Password`,
            message: retry
                ? "Please try again. If you do not know the password, ask the Histor or continue as guest."
                : "Please enter the password. You will only have to do this once.",
            prompt:{
                    type: "text",
                    label: "Password",
                },
            ok: "Submit",
                cancel:true,

            
        }).then(data => {
                        attempt = data;
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
                    }).catch(()=>console.log("cancelled"));
    }
}
</script>

<style lang="stylus">
.layout-page-container {
  padding-left: 0 !important;
}
</style>
