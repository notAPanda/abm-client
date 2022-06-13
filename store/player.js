import { Howl, Howler } from 'howler'
import _ from 'lodash'
import { formatTime } from '~/services/helper.js'

let sound = null

export const state = () => ({
  playlist: {},
  track: null,
  playing: false,
  duration: '00:00',
  seek: '00:00',
  proggress: 0,
})

export const getters = {
  nextTrack(state) {
    const nextTrackIndex =
      _.findIndex(
        state.playlist.tracks,
        (track) => track.id === state.track.id,
        -1
      ) + 1
    return _.get(state, `playlist.tracks.${nextTrackIndex}`)
  },
}

export const mutations = {
  setSeek(state, payload) {
    state.seek = formatTime(payload)
  },
  setProggress(state, payload) {
    state.proggress = payload
  },
  setPlaying(state, payload) {
    state.playing = payload
  },
  setPlaylist(state, payload) {
    state.playlist = payload
  },
  setTrack(state, payload) {
    state.track = payload
  },
  setDuration(state, payload) {
    state.duration = formatTime(payload)
  },
}

export const actions = {
  setSeek({ commit, dispatch }) {
    let seek = sound.seek() || 0
    let progress = (seek / sound.duration()) * 100 || 0
    commit('setProggress', progress)
    commit('setSeek', seek)
    if (sound.playing()) {
      setTimeout(() => {
        dispatch('setSeek')
      }, 1000)
    }
  },
  playToggle({ commit }) {
    if (!sound) {
      return false
    }
    if (sound.playing()) {
      sound.pause()
      commit('setPlaying', false)
    } else {
      sound.play()
      commit('setPlaying', true)
    }
  },
  play({ commit, dispatch, getters }, { playlist, track }) {
    if (sound && sound.playing()) {
      sound.stop()
    }
    if (playlist) {
      commit('setPlaylist', {
        ...playlist,
        tracks: playlist.tracks.filter((t) => t.src),
      })
    }
    if (track) {
      commit('setTrack', track)
      sound = new Howl({
        src: [track.src],
        html5: true,
        onend() {
          commit('setTrack', getters.nextTrack)
          dispatch('play', { track: getters.nextTrack })
        },
        onplay() {
          commit('setPlaying', true)
          commit('setDuration', sound.duration())
          dispatch('setSeek')
        },
        onpause() {
          commit('setPlaying', false)
        },
        onstop() {
          commit('setPlaying', false)
        },
        onseek() {
          // requestAnimationFrame(logSeek)
        },
      })
      sound.play()
    }
  },
}
