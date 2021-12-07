!
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" @click="close">
      <div class="modal w-1/2 rounded-md" @click.stop="">
        <header class="modal-header">
          <slot name="header" class="">Add new exhaust sound!</slot>
          <button type="button" class="btn-close" @click="close">x</button>
        </header>

        <section class="modal-body">
          <form class="mt-6">
            <label
              for="vehicleNameInput"
              class="block text-xs font-semibold text-gray-600 uppercase"
              >vehicle name</label
            >
            <input
              id="vehicleNameInput"
              type="text"
              name="vehicleNameInput"
              v-model.trim="name"
              placeholder="2019 audi R8 straight pipes start-up"
              class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <label
              for="imageInput"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >Image URL</label
            >
            <input
              id="imageInput"
              type="url"
              name="imageInput"
              v-model.trim="imgURL"
              placeholder="https://i.imgur.com/cOCcKXl.jpeg"
              class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
            <label
              for="audioInput"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >audio track</label
            >
            <input
              id="audioInput"
              type="file"
              accept=".mp3"
              name="audioInput"
              v-on:change="previewFiles"
              placeholder="https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
              class="block w-min py-3 mt-2 text-gray-700 appearance-none bg-transparent focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            />
            <label
              for="tags-input"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
              >tags</label
            >
            <input
              id="tags-input"
              type="text"
              name="tags-input"
              v-model.trim="tags"
              placeholder="Modified, R8, straight Pipes"
              class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
            />
          </form>
        </section>

        <footer class="modal-footer">
          <div class="inline-flex justify-end space-x-1">
            <button
              type="button"
              class="inline bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
              @click="close"
            >
              Close
            </button>
            <button
              type="button"
              class="inline bg-blue-500 hover:bg-blue-600 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              @click="submit"
            >
              Submit
            </button>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      name: null,
      imgURL: null,
      file: null,
      tags: [],
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    previewFiles(event) {
      /* file size 5242880 */
      if (event.target.files[0].size < 716800) {
        this.file = event.target.files;
      } else {
        alert('File to large');
      }
    },
    submit() {
      console.log({
        name: this.name,
        img: this.imgURL,
        file: this.file,
        tags: this.tags,
      });
    },
  },
};
</script>

<style>
input {
  @apply rounded-md;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.modal-backdrop {
  z-index: 5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  @apply text-blue-500;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}

input[type='file']::file-selector-button {
  @apply bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow;
}
</style>
