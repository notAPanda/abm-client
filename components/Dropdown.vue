<template>
  <div class="relative">
    <button
      @click="toggle"
      @keydown.esc="hide"
      @blur="hide"
      class="underline hover:text-indigo-400"
      type="button"
    >
      <slot></slot>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        :class="{hidden: !show}"
        class="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded bg-gray-700 shadow"
      >
        <ul
          class="py-1 text-sm text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li v-for="(option, index) in options.filter((o) => o.display)" :key="index">
            <NuxtLink
              class="block py-2 px-4 hover:bg-gray-600 hover:text-white"
              :to="option.link"
              >{{ option.text }}</NuxtLink
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['options'],
  data: () => ({
    show: false,
  }),
  methods: {
    hide() {
      setTimeout(() => {
        this.show = false
      }, 200)
    },
    toggle() {
      this.show = !this.show
    },
  },
}
</script>
