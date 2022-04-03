<template>
  <section class="px-6 xl:px-0">
    <div class="container mx-auto py-12 px-6">
      <div class="flex w-full flex-col justify-center lg:items-center">
        <h1 class="text-3xl font-semibold text-white md:text-4xl">
          Subscribe to Coherent Brain Music
        </h1>
        <p class="mt-2.5 text-2xl text-white lg:w-1/2 lg:text-center">
          And unlock the power of your brain
        </p>
      </div>
      <div class="flex w-full items-center justify-center">
        <div class="container mx-auto">
          <div class="mt-10">
          <div
            class="mx-auto mb-4 w-full px-6 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3"
          >
            <div
              class="rounded-lg border border-gray-200 bg-indigo-700 py-5 px-4 text-left shadow dark:border-gray-700"
            >
              <h2 class="mb-8 text-2xl font-semibold text-white">Premium</h2>
              <ul class="mb-6 flex flex-col">
                <li class="mb-2.5 flex items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                    class="mr-4"
                    alt="check-mark"
                  />
                  <p class="text-base font-normal text-white">24/7 access</p>
                </li>
                <li class="mb-2.5 flex items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                    class="mr-4"
                    alt="check-mark"
                  />
                  <p class="text-base font-normal text-white">
                    Order labs + Results
                  </p>
                </li>
                <li class="mb-2.5 flex items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                    class="mr-4"
                    alt="check-mark"
                  />
                  <p class="text-base font-normal text-white">
                    Radiology tests + Results
                  </p>
                </li>
                <li class="mb-2.5 flex items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                    class="mr-4"
                    alt="check-mark"
                  />
                  <p class="text-base font-normal text-white">
                    Partnership + Discounts
                  </p>
                </li>
                <li class="mb-2.5 flex items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                    class="mr-4"
                    alt="check-mark"
                  />
                  <p class="text-base font-normal text-white">
                    Direct doctor phone number
                  </p>
                </li>
                <li class="mb-2.5 flex items-center">
                  <img
                    src="https://cdn.tuk.dev/assets/templates/weCare/checkMarkWhite.png"
                    class="mr-4"
                    alt="check-mark"
                  />
                  <p class="text-base font-normal text-white">
                    Specialists appoinments
                  </p>
                </li>
              </ul>
              <p class="relative pl-3 text-base text-white">
                <span class="text-lg font-light">$</span>
                <span class="text-2xl font-semibold">10</span>
                <span class="text-lg font-light">/month</span>
              </p>
              <button
                @click="sessionCreate"
                class="mt-5 w-full rounded bg-white px-8 py-3 text-base font-semibold text-indigo-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-700"
              >
                Buy now
              </button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  methods: {
    sessionCreate() {
      this.loading = true
      return this.$axios
        .get('/sanctum/csrf-cookie')
        .then(() => this.$axios.post('/api/subscription/session/create'))
        .then(({ data }) => {
          window.location.href = data.session_url
        })
    },
  },
}
</script>
