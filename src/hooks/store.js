import { reactive, readonly } from 'vue'

const state = reactive({
  isActiveGlobalLoading: false,
  users: []
})

export default function useStore () {
  return readonly(state)
}

export function setGlobalLoading (status) {
  state.isActiveGlobalLoading = status
}

export function setUsers (users) {
  state.users = users
}
