<template>
  <div v-if="!modalOpened">
    <div class="text-wrapper">
      <h1 class="title">{{ extrasStore.getStaticStrings()[0] }}</h1>
      <p class="text">
        {{ extrasStore.getStaticStrings()[4] }}
      </p>
    </div>
    <!-- Have to ask the store for the quantity added by the user and not use in memory quantity -->
    <div v-if="loaded" class="list">
      <ExtrasCard
        v-for="product in products"
        :key="product.Reference"
        :title="product.title"
        :price="product.Price['Amount']"
        :currency="product.Price['Currency']"
        :shortDescription="product.shortDescription"
        :location="product.location"
        :bgImage="product.image"
        :quantity=extrasStore.getQuantity(product.Reference)
        @click="loadDetails(product.Reference)"
      />
    </div>
  </div>
  <DetailsModal
    v-if="modalOpened"
    :price="selectedProduct.Price['Amount']"
    @backTolist="modalOpened = false"
  ></DetailsModal>
</template>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useExtrasStore } from '..//stores/ExtrasStore'
  import ExtrasCard from '../components/ExtrasCard.vue'
  import DetailsModal from '../components/DetailsModal.vue'

  const extrasStore = useExtrasStore()
  const { products, loaded, selectedProduct, quantity } = storeToRefs(extrasStore)
  const modalOpened = ref(false)

  await extrasStore.fetchExtras()

  const loadDetails = (reference) => {
    extrasStore.setProduct(reference)
    modalOpened.value = true
  }
</script>
