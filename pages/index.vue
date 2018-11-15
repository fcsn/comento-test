<template>
  <section class="container">
    <div class="container-child" style="padding: 3rem 1.5rem;">

    <div class="column">
      <!--order 버튼-->
      <button class="button is-primary is-outlined" @click="orderChange('asc')">높은 순</button>
      <button class="button is-primary is-outlined" @click="orderChange('desc')">낮은 순</button>

      <!--order 버튼-->
      <button class="button is-link is-outlined" @click="categoryChange(1)">사과</button>
      <button class="button is-link is-outlined" @click="categoryChange(2)">바나나</button>
      <button class="button is-link is-outlined" @click="categoryChange(3)">코코넛</button>
    </div>


    <!--list/link -->
    <div v-for="(article, index) in list" :key="index" style="cursor: pointer; padding-top: 1rem;">
    <nuxt-link :to="{ name: 'contents-contentId', params: { contentId: article.category_no ? article.no : 0} }">

    <div>

      <div>
      <div>
        <span v-if="index !== 3">{{article.no}}.</span>
        <span v-else></span>
        <span v-if="index !== 3">{{article.category_no | filteredCategory}}</span>
      </div>
      </div>

      <div>
      <div>
        <span v-if="index !== 3"><small>Author: {{article.email}} | </small></span>
        <span v-if="index !== 3"><small>{{article.updated_at}}</small></span>


        <div v-if="index === 3">
          <img :src="`https://comento.cafe24.com/public/images/${article.img}`"
               alt="ad">
        </div>

        <div v-if="index !== 3" style="padding-top: 1rem; font-size: 18px;">{{article.title.split(' ')[1]}}</div>
        <div v-else style="padding-top: 1rem;">{{article.title}}</div>

        <div class="ellipsis" style="padding-top: 1rem;">{{article.contents}}</div>
      </div>
      </div>

    </div>
    </nuxt-link>
    </div>

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

