<template>
  <div v-if="playlist" class="container mx-auto">
    <div class="mx-4 mb-4 flex flex-col sm:mx-0 md:flex-row">
      <ImageComponent
        class="max-h-60 rounded object-cover md:max-h-60"
        :src="playlist.cover_photo"
      />
      <div class="md:ml-4">
        <div
          class="md-mt-0 mb-4 mt-4 text-4xl font-extrabold text-white md:mt-0"
        >
          {{ playlist.title }}
        </div>
        <div class="text-sm text-gray-300">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <div class="mx-4 my-6 md:mx-0">
      <div class="">
        <button
          class="rounded-full bg-indigo-600 p-3 text-white transition-all hover:scale-105"
          @click="play()"
        >
          <PlayIcon class="pl-1" size="25"></PlayIcon>
        </button>
      </div>
    </div>
    <div class="mx-4 md:mx-0">
      <table class="min-w-full">
        <thead>
          <tr class="text-gray-400">
            <th class="w-8 text-center text-sm font-light uppercase">#</th>
            <th class="text-left text-sm font-light uppercase">Title</th>
            <th class="text-sm font-light uppercase"></th>
            <th class="text-sm font-light uppercase">
              <ClockIcon size="15" class="ml-auto" />
            </th>
            <th class="text-sm font-light uppercase"></th>
          </tr>
        </thead>
        <tbody class="">
          <tr
            @click="play(track)"
            v-for="(track, index) in playlist.tracks"
            :key="track.id"
            class="transition-all"
            :class="{
              'cursor-pointer': track.src,
              'hover:bg-gray-800': track.src,
            }"
          >
            <td class="w-8 text-center text-gray-400">
              <span
                v-if="currentTrack && currentTrack.id === track.id && playing"
                class="text-indigo-500"
                ><PauseCircleIcon
              /></span>
              <span
                v-else-if="currentTrack && currentTrack.id === track.id"
                class="text-indigo-500"
                ><PlayCircleIcon
              /></span>
              <span v-else>{{ index + 1 }}</span>
            </td>
            <td class="whitespace-nowrap py-2">
              <div class="flex items-center">
                <div class="">
                  <div :class="[track.src ? 'text-white' : 'text-gray-400']" class="max-w-[280px] truncate">
                    {{ track.title }}
                  </div>
                  <div
                    class="text-sm font-light max-w-[280px] truncate"
                    :class="[track.src ? 'text-gray-400' : 'text-gray-500']"
                  >
                    {{ playlist.author.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="">
              <LoveToggle :track="track" />
            </td>
            <td class="text-right text-gray-400">
              {{ formatTime(track.duration) }}
            </td>
            <td class="text-gray-900 hover:text-gray-400">
              <MoreHorizontalIcon class="ml-auto" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {
  HeartIcon,
  PlayIcon,
  MoreHorizontalIcon,
  ClockIcon,
  PauseCircleIcon,
  PauseIcon,
  PlayCircleIcon,
} from 'vue-feather-icons'
import { formatTime } from '~/services/helper.js'
import ImageComponent from '~/components/ImageComponent.vue'
import LoveToggle from '~/components/LoveToggle.vue'
import _ from 'lodash'

export default {
  name: 'IndexPage',
  components: {
    ClockIcon,
    HeartIcon,
    PlayIcon,
    MoreHorizontalIcon,
    PauseCircleIcon,
    PauseIcon,
    PlayCircleIcon,
    ImageComponent,
    LoveToggle,
  },
  data: () => ({
    playlist: null,
  }),
  methods: {
    formatTime(duration) {
      return formatTime(duration)
    },
    play(track) {
      // if (
      //   (!track && this.playing)  || (this.currentTrack && this.currentTrack.id === track.id)
      // ) {
      //   return this.$store.dispatch('player/playToggle')
      // }

      let playTrack = track || this.playlist.tracks.filter((t) => t.src)[0]

      if (!playTrack.src) {
        return
      }

      this.$store.dispatch('player/play', {
        playlist: this.playlist,
        track: playTrack,
      })
    },
  },
  computed: {
    playing() {
      return this.$store.state.player.playing
    },
    currentTrack() {
      return this.$store.state.player.track
    },
  },
  async fetch() {
    let { data } = await this.$axios.get(`/api/albums/${this.$route.params.id}`)
    this.playlist = data.album

    if (this.$auth.loggedIn && this.$store.getters['liked/noLiked']) {
      let liked = await this.$axios.get('/api/liked')
      this.$store.commit('liked/set', _.get(liked, 'data.liked.tracks', []))
    }
  },
}
</script>
