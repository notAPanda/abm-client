<template>
  <div v-if="playlist" class="container mx-auto">
    <div
      class="shaow mx-4 mb-4 flex flex-col overflow-hidden rounded bg-gray-700 text-gray-100 sm:mx-0 md:flex-row"
    >
      <img
        :src="playlist.cover_photo"
        alt=""
        class="max-h-60 object-cover md:max-h-60"
      />
      <div class="m-4 grid content-between">
        <div>
          <div class="text-xl">
            {{ playlist.title }}
          </div>
          <div>
            {{ playlist.description }}
          </div>
        </div>
        <div class="mt-4">
          <button class="rounded-full bg-indigo-600 p-3" @click="play()">
            <PlayIcon size="25"></PlayIcon>
          </button>
        </div>
      </div>
    </div>
    <div class="overflow-hidden border-b border-gray-800 bg-gray-600 shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <tbody class="divide-y divide-gray-800">
          <tr
            @click="play(track)"
            v-for="track in playlist.tracks"
            :key="track.id"
            :class="{
              'cursor-pointer': track.src,
              'hover:bg-gray-500': track.src,
              'bg-gray-700': !track.src,
            }"
          >
            <td class="whitespace-nowrap px-6 py-4">
              <div class="flex items-center">
                <div class="ml-4">
                  <div
                    class="text-sm font-medium"
                    :class="[track.src ? 'text-white' : 'text-gray-400']"
                  >
                    {{ track.title }}
                  </div>
                  <div
                    class="text-xs"
                    :class="[track.src ? 'text-gray-300' : 'text-gray-500']"
                  >
                    {{ playlist.author.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="">
              <a v-if="$auth.loggedIn" href="#" class="ml-auto text-indigo-400 hover:text-indigo-600">
                <HeartIcon
              /></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { HeartIcon, PlayIcon } from 'vue-feather-icons'

export default {
  name: 'IndexPage',
  components: {
    HeartIcon,
    PlayIcon,
  },
  data: () => ({
    playlist: null,
  }),
  methods: {
    play(track) {
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
  async fetch() {
    let { data } = await this.$axios.get(`/api/albums/${this.$route.params.id}`)
    this.playlist = data.album
  },
}
</script>
