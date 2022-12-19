<template>
  <main-navbar></main-navbar>
  <router-view/>
</template>

<script>

import MainNavbar from '@/components/MainNavbar'

export default {
  name: 'App',
  components: { MainNavbar }
}
</script>

<style>

</style>
