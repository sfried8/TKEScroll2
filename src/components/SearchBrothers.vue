<template>

  
    <!--
        Replace following <div> with
        <router-view /> component
        if using subRoutes
      -->
    <div class="layout-padding">
            <q-search v-model="terms" placeholder="Search for a brother by name">
        <q-autocomplete :filter="myFilter" @search="search" @selected="selected" />
      </q-search>
    </div>
</template>

<script lang="ts">
import SearchBrothers from "./SearchBrothers";
export default SearchBrothers;
</script>

<style lang="stylus">
</style>
