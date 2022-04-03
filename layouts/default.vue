<template>
  <div class="dark:text-gray-200 mb-20">
    <TopMenu />
    <Nuxt />
    <Player />
  </div>
</template>

<script>
export default {
  layout: 'default',
  // OR
  layout (context) {
    return 'default'
  },
}
</script>