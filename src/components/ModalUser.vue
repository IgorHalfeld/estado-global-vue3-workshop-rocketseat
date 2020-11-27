<template>
  <div
    v-if="state.isActive"
    class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
    @click="close"
  >
    <div
      class="fixed w-64 max-w-2xl mx-10"
      @click.stop
    >
      <div class="flex flex-col overflow-hidden bg-white rounded-lg">
        <div
          :style="{
            backgroundImage: `url(${state.user.photoUrl})`
          }"

          class="relative flex w-full h-48 bg-center bg-cover"
        />

        <div class="flex flex-col p-4 bg-white">
          <p
            v-if="state.isLoading"
            class="text-sm font-bold text-gray-700">
            Carregando...
          </p>
          <div class="">
            <h1 class="text-lg font-black text-gray-800">
              {{ state.user.name }} (@{{ state.user.username }})
            </h1>
            <p class="text-sm font-bold text-gray-700">
              {{ state.user.company }}
            </p>
            <div class="max-w-xl mt-5 font-semibold text-gray-600">
              {{ state.user.bio }}
            </div>
          </div>
          <div class="flex justify-end mt-10">
            <a :href="state.githubUrl" target="_blank" class="mr-5 font-medium text-gray-400 focus:outline-none">
              Abrir perfil
            </a>
            <button class="font-medium focus:outline-none" @click="close">
              Ok 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import bus from '../bus'
import services from '../services'

export default {
  setup (props) {
    const state = reactive({
      isActive: false,
      isLoading: false,
      user: {
        name: '',
        username: '',
        photoUrl: '',
        bio: '',
        company: ''
      }
    })

    state.githubUrl = computed(() => `https://github.com/${state.user.username}`)

    function close () {
      state.isActive = false
    }

    async function handleModalToggle (payload) {
      state.isLoading = true
      state.isActive = payload.status
      state.user.username = payload.username
      state.user.photoUrl = payload.photoUrl

      const response = await services.github.getUserByUsername({ username: payload.username })

      state.user.name = response.name ?? 'Sem nome'
      state.user.bio = response.bio ?? 'Sem bio'
      state.user.company = response.company ?? 'Sem empresa'

      state.isLoading = false
    }

    onMounted(() => {
      bus.on('modal:toggle', handleModalToggle)
    })

    onBeforeUnmount(() => {
      bus.off('modal:toggle', handleModalToggle)
    })

    return {
      state,
      close
    }
  }
}
</script>
