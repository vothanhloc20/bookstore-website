<template>
  <div class="product-layout">
    <div class="pl-thumbnail">
      <a>
        <img :src="thumbnail" :alt="title" />
        <div v-if="sale !== '' && sale !== null" class="pl-tag">Sale</div>
        <div class="pl-action">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <i
                class="pl-button lar la-heart"
                v-bind="attrs"
                @click="favoriteItem"
                v-on="on"
              ></i>
            </template>
            <span>Favorite</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <i
                class="pl-button las la-shopping-bag"
                v-bind="attrs"
                v-on="on"
                @click="addToCart(item)"
              ></i>
            </template>
            <span>Add to Cart</span>
          </v-tooltip>
        </div>
      </a>
    </div>
    <div class="pl-information">
      <p class="pli-title bsk-weight-bold bsk-text-18px">{{ title }}</p>
      <p class="pli-price bsk-text-gray">
        <span v-if="sale !== '' && sale !== null" class="bsk-weight-medium"
          ><strike>${{ price }}</strike> &nbsp;</span
        >
        <span v-else>${{ price }}</span>
        <span v-if="sale !== '' && sale !== null" class="bsk-weight-s-bold"
          >${{ sale }}</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export default {
  name: 'ProductLayout',
  props: {
    thumbnail: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    price: {
      type: String,
      default: '',
    },
    sale: {
      type: String,
      default: '',
    },
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
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
  methods: {
    addToCart(item) {
      const cart = localStorage.getItem('cart')
      let cartArray = []
      if (cart === null) {
        cartArray.push({ ...item, quantity: 1 })
        localStorage.setItem('cart', JSON.stringify(cartArray))
        Toast.fire({
          icon: 'success',
          title: 'Add to cart successfully',
          background: '#ebfaef',
          color: '#00b074',
          width: '440px',
        })
      } else {
        cartArray = JSON.parse(cart)
        cartArray = cartArray.reverse()
        const find = (element) => element.realId === item.realId
        const index = cartArray.findIndex(find)
        if (index === -1) {
          cartArray.push({ ...item, quantity: 1 })
          localStorage.setItem('cart', JSON.stringify(cartArray.reverse()))
          Toast.fire({
            icon: 'success',
            title: 'Add to cart successfully',
            background: '#ebfaef',
            color: '#00b074',
            width: '440px',
          })
        } else {
          cartArray[index].quantity += 1
          localStorage.setItem('cart', JSON.stringify(cartArray.reverse()))
          Toast.fire({
            icon: 'success',
            title: 'Update cart successfully',
            background: '#ebfaef',
            color: '#00b074',
            width: '440px',
          })
        }
      }
      this.setQuantity()
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
    setQuantity() {
      const cart = localStorage.getItem('cart')
      const cartArray = JSON.parse(cart)
      const quantity = []
      for (const item in cartArray) {
        quantity.push(cartArray[item].quantity)
      }
      const quantityString = quantity.reduce((a, b) => a + b).toString()
      this.$store.commit('product/setQuantity', quantityString)
    },
  },
}
</script>
