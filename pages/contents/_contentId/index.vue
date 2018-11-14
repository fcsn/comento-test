<template>
  <section class="contents-content-id-index">
    {{detail}}
  </section>
</template>

<script>
  export default {
    name: 'gamesGameIdIndex',
    async asyncData ({store, params}) {
      const id = params.contentId
      await store.dispatch('fetchDetail', id)
    },
    computed: {
      detail () {
        return this.$store.getters['getDetail']
      }
    }
  }
</script>

<style scoped>

</style>
