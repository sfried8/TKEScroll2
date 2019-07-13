<template>
  <div
    class="first-time"
    :style="{'height':height + 'px'}"
  >
    <div style="max-width:700px;margin:auto;">

      <img
        id="triangleimg"
        src="~/assets/tketriangle.png"
      />

      <q-input
        type="password"
        color="white"
        autofocus
        :loading="loading"
        v-model="password"
        placeholder="Password"
        @keyup.enter="submit"
        class="password-input"
      >
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

  </div>
</template>

<script>
  import { LocalStorage } from "quasar";

  export default {
    data() {
      return {
        height: 0,
        password: "",
        loading: false,
        invalidPassword: false
      };
    },

    mounted() {
      this.height = window.innerHeight;
      document.querySelector("input").style.color = "#ffddcc";
    },
    methods: {
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
            this.$gtm.logEvent("Authorization", "Login", "Login Guest");
            LocalStorage.set("apiKey", "GUEST");
            this.$router.push("/");
          })
          .onCancel(() => console.log("cancelled"));
      },
      submit() {
        this.loading = true;
        this.invalidPassword = false;

        this.$brothers.authenticate(this.password).then(data => {
          this.loading = false;

          if (data.error || data.role === "GUEST") {
            this.$gtm.logEvent("Authorization", "Login", "Login Error");
            this.password = "";
            this.invalidPassword = true;
            this.$q.notify("Invalid password.");
          } else {
            LocalStorage.set("role", data.role);
            LocalStorage.set("apiKey", this.password);
            if (data.role === "HISTOR") {
              this.$gtm.logEvent(
                "Authorization",
                "Login",
                "Histor Login Success"
              );
              this.$router.push("/histor");
            } else {
              this.$gtm.logEvent(
                "Authorization",
                "Login",
                "Brother Login Success"
              );
              this.$router.push("/home");
            }
          }
        });
      }
    }
  };
</script>

<style >
  .first-time {
    padding: 8%;
    background-image: radial-gradient(circle, #ad4644, #ad2624);
    color: #ffddcc;
  }

  .password-input ::-webkit-input-placeholder {
    color: #ffddcc !important;
  }

  .password-input ::-moz-placeholder {
    color: #ffddcc !important;
  }

  .password-input ::-ms-placeholder {
    color: #ffddcc !important;
  }

  .password-input ::placeholder {
    color: #ffddcc !important;
  }

  .q-if-label-inner {
    color: white !important;
  }

  #triangleimg {
    max-width: 80%;
    max-height: 250px;
    display: block;
    margin: auto;
  }
</style>
