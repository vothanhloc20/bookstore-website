<template>
  <div class="header-layout">
    <v-app-bar
      v-scroll="handleScroll"
      :flat="flat"
      app
      fixed
      color="#ffffff"
      :class="`${!flat ? 'custom-elevation' : ''}`"
    >
      <p class="bsk-text-28px bsk-weight-bold bsk-text-purple hl-title">
        Booksky
      </p>
      <v-spacer></v-spacer>
      <v-text-field
        placeholder="Search by author, title, name"
        filled
        dense
        single-line
        hide-details
        color="#2E2E2E"
        append-icon="mdi-magnify"
      ></v-text-field>
      <v-spacer></v-spacer>
      <a @click="favoriteItem">
        <i class="lar la-heart bsk-text-28px bsk-text-black mr-4"></i>
      </a>
      <v-badge color="#443d81" :content="quantity">
        <a href="/cart">
          <i class="las la-shopping-bag bsk-text-28px bsk-text-black"></i>
        </a>
      </v-badge>
    </v-app-bar>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'HeaderLayout',
  data() {
    return {
      flat: true,
    }
  },
  computed: {
    quantity: {
      get() {
        return this.$store.state.product.quantity
      },
      set(quantity) {
        this.$store.commit('product/setQuantity', quantity)
      },
    },
  },
  mounted() {
    this.handleScroll()
    this.setQuantity()
  },
  methods: {
    handleScroll() {
      if (window.scrollY === 0) {
        this.flat = true
      } else {
        this.flat = false
      }
    },
    setQuantity() {
      const cart = localStorage.getItem('cart')
      const cartArray = JSON.parse(cart)
      if (cartArray !== null && cartArray.length > 0) {
        const quantity = []
        for (const item in cartArray) {
          quantity.push(cartArray[item].quantity)
        }
        const quantityString = quantity.reduce((a, b) => a + b).toString()
        this.$store.commit('product/setQuantity', quantityString)
      } else {
        const quantityString = '0'
        this.$store.commit('product/setQuantity', quantityString)
      }
    },
    favoriteItem() {
      Swal.fire({
        title: 'This feature is in development',
        text: 'We are currently developing this feature.',
        cancelButtonColor: '#f85358',
        imageUrl: '/develope.svg',
        imageWidth: 100,
        imageHeight: 100,
        padding: '2em',
        allowOutsideClick: false,
      })
    },
  },
}
</script>
