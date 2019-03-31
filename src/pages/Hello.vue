<template>
  <q-page
    padding
    class="hello"
  >
    <div>
      <p>
        Welcome to the scroll website for the Xi-Upsilon Chapter of Tau Kappa Epsilon!
      </p>
      <img src="~/assets/lem.png" />
    </div>
    <div class="absolute-bottom q-ma-xl">
      <p>
        Something wrong?
      </p>
      <p>
        Contact the Histor with any corrections to the brothers' information. For any issues/bugs with the website itself, <a href="https://github.com/sfried8/TKEScroll2/issues">submit an issue on GitHub</a> or send me an email at sfried8@gmail.com
      </p>
    </div>
  </q-page>
</template>

<script lang="js">
import Component from "vue-class-component";
import Vue from "vue";
import {QPage} from "quasar"
@Component({
    name: "hello-view",
    components:{QPage}
})
export default class Index extends Vue {
}
</script>

<style lang="stylus" scoped>
.hello {
  text-align: center;
  height: 100%;
  background-color: white;
}

.logo {
  position: absolute;
  transform-style: preserve-3d;
}

img {
  max-width: 50%;
  max-height: 300px;
}
</style>
