import bus from '../bus'

function useModal () {
  const open = (payload = {}) => {
    bus.emit('modal:toggle', { status: true, ...payload })
  }
  const close = (payload = {}) => {
    bus.emit('modal:toggle', { status: false, ...payload })
  }

  return { open, close }
}

export default useModal
