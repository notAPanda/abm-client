<template>
  <div>
    <div v-if="$auth.loggedIn">
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
import { SettingsIcon } from 'vue-feather-icons'
export default {
  components: {
    SettingsIcon,
  },
}
</script>
