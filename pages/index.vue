<template>
  <div class="container mx-auto flex flex-wrap">
    <div
      v-for="playlist in albums"
      :key="playlist.id"
      class="w-1/2 p-4 lg:w-1/6"
    >
      <NuxtLink
        :to="`/playlist/${playlist.id}`"
        class="relative block overflow-hidden"
      >
        <img
          alt="ecommerce"
          class="blockw-full rounded object-cover object-center"
          :src="playlist.cover_photo"
          lazyload
        />
        <div class="mt-3">
          <h3 class="title-font text-xs tracking-widest text-gray-300">
            {{ playlist.author.name }}
          </h3>
          <h2 class="title-font font-medium text-gray-100">
            {{ playlist.title }}
          </h2>
        </div>
      </NuxtLink>
    </div>
    <div v-if="$auth.user && !$auth.user.premium" class="w-1/2 p-4 lg:w-1/6">
      <NuxtLink
        to="/subscription"
        class="rounded bg-indigo-600 px-4 py-2 text-white"
        >Premium</NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    albums: [],
  }),
  async fetch() {
    let { data } = await this.$axios.get('/api/albums')
    this.albums = data.albums
  },
}
</script>
