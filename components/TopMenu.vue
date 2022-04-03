<template>
  <div class="container mx-auto my-4 flex text-sm font-medium text-white">
    <Back />
    <div v-if="$auth.loggedIn" class="ml-auto">
      <NuxtLink
        class="block rounded py-2 px-2 hover:bg-gray-600 hover:text-white"
        to="/settings"
        ><SettingsIcon />
      </NuxtLink>
    </div>
    <div v-else class="ml-auto">
      <NuxtLink to="/login">Sign in</NuxtLink>
    </div>
  </div>
</template>

<script>
import Back from '~/components/Back.vue'
import { SettingsIcon } from 'vue-feather-icons'

export default {
  components: {
    Back,
    SettingsIcon,
  },
  methods: {},
}
</script>
