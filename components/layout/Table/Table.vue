<template>
  <div class="table-layout">
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="9"
      :footer-props="{
        'items-per-page-options': [9, 18, 27, -1],
      }"
      class="elevation-0"
    >
      <template #no-data>
        <span> No matching data found</span>
      </template>
      <template #[`item.thumbnailUrl`]="{ item }">
        <v-avatar size="62" style="border-radius: 4px !important">
          <v-img :src="item.thumbnailUrl" :lazy-src="item.thumbnailUrl"></v-img>
        </v-avatar>
      </template>
      <template #[`item.avg_rating`]="{ item }">
        <div class="avg_rating">
          <span>{{ item.avg_rating }}</span>
        </div>
      </template>
      <template #[`item.action`]="{ item }">
        <div class="action-area">
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <a
                class="actionbtn"
                v-bind="attrs"
                v-on="on"
                @click="editItem(item)"
              >
                <v-icon color="#7e8299">mdi-pencil-outline</v-icon>
              </a>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on, attrs }">
              <a
                class="actionbtn"
                v-bind="attrs"
                @click="deleteItem(item)"
                v-on="on"
              >
                <v-icon color="#7e8299">mdi-delete-sweep-outline</v-icon>
              </a>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

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
  name: 'TableLayout',
  props: {
    headers: {
      type: Array,
      default: () => {
        return []
      },
    },
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
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
  methods: {
    deleteItem(item) {
      Swal.fire({
        title: `Delete book ${item.title}`,
        text: 'You will not be able to recover this book',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#f85358',
        confirmButtonText: 'Delete book',
        cancelButtonText: 'Cancel',
        imageUrl: '/delete_image.png',
        imageWidth: 100,
        imageHeight: 100,
        padding: '2em',
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.$api.books.deleteBook(item.realId)
          this.$emit('getProduct')
          if (response.response.data === null) {
            Toast.fire({
              icon: 'success',
              title: 'Delete successfully',
              background: '#ebfaef',
              color: '#00b074',
              width: '440px',
            })
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Delete unsuccessfully!',
              background: '#FFCBCB',
              color: '#FF6464',
              width: '440px',
            })
          }
        }
      })
    },
    editItem(item) {
      const object = { ...item }
      if (object.status !== 'PUBLISH') {
        object.status = null
      }
      if (object.final_price !== '' && object.final_price !== 'null') {
        object.sale = 'Sale'
      } else {
        object.sale = null
      }
      const payload = {}
      this.$store.commit('product/setTemp', payload)
      this.$store.commit('product/setTemp', this.products)
      Object.keys(object).forEach((key) => {
        this.products[key] = object[key]
      })
      this.$emit('editItem')
    },
  },
}
</script>
