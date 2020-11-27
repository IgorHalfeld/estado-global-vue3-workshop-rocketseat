<template>
  <modal-user></modal-user>

  <custom-header
    @change="handleSearch"
    :count="state.count"
  />

  <div class="flex justify-center">
    <div class="flex flex-wrap justify-center max-w-5xl px-5 py-10">
      <p
        v-if="!store.users.length && !state.hasError && !store.isActiveGlobalLoading"
        class="text-xl font-semibold text-center text-gray-700"
      >
        Faça aquela busca braba aí 👆🏻
      </p>

      <p
        v-if="state.hasError"
        class="flex flex-col items-center text-xl font-semibold text-center text-gray-700"
      >
        <span class="mb-3 text-6xl animate-spin">
          🙀
        </span>
        Oh no! deu ruim..
      </p>

      <div class="flex flex-col items-center text-xl font-semibold" v-if="store.isActiveGlobalLoading">
        <span class="mb-3 text-6xl animate-spin">
          🦄
        </span>
        Fazendo uma mágica aqui...
      </div>

      <micro-card
        v-for="(user, index) in store.users"
        :key="index"
        :username="user.username"
        :photo-url="user.photoUrl"
        @click="() => handleCardClick(user)"
        class="mb-10 mr-10"
      />
    </div>
  </div>
</template>

<script>
import { reactive, onErrorCaptured } from 'vue'
import CustomHeader from './components/CustomHeader'
import MicroCard from './components/MicroCard'
import ModalUser from './components/ModalUser'
import services from './services'
import useModal from './hooks/modal'
import useStore, { setGlobalLoading, setUsers } from './hooks/store'

export default {
  name: 'App',
  components: { CustomHeader, MicroCard, ModalUser },
  setup () {
    const modal = useModal()
    const store = useStore()
    const state = reactive({
      count: 0,
      hasError: false
    })

    onErrorCaptured((error) => {
      state.hasError = !!error
      setUsers([])
      setGlobalLoading(false)
    })

    async function handleSearch (q) {
      setGlobalLoading(true)
      state.hasError = false
      console.log('global loading', store.isActiveGlobalLoading)

      const response = await services.github.searchUsers({ q })
      state.count = response.total_count
      const users = response.items.map(item => ({ username: item.login, photoUrl: item.avatar_url }))
      setUsers(users)

      setGlobalLoading(false)

      console.log('global loading', store.isActiveGlobalLoading)
    }

    function handleCardClick (user) {
      modal.open(user)
    }

    return {
      state,
      store,
      handleSearch,
      handleCardClick
    }
  }
}
</script>
