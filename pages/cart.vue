<template>
  <div class="cart-page">
    <BannerLayout>
      <v-row class="ma-0">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <p class="bsk-text-32px bsk-weight-bold bsk-text-purple">
            Booksky Cart
          </p>
          <p class="my-3 bsk-text-18px bsk-weight-medium">Cart Page</p>
          <p class="bsk-text-24px bsk-weight-s-bold bsk-text-light-gray">
            Its Time to Check Your Cart
          </p>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <img
            width="300"
            height="100%"
            :src="require('~/assets/images/Card-Reader.png')"
            alt="Folder"
          />
        </v-col>
      </v-row>
    </BannerLayout>
    <div class="my-6">
      <v-row>
        <v-col cols="12" md="8">
          <v-stepper
            v-model="stepper"
            vertical
            elevation="0"
            style="background: transparent !important"
          >
            <v-stepper-step
              :complete="stepper > 1"
              step="1"
              color="#443d81"
              class="bsk-weight-s-bold"
            >
              Individual information
              <small class="bsk-text-gray mt-2">Fill your information</small>
            </v-stepper-step>
            <v-stepper-content step="1">
              <Form />
              <v-btn color="#443d81" dark small @click="stepper = 2">
                Continue
              </v-btn>
            </v-stepper-content>
            <v-stepper-step
              :complete="stepper > 2"
              step="2"
              color="#443d81"
              class="bsk-weight-s-bold"
            >
              Product
              <small class="bsk-text-gray mt-2">Check product</small>
            </v-stepper-step>
            <v-stepper-content step="2">
              <div v-if="cart.length > 0" class="check-product mb-5">
                <div v-for="n in cart" :key="n.realId" class="cp-item">
                  <Cart
                    :thumbnail-url="n.thumbnailUrl"
                    :title="n.title"
                    :quantity="n.quantity"
                    :price="`${
                      n.final_price !== '' && n.final_price !== null
                        ? n.final_price
                        : n.book_price
                    }`"
                    :item="n"
                    @controlQuantity="controlQuantity"
                  />
                </div>
              </div>
              <div v-else class="mb-2">
                <p>Your cart is empty</p>
              </div>
              <v-btn text small @click="stepper = 1"> Back </v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-col>
        <v-col cols="12" md="4">
          <div class="cart-place-order">
            <v-btn
              :disabled="disabled"
              color="#443d81"
              :dark="!disabled"
              block
              @click="controlBill('create')"
            >
              Place order
            </v-btn>
            <p class="bsk-weight-medium text-justify my-3">
              By placing your order, you agree to our
              <a class="bsk-weight-bold">Privacy Policy</a> and
              <a class="bsk-weight-bold">Terms of Use</a>
            </p>
            <div class="shipment-details">
              <p class="bsk-weight-bold mb-3">Shipment Details</p>
              <ul>
                <li class="mb-2">
                  <p>
                    <i class="las la-user"></i>
                    {{ order.name }}
                  </p>
                </li>
                <li class="mb-2">
                  <p>
                    <i class="las la-phone"></i>
                    {{ order.phone }}
                  </p>
                </li>
                <li class="mb-2">
                  <p>
                    <i class="las la-envelope"></i>
                    {{ order.email }}
                  </p>
                </li>
                <li>
                  <p>
                    <i class="las la-map"></i>
                    {{ order.address }}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="order.note !== ''" class="cart-place-order mt-3">
            <p class="bsk-weight-bold mb-3">Note</p>
            <p class="text-justify">
              {{ order.note }}
            </p>
          </div>
          <div class="cart-place-order mt-3">
            <p class="bsk-weight-bold mb-3">Order Summary</p>
            <v-row>
              <v-col cols="6">
                <p>Gross product</p>
              </v-col>
              <v-col cols="6" class="text-right">
                <p>{{ quantity }}</p>
              </v-col>
              <v-col cols="6" class="pt-0">
                <p>Total order</p>
              </v-col>
              <v-col cols="6" class="text-right pt-0">
                <p>${{ totalPrice }}</p>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="bill" max-width="500" persistent>
      <Bill :product="cart" :total="totalPrice" @closeBill="controlBill" />
    </v-dialog>
    <v-overlay :value="overlay">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="#443d81"
          :size="70"
          :width="6"
        ></v-progress-circular>
        <h3 class="mt-12">
          We are processing your order. Please do not reload the page.
        </h3>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import BannerLayout from '~/components/layout/Banner/Banner.vue'
import Form from '~/components/layout/Form/Form.vue'
import Cart from '~/components/layout/Cart/Cart.vue'
import Bill from '~/components/layout/Bill/Bill.vue'

export default {
  name: 'CartPage',
  components: {
    BannerLayout,
    Form,
    Cart,
    Bill,
  },
  data() {
    return {
      stepper: 1,
      cart: [],
      totalPrice: 0,
      bill: false,
      overlay: false,
    }
  },
  head() {
    return {
      title: 'CART',
    }
  },
  computed: {
    order: {
      get() {
        return this.$store.state.product.order
      },
    },
    quantity: {
      get() {
        return this.$store.state.product.quantity
      },
      set(quantity) {
        this.$store.commit('product/setQuantity', quantity)
      },
    },
    disabled() {
      return (
        this.order.name === '' ||
        this.order.phone === '' ||
        this.order.email === '' ||
        this.order.address === '' ||
        this.cart.length === 0
      )
    },
  },
  mounted() {
    this.checkCart()
  },
  methods: {
    checkCart() {
      const cart = localStorage.getItem('cart')
      const cartArray = JSON.parse(cart)
      if (cartArray !== null && cartArray.length > 0) {
        this.cart = [...cartArray]
      } else {
        this.cart = []
      }
      console.log(this.cart)
      this.setTotalPrice()
    },
    controlQuantity(value, item) {
      const find = (element) => element.realId === item.realId
      const index = this.cart.findIndex(find)
      if (value === 'plus') {
        this.cart[index].quantity += 1
        localStorage.setItem('cart', JSON.stringify(this.cart))
      } else if (value === 'minus') {
        if (this.cart[index].quantity === 1) {
          this.cart.splice(index, 1)
          localStorage.setItem('cart', JSON.stringify(this.cart))
        } else {
          this.cart[index].quantity -= 1
          localStorage.setItem('cart', JSON.stringify(this.cart))
        }
      }
      this.setQuantity()
      this.setTotalPrice()
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
    setTotalPrice() {
      if (this.cart.length > 0) {
        const total = []
        for (const i in this.cart) {
          let price = ''
          if (
            this.cart[i].final_price !== '' &&
            this.cart[i].final_price !== null
          ) {
            price = this.cart[i].final_price
          } else {
            price = this.cart[i].book_price
          }
          total.push(parseFloat(this.cart[i].quantity * price).toFixed(2))
        }
        const totalNumber = []
        total.forEach((i) => totalNumber.push(parseFloat(i)))
        this.totalPrice = totalNumber.reduce((a, b) => a + b)
        this.totalPrice = parseFloat(this.totalPrice).toFixed(2)
      } else {
        this.totalPrice = 0
      }
    },
    controlBill(value) {
      if (value === 'create') {
        this.overlay = true
        setTimeout(() => {
          this.overlay = false
          this.bill = !this.bill
        }, 5000)
      } else {
        this.bill = !this.bill
        localStorage.removeItem('cart')
        location.href = '/shop'
      }
    },
  },
}
</script>
