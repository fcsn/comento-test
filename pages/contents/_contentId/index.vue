<template>
  <section class="contents-content-id-index" style="padding: 3rem 1.5rem;">

    <div><strong style="font-size: 20px;">{{detail.title.split(' ')[1]}}</strong></div>
    <!--<div>{{detail.user_no}}</div>-->
    <div>{{detail.email}} | {{detail.updated_at}}</div>
    <div>{{detail.category_no | filteredCategory}}'s {{detail.no}}.</div>
    <div style="padding-top: 1rem;">{{detail.contents}}</div>

    <div style="padding-top: 3rem;"><h3>reply</h3></div>

    <div v-if="replies.length !== 0" v-for="(reply, index) in replies" :key="index" style="padding: 1rem 1.5rem;">
      <table>
        <thead>
          <tr>
            <th>{{reply.no}}. {{reply.contents}}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td colspan="2">{{reply.email}} / {{reply.updated_at}}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div v-if="replies.length === 0">
      <p>답글이 없습니다.</p>
      <p>이 글에 답글을 달아보는 건 어떨까요?</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'contentsContentIdIndex',
    async asyncData ({store, params}) {
      const id = params.contentId
      await store.dispatch('fetchDetail', id)
    },
    fetch ({ redirect, params }) {
      if (params.contentId === 0) {
        redirect('https://www.coupang.com/')
      }
    },
    computed: {
      detail () {
        return this.$store.getters['getDetail']
      },
      replies () {
        return this.$store.getters['getReplies']
      }
    },
    filters: {
      filteredCategory (category) {
        if (category === '1') return 'apple'
        if (category === '2') return 'banana'
        if (category === '3') return 'coconut'
      }
    }
  }
</script>

<style scoped>

</style>
