<template>
  <section class="contents-content-id-index">
    user_no": "94", "email": "mmCj@Ro1V.com", "updated_at": "2018-09-04 19:59:12", "category_no": "1" }
    no, title, contents

    <div>{{detail.title}}</div>
    <div>{{detail.user_no}}</div>
    <div>{{detail.email}}</div>
    <div>{{detail.updated_at}}</div>
    <div>{{detail.category_no}}</div>
    <div>{{detail.no}}</div>
    <div>{{detail.contents}}</div>


    <br>
    <br>
    <br>

    <h3>reply</h3>

    <!--user_no, email, no, contents, updated_at-->
    <div v-if="replies.length !== 0" v-for="(reply, index) in replies" :key="index">
      <table>
        <thead>
          <tr>
            <th>{{reply.no}}</th>
            <th>{{reply.contents}}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{{reply.email}} / {{reply.user_no}}</td>
            <td>{{reply.updated_at}}</td>
          </tr>
        </tbody>
      </table>

    </div>
    <div v-if="replies.length === 0">
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
    computed: {
      detail () {
        return this.$store.getters['getDetail']
      },
      replies () {
        return this.$store.getters['getReplies']
      }
    }
  }
</script>

<style scoped>

</style>
