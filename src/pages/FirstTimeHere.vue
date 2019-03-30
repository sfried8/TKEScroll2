<template>
  <div
    class="first-time"
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
      @keyup.enter="submit"
    >
      <template v-slot:error>invalid password</template>
    </q-input>
    <br />
    <q-btn
      size="form-label-inverted"
      color="white"
      text-color="primary"
      align="center"
      class="q-mx-md full-width"
      @click="submit()"
    >Sign in</q-btn>
    <br />
    <div style="margin-top:50px">
      Don't know the password? <br />Ask the Histor or <b
        style="color:white; text-decoration:underline; cursor:pointer;"
        @click="fakeData"
      >continue as guest</b>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import Brothers from "../Brothers";
import { QBtn, QInput, LocalStorage } from "quasar";

@Component({
  name: "first-time",
  components: {
    QBtn,
    QInput
  }
})
export default class Index extends Vue {
  height = 0;
  password = "";
  loading = false;
  invalidPassword = false;
  mounted() {
    this.height = window.innerHeight;
    document.querySelector("input").style.color = "#ffddcc";
  }
  fakeData() {
    this.$q
      .dialog({
        title: "Continue as guest?",
        message:
          "You will be able to view and demo the whole site, but fake information will be used.",
        ok: true,
        cancel: true
      })
      .onOk(() => {
        LocalStorage.set("brothersPassword", "GUEST");
        this.$router.push("/");
      })
      .onCancel(() => console.log("cancelled"));
  }
  submit() {
    this.loading = true;
    this.invalidPassword = false;
    Brothers.authenticate(this.password).then(data => {
      this.loading = false;
      if (data.role === "GUEST") {
        this.password = "";
        this.invalidPassword = true;
      } else {
        LocalStorage.set("role", data.role);
        LocalStorage.set("brothersPassword", this.password);
        if (data.role === "HISTOR") {
          this.$router.push("/histor");
        } else {
          this.$router.push("/home");
        }
      }
    });
  }
}
</script>

<style lang="stylus" scoped>
.first-time {
  padding: 8%;
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
