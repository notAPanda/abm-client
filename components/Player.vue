<template>
  <div
    v-if="track && playlist"
    class="fixed bottom-0 left-0 right-0 bg-gray-900"
  >
    <div class="flex">
      <div class="relative h-20 w-20 overflow-hidden">
        <div class="absolute">
          <img
            :src="playlist.cover_photo"
            class="h-20 w-20 object-cover"
            alt=""
          />
        </div>
        <div
          @click="togglePlay"
          class="absolute flex h-20 w-20 items-center justify-center bg-gray-800/50 text-white cursor-pointer"
        >
          <PauseCircleIcon v-if="playing" size="40"></PauseCircleIcon>
          <PlayCircleIcon v-else size="40"></PlayCircleIcon>
        </div>
      </div>

        <div class="mx-4 flex grow flex-col justify-center">
          <div>
            <span class="text-white">{{ track.title }}</span>
          </div>
          <div>
            <small class="text-gray-300"
              >{{ playlist.author.name }} - {{ playlist.title }}</small
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
