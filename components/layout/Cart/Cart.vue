<template>
  <div>
    <div class="d-flex align-center">
      <div class="mr-4">
        <v-avatar size="120" tile style="border-radius: 6px !important">
          <img :src="thumbnailUrl" :alt="title" />
        </v-avatar>
      </div>
      <div class="flex-grow-1 mr-4">
        <p class="bsk-weight-bold">{{ title }}</p>
      </div>
      <div class="d-flex align-center mr-4">
        <i
          class="las la-minus"
          style="cursor: pointer"
          @click="controlQuantity('minus')"
        />
        <p class="bsk-weight-s-bold mx-3">{{ quantity }}</p>
        <i
          class="las la-plus"
          style="cursor: pointer"
          @click="controlQuantity('plus')"
        />
      </div>
      <div>
        <p class="bsk-weight-s-bold bsk-text-red">${{ finalPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartLayout',
  props: {
    thumbnailUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      default: 0,
    },
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    finalPrice() {
      return parseFloat(this.price * this.quantity).toFixed(2)
    },
  },
  methods: {
    controlQuantity(value) {
      this.$emit('controlQuantity', value, this.item)
    },
  },
}
</script>
