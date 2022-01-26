<template>
  <!-- container -->
  <div
    class="inline-flex w-full rounded-lg shadow-xl border border-blue-700 border-opacity-30 hover:shadow-inner hover:border-opacity-0"
  >
    <!-- image contianer -->
    <div class="hidden lg:flex justify-center w-1/6 rounded p-2">
      <img
        class="hidden md:flex lg:max-h-img"
        :src="waveData.imageURL"
        alt="vehicle image"
        srcset=""
      >
    </div>
    <!-- track container-->
    <div class="inline pl-2 w-full">
      <div class="w-max font-semibold py-2 pl-1 text-blue-600">
        {{ waveData.Name }}
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
      playing: false,
      waveIdString: `wave${this.waveData._id}`,
    };
  },
  mounted() {
    try {
      this.wavesurfer = WaveSurfer.create({
        container: `#${this.waveIdString}`,
        waveColor: "#d9dcff",
        progressColor: "#909090 ",
        cursorColor: "#909090 ",
        height: 100,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        barGap: 3,
        fillParent: true,
        hideScrollbar: true,
      });
      this.wavesurfer.load(this.waveData.audioURL);
      this.wavesurfer.on("ready", function () {
        this.wavesurfer.play();
      });
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    play() {
      this.wavesurfer.playPause();
      this.playing = !this.playing;
    },
  },
};
</script>