<template>
  <modal-user></modal-user>
  <custom-header></custom-header>
  <div class="flex justify-center">
    <div class="flex flex-wrap justify-center max-w-5xl px-5 py-10">
      <micro-card
        v-for="n in 10"
        :key="n"
        class="mb-10"
        :class="{
          'mr-10': n !== 0
        }"
      />
    </div>
  </div>
</template>

<script>
import CustomHeader from './components/CustomHeader'
import MicroCard from './components/MicroCard'
import ModalUser from './components/ModalUser'

export default {
  name: 'App',
  components: { CustomHeader, MicroCard, ModalUser }
}
</script>
