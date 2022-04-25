import _ from 'lodash'

export const state = () => ({
  tracks: [],
})

export const mutations = {
  set(state, payload) {
    state.tracks = payload
  },
}

export const getters = {
    noLiked(state) {
        return _.isEmpty(state.tracks)
    },
}