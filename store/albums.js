import _ from 'lodash'

export const state = () => ({
  albums: [],
})

export const mutations = {
  add(state, payload) {
    state.albums = _.uniqBy([...payload, ...state.albums], 'id')
  },
}

export const getters = {
  playlist: (state) => (id) => {
    return state.albums.find((playlist) => playlist.id == id)
  },
}
