<template>
  <div class="mx-6 my-6">
    <h1 class="text-white">Success</h1>
    <NuxtLink to="/" class="rounded bg-indigo-600 px-4 py-2 text-white">Go to your Coherent Brain Music</NuxtLink>
  </div>
</template>

<script>
export default {
  mounted() {
      this.$route.query.session_id
  },
  methods: {},
}
</script>
