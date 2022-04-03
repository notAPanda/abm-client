<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="/icon.png" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-300">
          Or
          {{ ' ' }}
          <NuxtLink
            to="/register"
            class="font-medium text-indigo-400 hover:text-indigo-500"
            >create your account</NuxtLink
          >
        </p>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required=""
              class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-100">
              Remember me
            </label>
          </div>

          <div class="text-sm">
            <a
              href="#"
              class="font-medium text-indigo-400 hover:text-indigo-500"
            >
              Forgot your password?
            </a>
          </div>
        </div>

        <div>
          <button
            @click.prevent.stop="login"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: () => ({
    email: '',
    password: '',
  }),
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  methods: {
    login() {
      this.$auth.loginWith('laravelSanctum', {
        data: {
          email: this.email,
          password: this.password,
        },
      })
    },
  },
}
</script>
