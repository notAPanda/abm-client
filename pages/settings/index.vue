<template>
  <div>
    <div>
      <button class="w-full text-white hover:bg-gray-600 py-4" @click="logout">
        Logout
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout().then(() => {
        this.$router.push('/')
      })
    },
  },
}
</script>
