<template>
  <div class="flex flex-col items-center justify-center w-full bg-gray-100 h-72">
    <h1 class="text-5xl font-black text-gray-700 text-purple-500">Estado global no Vue.js 3</h1>
    <p class="mt-3 text-2xl text-gray-300 text-gray-700 font-paragrapher">Já era simples, agora ficou mais 😻</p>
    <div class="flex flex-col w-3/4 xl:w-1/4">
      <input
        @keyup.enter="() => handleChange()"
        type="text"
        class="w-full px-2 py-2 mt-7 rounded-md"
        placeholder="Ex: Igor Halfeld" v-model="state.inputValue">
      <i class="text-gray-400">{{ countLabel }}</i>
      <i class="text-gray-400" v-if="store.users.length">Mostrando {{ store.users.length }}</i>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import debounce from 'lodash.debounce'
import useStore from '../hooks/store'

export default {
  props: {
    count: { type: [String, Number], default: 3 }
  },
  emits: ['change'],
  setup (props, { emit }) {
    const store = useStore()
    const countLabel = computed(() => {
      if (props.count === 0) return 'Nenhum item encontrato'
      if (props.count === 1) return `${props.count} item encontrato`

      return `${props.count} items encontratos`
    })

    const state = reactive({
      inputValue: ''
    })

    const handleChange = debounce(() => {
      emit('change', state.inputValue)
    }, 500)

    return {
      state,
      store,
      countLabel,
      handleChange
    }
  }
}
</script>
