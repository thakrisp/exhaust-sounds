<template>
  <!-- container -->
  <div
    class="inline-flex w-full rounded-lg shadow-xl border border-blue-700 border-opacity-30 hover:shadow-inner hover:border-opacity-0"
  >
    <!-- image contianer -->
    <div class="hidden lg:flex justify-center w-1/6 rounded p-2">
      <img
        class="hidden md:flex lg:max-h-img rounded"
        :src="waveData.imageURL"
        alt="vehicle image"
        srcset=""
      >
    </div>
    <!-- track container-->
    <div class="pl-2 w-full flex flex-col">
      <div class="flex space-x-2">
        <div class="w-max font-semibold py-2 pl-1 text-blue-600">
          {{ waveData.Name }}
        </div>
        <li class="dropdown text-yellow-500 hover:text-red-700 cursor-pointer font-bold text-base uppercase tracking-wide relative flex items-center">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </a>
          <div class="dropdown-menu top-0 absolute z-10 h-auto hidden pt-8 ">
            <ul class="bg-white shadow p-3 space-y-2 flex-col w-max rounded-md">
              <li
                v-for="i in reportType"
                :key="i"
              >
                <a
                  class="block text-red-500 font-bold text-base uppercase hover:text-red-700 cursor-pointer text-center"
                  @click="report(i)"
                >{{ i }}</a>
              </li>
            </ul>
          </div>
        </li>
        <a
          :href="waveData.audioURL"
          class="flex items-center text-blue-700 hover:text-green-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </a>
      </div>
      <div class="flex rounded divide-x pr-2">
        <div class="inline-block m-auto px-5">
          <!-- play button -->
          <div
            v-if="!playing"
            key="play"
            @click="play"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 w-14"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <!-- pause button -->
          <div
            v-else
            key="pause"
            @click="play"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <div
          :id="`${waveIdString}`"
          class="inline-block w-11/12"
        />
      </div>
      <!-- Tags contianer -->
      <TrackTags :tags="waveData.tags" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import WaveSurfer from "wavesurfer.js";
import TrackTags from "./trackTags.vue";

export default {
  components: { TrackTags },
  props: {
    waveData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      wavesurfer: null,
      playing: false,
      waveIdString: `wave${this.waveData._id}`,
      reportType: [
        'Not a car',
        'Illegal',
        'DMCA'
      ]
    };
  },
  async mounted() {
    if (!this.wavesurfer) this.createAudio();
  },
  methods: {
    createAudio: function() {
      try {
        this.wavesurfer = WaveSurfer.create({
          container: `#${this.waveIdString}`,
          waveColor: "#d9dcff",
          progressColor: "#909090 ",
          cursorColor: "#909090 ",
          height: 45,
          barHeight: 2,
          barWidth: 2,
          barGap: 1,
          barRadius: 3,
          cursorWidth: 1,
          fillParent: true,
          hideScrollbar: true,
        });
        this.wavesurfer.load(this.waveData.audioURL);
        //https://github.com/syonip/quasar-wavesurfer-audio-player/blob/master/src/pages/Index.vue
        this.wavesurfer.on('finish', () => {
          this.playing = false
        })
      } catch (error) {
        console.log(error);
      }
    },
    play: function () {
      this.wavesurfer.playPause();
      this.playing = !this.playing;
    },
    report: async function(i) {
      let id = this.waveData._id
      await axios.post('/api/posts/report',{id, "report": i})
      .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style>
  .dropdown:hover .dropdown-menu {
    z-index: 100;
    display: block;
  }
</style>