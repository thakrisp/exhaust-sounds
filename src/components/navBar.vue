<template>
  <nav
    class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded"
  >
    <div class="container mx-auto flex flex-wrap items-center justify-between">
      <a
        href="#"
        class="flex"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-blue-700 self-center"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
            clip-rule="evenodd"
          />
        </svg>
        <span
          class="pl-1 self-center text-lg font-semibold whitespace-nowrap text-blue-700"
        >
          Car Exhaust Sounds
        </span>
      </a>
      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="md:hidden ml-3 text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center"
        aria-controls="mobile-menu-2"
        aria-expanded="false"
        @click="toggleMobileMenu"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          class="hidden w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <div
        id="mobile-menu"
        :class="{ hidden: showMobileMenu}"
        class=" md:block w-full md:w-auto border-x-2 border-b-2 rounded-lg shadow-xl shadow-black/50 md:shadow-none md:rounded-none md:border-0"
      >
        <ul
          class="flex-col md:flex-row flex md:space-x-8 mt-1 md:mt-0 md:text-sm md:font-medium"
        >
          <li @click="toggleMobileMenu">
            <a
              href="#"
              class="bg-blue-500 md:bg-transparent text-white block pl-3 pr-4 py-2 md:text-blue-500 md:p-0 rounded "
              aria-current="page"
            >Home</a>
          </li>
          <li @click="toggleMobileMenu">
            <a
              href="#"
              class="text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-500 md:p-0"
            >Contact</a>
          </li>
          <li @click="toggleMobileMenu">
            <a
              href="#"
              class="text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 block pl-2 pr-4 py-2 md:hover:text-blue-500 md:p-0 "
              @click="showModal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 inline mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Add sound</a>
            <Teleport to="#app">
              <addSoundModal
                v-show="isModalVisible"
                @close="closeModal"
              />
            </Teleport>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import addSoundModal from "./addSoundModal.vue";

export default {
  name: "App",
  components: {
    addSoundModal,
  },
  data() {
    return {
      isModalVisible: false,
      showMobileMenu: true
    };
  },
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>

<style></style>
