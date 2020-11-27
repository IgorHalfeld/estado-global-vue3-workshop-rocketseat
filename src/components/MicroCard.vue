<template>
  <div class="flex flex-col items-center justify-center">
    <div>
      <img
        :src="photoUrl"
        class="w-32 h-32 rounded-full select-none"
        alt="">
    </div>
    <p class="mt-3 text-xl font-bold text-gray-500 font-paragrapher">@{{ username }}</p>
  </div>
</template>

<script>
export default {
  props: {
    username: { type: String, required: true },
    photoUrl: { type: String, required: true }
  }
}
</script>
