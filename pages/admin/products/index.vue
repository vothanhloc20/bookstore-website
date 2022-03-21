<template>
  <div class="admin-product pa-4">
    <div>
      <div class="d-flex ap-control">
        <div
          v-if="$vuetify.breakpoint.mdAndDown"
          class="apc-button"
          @click="handleNavigation"
        >
          <img
            :src="require('~/assets/images/hamburger.svg')"
            width="28"
            height="28"
            alt="Icon"
            style="cursor: pointer; max-width: 100%; vertical-align: middle"
            @click="drawer = false"
          />
        </div>
        <div class="apc-pm">
          <p>Product Management</p>
        </div>
        <div class="apc-anp">
          <p @click="controlFormProduct">
            <i class="las la-plus"></i>&nbsp;Add new product
          </p>
        </div>
      </div>
      <div>
        <v-skeleton-loader
          v-if="!haveData"
          loading
          type="table"
          :types="{
            table: 'table-thead, table-tbody, table-tfoot',
            'table-thead': 'heading@5',
            'table-tbody': 'table-row-divider@9',
            'table-row': 'table-cell@5',
          }"
        ></v-skeleton-loader>
        <Table
          v-else
          :headers="headers"
          :items="books"
          @getProduct="getProduct"
          @editItem="editItem"
        />
      </div>
    </div>
    <v-navigation-drawer
      v-model="drawer"
      disable-route-watcher
      stateless
      fixed
      temporary
      right
      width="500"
      height="100%"
    >
      <template #prepend>
        <div class="pa-6 d-flex">
          <p class="bsk-text-18px bsk-weight-bold flex-grow-1">
            {{ title }}
          </p>
          <img
            :src="require('~/assets/images/close.svg')"
            width="28"
            height="28"
            alt="Icon"
            style="cursor: pointer; max-width: 100%; vertical-align: middle"
            @click="controlFormProduct"
          />
        </div>
      </template>
      <div class="pa-6">
        <AdminFormProduct />
      </div>
      <template #append>
        <div class="pa-6 text-right">
          <a class="bsk-weight-bold bsk-text-purple" @click="controlProduct"
            ><i class="las la-plus"></i>&nbsp;{{ button }}</a
          >
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import Table from '~/components/layout/Table/Table.vue'
import AdminFormProduct from '~/components/layout/FormProduct/FormProduct.vue'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-start',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
})

export default {
  name: 'AdminProductPage',
  components: {
    Table,
    AdminFormProduct,
  },
  data() {
    return {
      books: [],
      tempObject: {},
      haveData: false,
      drawer: false,
      title: 'Create new product',
      button: 'Create',
      headers: [
        {
          text: 'Title',
          align: 'start',
          value: 'title',
        },
        {
          text: 'Thumbnail',
          sortable: false,
          value: 'thumbnailUrl',
        },
        {
          text: 'Category',
          sortable: false,
          value: 'categories',
        },
        {
          text: 'Rating',
          sortable: false,
          value: 'avg_rating',
        },
        {
          text: 'Action',
          value: 'action',
          sortable: false,
        },
      ],
    }
  },
  head() {
    return {
      title: 'PRODUCT MANAGEMENT',
    }
  },
  computed: {
    products: {
      get() {
        return this.$store.state.product.product
      },
      set(products) {
        this.$store.commit('product/setProduct', products)
      },
    },
    tempProducts: {
      get() {
        return this.$store.state.product.tempProduct
      },
      set(tempProducts) {
        this.$store.commit('product/setTemp', tempProducts)
      },
    },
  },
  created() {
    this.getProduct()
  },
  methods: {
    async getProduct() {
      const books = []
      this.books = []
      this.haveData = false
      const response = await this.$api.books.getAllBooks()
      for (const key in response.response.data) {
        if (response.response.data[key] !== null) {
          books.push({ ...response.response.data[key], realId: key })
        }
      }
      this.books = [...books]
      this.books = this.books.reverse()
      if (this.books.length > 0) {
        this.haveData = true
      }
    },
    controlFormProduct() {
      this.drawer = !this.drawer
      if (!this.drawer && this.button === 'Edit') {
        const payload = {}
        Object.keys(this.tempProducts).forEach((key) => {
          if (key !== 'authors' && key !== 'categories') {
            this.products[key] = this.tempProducts[key]
          } else {
            this.products[key] = ['']
          }
        })
        this.tempProducts = {}
        this.$store.commit('product/setTemp', payload)
        this.title = 'Create new product'
        this.button = 'Edit'
      } else if (this.drawer && this.button === 'Create') {
        const temp = { ...this.products }
        this.$store.commit('product/setTemp', temp)
      } else if (!this.drawer && this.button === 'Create') {
        const payload = {}
        Object.keys(this.tempProducts).forEach((key) => {
          if (key !== 'authors' && key !== 'categories') {
            this.products[key] = this.tempProducts[key]
          } else {
            this.products[key] = ['']
          }
        })
        this.$store.commit('product/setTemp', payload)
      }
    },
    editItem() {
      this.drawer = true
      this.title = 'Edit product'
      this.button = 'Edit'
    },
    validateForm(element, type) {
      let validate = ''
      if (
        element !== 'sale' &&
        element !== 'avg_rating' &&
        element !== 'status' &&
        element !== 'final_price'
      ) {
        validate = !(
          (type !== 'object' && this.products[element] === '') ||
          (type === 'object' &&
            element !== 'publishedDate' &&
            this.products[element].includes('')) ||
          (type === 'object' && this.products[element].date === '')
        )
      } else if (element === 'status') {
        validate = true
      } else if (element === 'final_price') {
        if (this.products.sale !== null && this.products[element] === '') {
          validate = false
        } else if (
          this.products.sale === null &&
          this.products[element] !== ''
        ) {
          this.products[element] = ''
          validate = true
        } else {
          validate = true
        }
      } else {
        validate = true
      }
      return validate
    },
    async controlProduct() {
      const validateArray = []
      Object.keys(this.products).forEach((i) => {
        validateArray.push(this.validateForm(i, typeof this.products[i]))
      })
      const check = validateArray.includes(false)
      if (check) {
        Toast.fire({
          icon: 'error',
          title:
            'Please double-check the book information to make sure all information is provided!',
          background: '#FFCBCB',
          color: '#FF6464',
          width: '440px',
        })
      } else if (!check) {
        let response = {}
        if (this.button === 'Create') {
          response = await this.$api.books.createBook(this.products)
        } else {
          response = await this.$api.books.editBook(
            this.products,
            this.products.realId
          )
        }
        if (response.response.status === 200) {
          Toast.fire({
            icon: 'success',
            title: `${this.button} successfully`,
            background: '#ebfaef',
            color: '#00b074',
            width: '440px',
          })
          this.getProduct()
          if (this.button === 'Create') {
            Object.keys(this.tempProducts).forEach((key) => {
              if (key !== 'authors' && key !== 'categories') {
                this.products[key] = this.tempProducts[key]
              } else {
                this.products[key] = ['']
              }
            })
            this.tempProducts = {}
          } else {
            this.title = 'Create new product'
            this.button = 'Create'
            Object.keys(this.tempProducts).forEach((key) => {
              if (key !== 'authors' && key !== 'categories') {
                this.products[key] = this.tempProducts[key]
              } else {
                this.products[key] = ['']
              }
            })
            delete this.products.realId
            this.tempProducts = {}
          }
          this.drawer = !this.drawer
        } else {
          Toast.fire({
            icon: 'error',
            title: `${this.button} unsuccessfully!`,
            background: '#FFCBCB',
            color: '#FF6464',
            width: '440px',
          })
        }
      }
    },
    handleNavigation() {
      this.$nuxt.$emit('handleNavigation')
    },
  },
}
</script>
