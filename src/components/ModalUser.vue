<template>
  <div
    v-if="state.isActive"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    @click="close"
  >
    <div
      class="fixed animated zoomIn faster"
      @click.stop
    >
      <div class="flex flex-col overflow-hidden bg-white rounded-lg">
        <div
          :style="{
            backgroundImage: `url(https://secure.gravatar.com/avatar/25c7c18223fb42a4c6ae1c8db6f50f9b?d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-user-420.png)`
          }"

          class="relative flex w-full h-48 bg-center bg-cover "
        />

        <div class="flex flex-col p-4 bg-white">
          <div class="">
            <h1 class="text-lg font-black text-gray-800">
              Igor Halfeld (@igorhalfeld)
            </h1>
            <h2 class="text-sm font-bold text-gray-700">
              Software Engineer
            </h2>
            <div class="max-w-xl mt-5 font-semibold text-gray-600">
              https://github.com/blog
            </div>
          </div>
          <div class="flex justify-end mt-10">
            <button class="font-medium focus:outline-none text-blue-6" @click="close">
              Ok 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  setup () {
    const state = reactive({
      isActive: true
    })

    function close () {
      state.isActive = false
    }

    return {
      state,
      close
    }
  }
}
</script>
