<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="/icon.png" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-100">
          Sign up
        </h2>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              v-model="name"
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required="true"
              class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              v-model="email"
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
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
          <div v-if="errors">
            <div v-for="(error, index) in errors" :key="index">
              <span
                v-for="m in error"
                :key="m"
                class="mt-1 text-sm text-red-500"
                >{{ m }}</span
              >
            </div>
          </div>
        </div>

        <div>
          <button
            @click.prevent.stop="register"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Sign up
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    errors: null,
  }),
  methods: {
    register() {
      this.errors = null
      this.$axios
        .get('/sanctum/csrf-cookie')
        .then(() => {
          return this.$axios.$post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
        })
        .then((data) => {
          return this.$auth.loginWith('laravelSanctum', {
            data: {
              email: data.user.email,
              password: this.password,
            },
          })
        })
        .catch((error) => {
          let status = _.get(error, 'response.status')
          let errors = _.get(error, 'response.data.errors')

          if (_.includes([419], status)) {
          }
          if (_.includes([422], status)) {
            this.errors = errors
          }
          if (_.includes([401], status)) {
            this.errors = {
              email: ['Credentials does not match.'],
            }
          }
        })
    },
  },
}
</script>
