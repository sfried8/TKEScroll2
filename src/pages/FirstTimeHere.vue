<template>
  <div>
    <div
      class="layout-padding"
      :style="{'height':height + 'px'}"
    >
      <img
        id="triangleimg"
        src="~/assets/tketriangle.png"
      />

      <q-input
        type="password"
        color="white"
        :error="invalidPassword"
        bottom-slots
        autofocus
        :loading="loading"
        v-model="password"
        placeholder="Password"
      >
        <template v-slot:error>invalid password</template>
      </q-input>
      <br />
      <q-btn
        size="form-label-inverted"
        color="white"
        text-color="primary"
        align="center"
        class="full-width"
        @click="submit()"
      >Sign in</q-btn>
      <br />
      <div style="margin-top:50px">
        Don't know the password? <br />Ask the Histor or <b
          style="color:white; text-decoration:underline; cursor:pointer;"
          @click="fakeData"
        >continue as guest</b>
      </div>
      <!-- <q-btn @click="promptForPassword(false)">Brother or Sweetheart</q-btn> -->
      <!-- <q-btn @click="fakeData">Guest</q-btn> -->

    </div>
  </div>
</template>

<script lang="js">
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import {
    QBtn,
    QInput,
    QField,
    LocalStorage
} from "quasar";

@Component({
    name: "first-time",
    components: {
        QBtn,
        QInput,
        QField
    }
})
export default class Index extends Vue {
    height=0;
    password = ""
    loading = false
    invalidPassword = false;
    mounted() {
      this.height = window.innerHeight;
      document.querySelector("input").style.color = "#ffddcc";
    }
    fakeData() {
                this.$q.dialog({
            title: "Continue as guest?",
             message:
                "You will be able to view and demo the whole site, but fake information will be used.",
            ok: true,
                cancel:true

            
        }).onOk(() => {
                        LocalStorage.set("brothersPassword", "GUEST");
                        this.$router.push("/");
                    }).onCancel(()=>console.log("cancelled"));

    }
    submit() {
      this.loading = true;
      this.invalidPassword = false
      Brothers.authenticate(this.password).then(data => {
        this.loading = false
                            if (data.role === "GUEST") {
                                this.password = ""
                                this.invalidPassword = true
                            } else {
                                LocalStorage.set("brothersPassword", this.password);
                                this.$router.push("/");
                            }
                        });
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

<style lang="stylus" scoped>
.layout-padding {
  background-image: radial-gradient(circle, #AD4644, #AD2624);
  color: #FFddcc;
}

input::placeholder {
  color: white;
}

.q-if-label-inner {
  color: white !important;
}

#triangleimg {
  width: 80%;
  display: block;
  margin: auto;
}
</style>
