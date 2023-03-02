<template>
  <div class="details-item">
    <div
      class="details-item-img"
      :title="selectedProduct.title"
      :price="selectedProduct.price"
      :style="backgroundImage"
    >
      <button class="close-button" @click="$emit('backTolist')">
        <div><span>Lukk og tilbake</span>&nbsp;<strong>X</strong></div>
      </button>
      <div class="textwrapper">
        <span class="short"> {{ selectedProduct.shortDescription }}<br /> </span>
        <span class="location"> Serveres i {{ selectedProduct.location }} </span>
      </div>
    </div>
    <div class="card-info">
      <h2 style="margin: 0; padding: 0">{{ selectedProduct.title }}</h2>
      <span>Voksne</span>&nbsp;
      <h2>{{ selectedProduct.Price['Currency'] }}&nbsp;{{ selectedProduct.Price['Amount'] }}</h2>

      <div class="available-times">
        <button
          v-for="time in timeslots"
          class="time-button"
          @click="selectTime"
          :class="{ active: timeSelected }"
        >
          <div class="add-button-text-container">{{ time.Time }}</div>
          <div class="ripple" style="top: 0px; left: 0px; width: 0px; height: 0px"></div>
        </button>
      </div>

      <div v-if="timeSelected" class="price-quantity">
        <div class="stepper">
          <strong @click="extrasStore.addProduct()" class="addSubstractBtn">+</strong>
          <div class="quantity">
            <strong>{{ quantity }}</strong>
          </div>
          <strong @click="extrasStore.removeProduct()" class="addSubstractBtn">-</strong>
        </div>
        <div class="price-and-select">
          <div class="price-info">
            <div class="price-label">Sum:</div>
            <strong class="price-sum">
              {{ selectedProduct.Price['Currency'] }}&nbsp;{{ totalPrice }}–
            </strong>
          </div>
          <button class="add-button" @click="addtoCart">
            <div class="add-button-text-container">Legg til</div>
            <div class="ripple" style="top: 0px; left: 0px; width: 0px; height: 0px"></div>
          </button>
        </div>
      </div>
      <span
        >"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate veli</span
      >
    </div>
  </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useExtrasStore } from '..//stores/ExtrasStore'

const props = defineProps({
  price: String
})

const emit = defineEmits(['backTolist'])
const extrasStore = useExtrasStore()
const { selectedProduct, quantity } = storeToRefs(extrasStore)
const timeslots = ref(selectedProduct.value.Dates[0].Timeslots)
const timeSelected = ref(quantity.value != 0)

const totalPrice = computed(() => {
  return quantity.value == 0 ? props.price : props.price * quantity.value
})

const backgroundImage = computed(() => {
  return `background-image:url(http://www.colorline.no${selectedProduct.value.image})`
})

const addtoCart = () => {
  quantity.value == 0 ? (quantity.value = 1) : quantity.value
  emit('backTolist')
}

const selectTime = () => {
  timeSelected.value = true
}
</script>
  