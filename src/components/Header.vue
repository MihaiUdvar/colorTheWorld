
<template>
  <div class="header">
    <div class="header-bar">
      <div class="header-wrapper">
        <a href="/" title="colorTheWorld" class="header-logo tab-enabled"> COLOR THE WORLD</a>
        <div class="header-content">
          <div class="header-cart-container" @click="changeLanguage">
            <span>Language</span>
          </div>
          <span class="text-header-price text-block"> kr&nbsp; <strong>360,–</strong></span>
        </div>
        <div class="header-cart-container">
          <span>Min reise</span>
        </div>
      </div>
    </div>
  </div>
</template>

    <script setup>
import { useExtrasStore } from '..//stores/ExtrasStore'

const extrasStore = useExtrasStore()

const changeLanguage = () => {
  extrasStore.setLanguage()
  console.log('changeLanguage')
}
</script>