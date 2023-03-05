<template>
    <div class="item">
        <div class="item-img" :title="title" :style="backgroundImage">
        </div>
        <div class="card-info">
            <h2 style="margin: 0; padding: 0">{{ title }}</h2>

            <div>
                <span> {{ shortDescription }}<br /> </span>
                <span> {{ extrasStore.getStaticStrings()[3] }} {{ location }} </span>
            </div>
            <div class="price-quantity">
                <div class="quantity">
                    <span>{{ quantity }}</span>
                </div>
                <div>
                    <span><span>{{ extrasStore.getStaticStrings()[2] }} </span>
                        <span>{{ currency }}&nbsp;<strong>{{ price }}-</strong></span></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useExtrasStore } from "..//stores/ExtrasStore";

const props = defineProps({
    title: String,
    price: String,
    currency: String,
    shortDescription: String,
    location: String,
    bgImage: String,
    quantity: Number,
});
const extrasStore = useExtrasStore();
const backgroundImage = computed(() => {
    return `background-image:url(http://www.colorline.no${props.bgImage})`;
});

</script>
