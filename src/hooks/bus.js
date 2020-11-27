import Emitter from 'tiny-emitter'

const bus = new Emitter()

export default () => {
  return bus
}
