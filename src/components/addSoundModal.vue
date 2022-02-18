<template>
  <Transition name="modal-fade">
    <div
      class="modal-backdrop"
      @click="close"
    >
      <div
        class="modal w-1/2 rounded-md"
        @click.stop=""
      >
        <header class="modal-header">
          <slot
            name="header"
            class=""
          >
            Add new exhaust sound!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </header>
        <section class="modal-body">
          <div
            v-show="errors.length >= 1"
            class="flex flex-col space-y-3"
          >
            <modalErrorAlert
              v-for="e in errors"
              :key="e"
              :error="e"
            />
          </div>
          <form class="mt-6">
            <label
              for="vehicleNameInput"
              class="block text-xs font-semibold text-gray-600 uppercase"
            >vehicle name</label>
            <input
              id="vehicleNameInput"
              v-model.trim="name"
              type="text"
              name="vehicleNameInput"
              placeholder="2019 audi R8 straight pipes start-up"
              class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
            >
            <label
              for="imageFileInput"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Image file</label>
            <input
              id="imageFileInput"
              ref="imageFileInput"
              type="file"
              accept=".jpg, .png"
              name="imageFileInput"
              placeholder="https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
              class="block w-min py-3 mt-2 text-gray-700 appearance-none bg-transparent focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              @change="previewFiles($event, 'img')"
            >
            <label
              for="audioFileInput"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >audio track</label>
            <input
              id="audioFileInput"
              ref="audioFileInput"
              type="file"
              accept=".mp3"
              name="audioFileInput"
              placeholder="https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3"
              class="block w-min py-3 mt-2 text-gray-700 appearance-none bg-transparent focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              required
              @change="previewFiles($event, 'audio')"
            >
            <label
              for="tagsInput"
              class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >tags</label>
            <input
              id="tagsInput"
              v-model.trim="tag"
              type="text"
              name="tagsInput"
              placeholder="Modified, R8, straight Pipes"
              class="block w-full p-3 mt-2 text-gray-700 bg-gray-200 appearance-none focus:outline-none focus:bg-gray-300 focus:shadow-inner"
              @keyup.enter="updateTags"
            >
            <TrackTags :tags="tags" />
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
              class="inline bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:border-none text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              :disabled="isDisabled"
              @click="submit"
            >
              Submit
            </button>
          </div>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<script>
import axios from 'axios';
import modalErrorAlert from './modalErrorAlert.vue';
import TrackTags from './trackTags.vue';

export default {
  name: 'AddSoundModal',
  components: {
    modalErrorAlert,
    TrackTags,
  },
  emits: ['close'],
  data() {
    return {
      tag: '',
      errors: [],
      name: '',
      imgFile: null,
      file: null,
      tags: []
    };
  },
  computed: {
    isDisabled: function () {
      if (this.name !== '' && this.file !== null && this.imgFile !== null) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    imgFile: function (oldVal) {
      this.removeError(oldVal, 'images');
    },
    file: function (oldVal) {
      this.removeError(oldVal, 'audio');
    },
  },
  methods: {
    updateTags() {
      if (this.tags.length === 0 || this.tags.indexOf(this.tag) === -1) {
        this.tags.push(this.tag);
      }
      console.log(`idx:${this.tags.indexOf(this.tag)}, array:${this.tags}`);
      this.tag = '';
    },
    removeError(oldVal, fileType) {
      if (oldVal != null) {
        let indexOfError =
          fileType === 'audio'
            ? this.errors.indexOf('audio')
            : this.errors.indexOf('image');
        if (indexOfError !== -1) {
          this.errors.splice(indexOfError, 1);
        }
      }
    },
    close() {
      this.errors = [];
      this.name = null;
      this.imgFile = null;
      this.file = null;
      this.$refs.imageFileInput.value = null;
      this.$refs.audioFileInput.value = null;
      this.tags = []
      this.warning = '';
      //location.reload();
      this.$emit('close');
    },
    previewFiles(event, source) {
      let size = event.target.files.length > 0 ? event.target.files[0].size : 0;

      if (source === 'img') {
        if (size < 1000000) {
          this.imgFile = event.target.files[0];
        } else {
          this.errors.push('image');
          //todo: check if correct!
          event.target.value = null;
        }
      } else if (source === 'audio') {
        if (size < 6000000) {
          this.file = event.target.files[0];
        } else {
          this.errors.push('audio');
          //todo: check if correct!
          event.target.value = null;
        }
      } else {
        console.error('an error has occured');
      }
    },
    async submit() {
      const formData = new FormData();
      formData.append('imgFile', this.imgFile);
      formData.append('name', this.name);
      formData.append('audioFile', this.file);
      formData.append('tags', JSON.stringify(this.tags));

      await axios
        .post('/api/posts', formData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      //todo: close modal after sound added with this.close();
      this.close()
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
