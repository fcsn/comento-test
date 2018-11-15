<template>
  <section class="container">
    <!--cate: {{categories}}-->
    <!--<br>-->
    <!--<br>-->
    <!--list: {{list}}-->
    <!--{{list.length}}-->
    <!--<br>-->
    <!--<br>-->
    <!--detail: {{detail}}-->
    <!--<br>-->
    <!--<br>-->
    <!--replies: {{replies}}-->
    <!--<br>-->
    <!--<br>-->
    <!--ads: {{ads}}, {{ads.length}}-->

    <!--order 버튼-->
    <button @click="orderChange('asc')">높은 순</button>
    <button @click="orderChange('desc')">낮은 순</button>

    <!--order 버튼-->
    <button @click="categoryChange(1)">사과</button>
    <button @click="categoryChange(2)">바나나</button>
    <button @click="categoryChange(3)">코코넛</button>

    <!--list/link -->
    <div v-for="(article, index) in list" :key="index" style="cursor: pointer;">
    <nuxt-link :to="{ name: 'contents-contentId', params: { contentId: article.category_no ? article.no : 0} }">
    <table>
      <thead>
      <tr>
        <th>categ no: {{article.category_no}}</th>
        <th>{{article.no}}</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{{article.email}}</td>
        <td>{{article.undated_at}}</td>

        <td v-if="index !== 3">{{article.title.split(' ')[1]}}</td>
        <td v-else>{{article.title}}</td>

        <td v-if="index === 3">
          <img src="`https://comento.cafe24.com/public/images/${article.img}`"
               alt="ad">
        </td>

        <td class="ellipsis">{{article.contents}}</td>
      </tr>
      </tbody>
    </table>
    </nuxt-link>
    </div>

  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  async asyncData ({store}) {
    // console.log(store)
    await store.dispatch('fetchCategory')
    await store.dispatch('fetchList', {page: 1, ord: 'asc', category: 1})
    await store.dispatch('fetchDetail', 1)
    await store.dispatch('fetchAds', {page_no: 1, limit: 1})
  },
  data () {
    return {
      ord: 'asc',
      category: 'apple'
    }
  },
  components: {
    AppLogo
  },
  computed: {
    categories () {
      return this.$store.getters['getCategory']
    },
    list () {
      return this.$store.getters['getList']
    },
    detail () {
      return this.$store.getters['getDetail']
    },
    ads () {
      return this.$store.getters['getAds']
    },
    replies () {
      return this.$store.getters['getReplies']
    }
  },
  methods: {
    async orderChange (ord) {
      if (this.ord !== ord) {
        await this.$store.dispatch('fetchList', {page: 1, ord: ord, category: 1})
        this.ord = ord
      }
    },
    async categoryChange (category) {
      if (this.category !== category) {
        await this.$store.dispatch('fetchList', {page: 1, ord: 'asc', category: category})
        this.category = category
      }
    }
  }
}
</script>

<style scoped>

</style>

