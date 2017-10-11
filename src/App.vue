<template>
  <div id="app">
    <nav class="navbar is-transparent" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{name: 'home'}">BIBAL</router-link>
        <button class="button navbar-burger">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item is-tab" :to="{name: 'usagers.index'}">Usagers</router-link>
          <router-link class="navbar-item is-tab" :to="{name: 'oeuvres.index'}">Oeuvres</router-link>
          <router-link class="navbar-item is-tab" :to="{name: 'exemplaires.index'}">Exemplaires</router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="sass">
  @import "~css/styles.sass"
</style>
