export const strict = false

export const state = () => ({
  category: null,
  list: null,
  detail: null,
  ads: null
})

export const mutations = {
  SET_CATEGORY (state, category) {
    state.category = category
  },
  SET_LIST (state, list) {
    state.list = list
  },
  SET_DETAIL (state, detail) {
    state.detail = detail
  },
  SET_ADS (state, ads) {
    state.ads = ads
  }
}

export const getters = {
  getCategory (state) {
    if (state.category.code === 200) {
      return state.category.list
    }
  },
  getList (state) {
    if (state.list.code === 200) {
      // console.log(state.ads.list[0])
      const ad = state.ads.list[0]
      // return state.list.list.splice(3, 0, ad)
      const front = state.list.list.slice(0, 3)
      const back = state.list.list.slice(4, state.list.list.length)
      return front.concat(ad, back)
      return state.list.list
    }
  },
  getDetail (state) {
    if (state.detail.code === 200) {
      return state.detail.detail.article
    }
  },
  getReplies (state) {
    if (state.detail.code === 200) {
      return state.detail.detail.replies
    }
  },
  getAds (state) {
    if (state.ads.code === 200) {
      return state.ads.list
    }
  }
}

export const actions = {
  async fetchCategory ({commit, state}) {
    try {
      const response = await this.$axios.$get('https://comento.cafe24.com/category.php')
      commit('SET_CATEGORY', response)
      return {
        data: response,
        status: true
      }
    } catch (e) {
      console.log(e)
      return {
        data: e,
        status: false
      }
    }
  },
  async fetchList ({dispatch, commit, state}, payload) {
    try {
      await dispatch('fetchAds', {page_no: 1, limit: 1})
      const response = await this.$axios.$get(`https://comento.cafe24.com/request.php?page=${payload.page}&ord=${payload.ord}&category=${payload.category}`)
      commit('SET_LIST', response)
      return {
        data: response,
        status: true
      }
    } catch (e) {
      console.log(e)
      return {
        data: e,
        status: false
      }
    }
  },
  async fetchDetail ({commit, state},  num) {
    try {
      const response = await this.$axios.$get(`https://comento.cafe24.com/detail.php?req_no=${num}`)
      commit('SET_DETAIL', response)
      return {
        data: response,
        status: true
      }
    } catch (e) {
      console.log(e)
      return {
        data: e,
        status: false
      }
    }
  },
  async fetchAds ({commit, state},  payload) {
    try {
      const response = await this.$axios.$get(`https://comento.cafe24.com/ads.php?page=${payload.page_no}&limit=${payload.limit}`)
      commit('SET_ADS', response)
      return {
        data: response,
        status: true
      }
    } catch (e) {
      console.log(e)
      return {
        data: e,
        status: false
      }
    }
  }
}
