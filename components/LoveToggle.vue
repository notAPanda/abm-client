<template>
  <button
    v-if="$auth.loggedIn"
    @click.prevent.stop="toggleLoveTrack"
    class="ml-auto "
    :class="isLiked ? 'text-indigo-400 hover:text-indigo-600' : 'text-gray-400 hover:text-indigo-600'"
  >
    <HeartIcon class="ml-auto" />
  </button>
</template>

<script>
import { HeartIcon } from 'vue-feather-icons'
import _ from 'lodash'
export default {
  props: ['track'],
  components: {
    HeartIcon,
  },
  methods: {
    toggleLoveTrack(track) {
      this.$axios.post(`/api/tracks/${this.track.id}/love`)
      .then(({data}) => {
        this.$store.commit('liked/set', data.liked.tracks)
      })
    },
  },
  computed: {
    isLiked() {
      return _.includes(_.map(this.liked, 'id'), this.track.id)
    },
    liked() {
      return this.$store.state.liked.tracks
    },
  },
}
</script>

<style></style>
