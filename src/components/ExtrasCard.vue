<template>
  <div class="item">
    <div class="item-img" :title="title" :style="backgroundImage"></div>
    <div class="card-info">
      <h2 style="margin: 0; padding: 0">{{ title }}</h2>

      <div>
        <span> {{ shortDescription }}<br /> </span> <span> Serveres i {{ location }} </span>
      </div>
      <div class="price-quantity">
        <div class="quantity">
          <span>{{ quantity }}</span>
        </div>
        <div>
          <span
            ><span>Pris per stk.</span>
            <span
              >{{ currency }}&nbsp;<strong>{{ price }}-</strong></span
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const props = defineProps({
  title: String,
  price: String,
  currency: String,
  shortDescription: String,
  location: String,
  bgImage: String,
  quantity: Number
})

const backgroundImage = computed(() => {
  return `background-image:url(http://www.colorline.no${props.bgImage})`
})
</script>
