<template>
  <div class="error-page">
    <div class="error-content">
      <h1>404</h1>
      <h3><i class="fa fa-warning text-yellow"></i> Oops! {{ error.split(':')[1] }}</h3>
      <p>
        We could not find the page you were looking for. Meanwhile, you may
        <a href="javascript:history.back()">return to the previous page</a> or go to our
        <router-link to="/">homepage</router-link>.
      </p>
    </div>
  </div>
</template>
    
    <script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  error: String
})

console.log(props.error)
</script>
    