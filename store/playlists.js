import _ from 'lodash'

export const state = () => ({
  playlists: [],
})

export const mutations = {
  add(state, payload) {
    state.playlists = _.uniqBy([...state.playlists, ...payload], 'id')
  },
}

export const getters = {
  playlist: (state) => (id) => {
    return state.playlists.find((playlist) => playlist.id == id)
  },
}

export const actions = {
  get({ commit }) {
    return this.$axios
      .get('/sanctum/csrf-cookie')
      .then(() => this.$axios.get('/api/albums'))
      .then(({ data }) => {
        commit('add', data.albums)
      })
  },
}
