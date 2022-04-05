<template>
  <img
    :src="src"
    class="transition duration-300 ease-out"
    :class="{
      'opacity-0': loading,
      'opacity-100': !loading,
    }"
    @load="changeOpacity"
    lazyload
  />
</template>

<script>
export default {
  props: ['src'],
  data: () => ({
    loading: true,
  }),
  methods: {
    changeOpacity() {
      this.loading = false
    },
  },
}
</script>

<style></style>
