<template>
  <Header />
  <Error v-if="extrasStore.errors.length" :error="extrasStore.errors[0]" />
  <div v-else :key="domain" class="page-wrapper">
    <suspense>
      <RouterView :key="$route.fullPath" />
    </suspense>
  </div>
</template>


<script setup>
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import Header from './components/Header.vue'
import Error from './views/Error.vue'
import { useExtrasStore } from './stores/ExtrasStore'

const extrasStore = useExtrasStore()
const { domain, errors } = storeToRefs(extrasStore)

//geting the domain when on live route
const getDomain = () => {
  // const url = window.location.hostname
  const url = ' www.colorline.no'
  const hostname = url ? url.substring(url.lastIndexOf('.') + 1) : 'com'
  domain.value = hostname
  console.log(url.substring(url.lastIndexOf('.') + 1))
}

getDomain()
</script>

