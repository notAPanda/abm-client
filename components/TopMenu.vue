<template>
  <div class="container mx-auto my-4">
    <div
      class="ml-2 mr-4 flex items-center text-sm font-medium text-white"
    >
      <Back />
      <User class="ml-auto"/>
    </div>
  </div>
</template>

<script>
import User from '~/components/User.vue'
import Back from '~/components/Back.vue'

export default {
  components: {
    User,
    Back,
  },
}
</script>
