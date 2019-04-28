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
      <brother-select
        @input="goToBrother"
        label="Quick Look up"
        outlined
        class="bg-white"
        style="margin:10px"
        clear-after-select
      >
        <template #prepend>
          <q-icon name="search"></q-icon>
        </template>
      </brother-select>
      <div class="row">
        <div class="col">
          <div
            class="home-link shadow-1"
            @click="$router.push('/scroll')"
          >
            <p>Scroll</p>
            <q-icon
              size="36px"
              name="group"
            />
          </div>
        </div>
        <div class="col">
          <div
            class="home-link shadow-1"
            @click="$router.push('/eboard')"
          >
            <p>EBoard</p>
            <q-icon
              size="36px"
              name="gavel"
            />
          </div>
        </div>
        <div class="col">
          <div
            class="home-link shadow-1"
            @click="$router.push('/tree')"
          >
            <p>Tree</p>
            <img
              src="~/assets/familytreeicon.png"
              style="height:36px;margin-bottom:-5px"
            />
          </div>
        </div>

      </div>
    </div>
    <div class="q-ma-xl">
      <p>
        Something wrong?
      </p>
      <p>
        Contact the Histor with any corrections to the brothers' information. For any issues/bugs with the website itself, <a href="https://github.com/sfried8/TKEScroll2/issues">submit an issue on GitHub</a> or send me an email at sfried8@gmail.com
      </p>
    </div>
  </q-page>
</template>

<script>
  export default {
    methods: {
      goToBrother(brother) {
        if (brother && brother.scroll) {
          this.$router.push("/brother/" + brother.scroll);
        }
      }
    }
  };
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

  .home-link {
    margin: 10px;
    padding: 10px;
    border: 1px lightgrey solid;
    border-radius: 3px;

    p {
      margin: 5px;
      font-size: 16pt;
    }
  }
</style>
