<template>
  <div
    v-if="track && playlist"
    class="fixed bottom-0 left-0 right-0 bg-gray-900"
  >
    <div class="flex">
      <div class="relative h-20 w-20 flex-none">
        <div class="absolute h-20 w-20">
          <img :src="playlist.cover_photo" class="object-cover" />
        </div>
        <div
          @click="togglePlay"
          class="absolute flex h-20 w-20 cursor-pointer items-center justify-center bg-gray-800/50 text-white"
        >
          <PauseCircleIcon v-if="playing" size="40"></PauseCircleIcon>
          <PlayCircleIcon v-else size="40"></PlayCircleIcon>
        </div>
      </div>

      <div class="mx-4 grow overflow-hidden">
        <div class="truncate">
          <span class="text-white">{{ track.title }}</span>
        </div>
        <div class="truncate">
          <small class="text-gray-300"
            >{{ author }} - {{ album }}</small
          >
        </div>
        <div class="flex items-center">
          <div class="mr-4 w-10 text-sm text-gray-300">{{ seek }}</div>
          <div class="grow">
            <div class="h-1 bg-white/20">
              <div
                class="h-1 bg-indigo-400"
                :style="`width: ${proggress}%`"
              ></div>
            </div>
          </div>
          <div class="ml-4 w-10 text-right text-sm text-gray-400">
            {{ duration }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  HeartIcon,
  PlayIcon,
  SkipForwardIcon,
  SkipBackIcon,
  RepeatIcon,
  RefreshCwIcon,
  PauseCircleIcon,
  PlayCircleIcon,
} from 'vue-feather-icons'
import _ from 'lodash'

export default {
  name: 'PlayerComponent',
  components: {
    PlayCircleIcon,
    PauseCircleIcon,
    HeartIcon,
    PlayIcon,
    SkipForwardIcon,
    SkipBackIcon,
    RepeatIcon,
    RefreshCwIcon,
  },
  mounted() {},
  methods: {
    togglePlay() {
      this.$store.dispatch('player/playToggle')
    },
  },
  computed: {
    author() {
      return _.get(this.track, 'author.name', _.get(this.track, 'album.author.name', ''))
    },
    album() {
      if (_.has(this.playlist, 'author')) {
        return _.get(this.playlist, 'title')
      }
      return _.get(this.track, 'album.title', '')
    },
    duration() {
      return this.$store.state.player.duration
    },
    seek() {
      return this.$store.state.player.seek
    },
    proggress() {
      return this.$store.state.player.proggress
    },
    playing() {
      return this.$store.state.player.playing
    },
    track() {
      return this.$store.state.player.track
    },
    playlist() {
      return this.$store.state.player.playlist
    },
  },
}
</script>
