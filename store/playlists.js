import _ from 'lodash'

export const state = () => ({
  playlists: [],
})

export const mutations = {
  add(state, payload) {
    state.playlists = _.uniqBy([...payload, ...state.playlists], 'id')
  },
}

export const getters = {
  playlist: (state) => (id) => {
    return state.playlists.find((playlist) => playlist.id == id)
  },
}
