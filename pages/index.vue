<template>
  <div class="container mx-auto">
    <div class="text-white ml-4">
      Playlists
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="album in playlists"
        :key="album.id"
        class="w-1/2 p-4 lg:w-1/6"
      >
        <NuxtLink
          :to="`/playlist/${album.id}`"
          class="relative block overflow-hidden"
        >
          <div class="rounded p-3 bg-blue-500">
            <h2 class="title-font font-medium text-gray-100">
              {{ album.title }}
            </h2>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="text-white ml-4">
      Albums
    </div>
    <div class="flex flex-wrap">
      <div v-for="album in albums" :key="album.id" class="w-1/2 p-4 lg:w-1/6">
        <NuxtLink
          :to="`/album/${album.id}`"
          class="relative block overflow-hidden"
        >
          <ImageComponent
            class="blockw-full rounded object-cover object-center"
            :src="album.cover_photo"
          />
          <div class="mt-3">
            <h3 class="title-font text-xs tracking-widest text-gray-300">
              {{ album.author.name }}
            </h3>
            <h2 class="title-font font-medium text-gray-100">
              {{ album.title }}
            </h2>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="flex flex-wrap">
      <div v-if="$auth.user && !$auth.user.premium" class="w-1/2 p-4 lg:w-1/6">
        <NuxtLink
          to="/subscription"
          class="rounded bg-indigo-600 px-4 py-2 text-white"
          >Premium</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import ImageComponent from '~/components/ImageComponent.vue'
import _ from 'lodash'

export default {
  name: 'IndexPage',
  components: {
    ImageComponent,
  },
  data: () => ({
    albums: [],
    playlists: [],
  }),
  async fetch() {
    let albums = await this.$axios.get('/api/albums')
    this.albums = albums.data.albums

    if (this.$auth.loggedIn) {
      let playlists = await this.$axios.get('/api/playlists')
      this.playlists = playlists.data.playlists

      let liked = await this.$axios.get('/api/liked')
      this.$store.commit('liked/set', _.get(liked, 'data.liked.tracks', []))
    }

    if (this.$auth.loggedIn && this.$store.getters['liked/noLiked']) {
      let liked = await this.$axios.get('/api/liked')
      this.$store.commit('liked/set', _.get(liked, 'data.liked.tracks', []))
    }
  },
}
</script>
