<template>
  <!-- container -->
  <div
    class="inline-flex w-full rounded-lg shadow-xl border border-blue-700 border-opacity-30 hover:shadow-inner hover:border-opacity-0"
  >
    <!-- image contianer -->
    <div class="inline w-1/6 rounded self-center p-2">
      <img
        src="https://openclipart.org/image/800px/245106"
        alt="vehicle image"
        srcset=""
      />
    </div>
    <!-- track container-->
    <div class="inline pl-2 w-full">
      <div class="w-max font-semibold py-2 pl-1">Name of track</div>
      <div class="flex rounded divide-x">
        <div class="inline-block my-auto px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"
            />
          </svg>
        </div>
        <div :id="`${this.waveIdString}`" class="inline-block w-11/12"></div>
      </div>
      <!-- Tags contianer -->
      <TrackTags />
    </div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';
import TrackTags from './trackTags.vue';
export default {
  components: { TrackTags },
  data() {
    return {
      //options: {},
      waveIdString: `wave${this.waveId}`,
    };
  },
  props: {
    waveId: Number,
  },
  /* beforeMount() {
    console.log(this.waveIdString);
  }, */
  mounted() {
    try {
      console.log(this.waveIdString);
      this.wavesurfer = WaveSurfer.create({
        container: `#${this.waveIdString}`,
        waveColor: '#d9dcff',
        progressColor: '#909090 ',
        cursorColor: '#909090 ',
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 1,
        barGap: 3,
        fillParent: true,
        mediaControls: true,
      });
      this.wavesurfer.load(
        'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
      );
      this.wavesurfer.on('ready', function () {
        this.wavesurfer.play();
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
