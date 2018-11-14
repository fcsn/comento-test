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
  async fetchList ({commit, state}, payload) {
    try {
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
      const response = await this.$axios.$get(`https://comento.cafe24.com/ads.php?page=${payload.num}&limit=${payload.limit}`)
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
