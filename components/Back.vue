<template>
  <div
    class="cursor-pointer hover:bg-gray-600 px-2 py-2 rounded"
    @click="goBack"
    v-if="this.$route.name !== 'index'"
  >
    <ArrowLeftIcon />
  </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'

export default {
    components: {
        ArrowLeftIcon,
    },
  methods: {
      
    goBack() {
      this.$router.back()
    },
  },
}
</script>
