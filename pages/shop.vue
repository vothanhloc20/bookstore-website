<template>
  <div class="shop-page">
    <Banner>
      <v-row class="ma-0">
        <v-col cols="12" md="6" class="d-flex flex-column justify-center">
          <p class="bsk-text-32px bsk-weight-bold bsk-text-purple">
            Booksky Collections
          </p>
          <p class="my-3 bsk-text-18px bsk-weight-medium">Online Book Store</p>
          <p class="bsk-text-24px bsk-weight-s-bold bsk-text-light-gray">
            Its Time to Stock up Your Book Shelves
          </p>
        </v-col>
        <v-col cols="12" md="6" class="d-flex align-center justify-center">
          <img
            width="300"
            height="100%"
            :src="require('~/assets/images/Folder.png')"
            alt="Folder"
          />
        </v-col>
      </v-row>
    </Banner>
    <div class="sp-collections py-8">
      <v-row class="ma-0">
        <v-col cols="12" md="3" class="pl-0">
          <div class="spc-filter">
            <div class="d-flex">
              <p class="flex-grow-1 bsk-text-purple bsk-weight-bold">
                Filter by
              </p>
              <a
                class="flex-grow-1 text-right bsk-text-light-gray bsk-weight-medium"
                >Reset filter</a
              >
            </div>
            <div class="mt-4">
              <FilterLayout :authors="authors" :categories="categories" />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="9" class="pr-0">
          <v-row v-if="pagingBooks.length > 0">
            <v-col cols="12" md="8">
              <p class="flex-grow-1 bsk-text-purple">
                Show {{ start + 1 }}-{{ end }} of {{ books.length }} results
              </p>
            </v-col>
            <v-col cols="12" md="4">
              <v-autocomplete
                v-model="value"
                :items="items"
                dense
                filled
                single-line
                color="#2E2E2E"
                item-color="#2E2E2E"
                hide-details
                :menu-props="{
                  transition: 'scroll-y-transition',
                  rounded: 'lg',
                  elevation: 0,
                }"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row v-if="pagingBooks.length > 0">
            <v-col
              v-for="item in pagingBooks"
              :key="item.realId"
              cols="12"
              sm="6"
              md="4"
            >
              <Product
                :title="item.title"
                :sale="item.final_price"
                :price="item.book_price"
                :thumbnail="item.thumbnailUrl"
                :item="item"
              />
            </v-col>
            <v-col cols="12">
              <v-pagination
                v-model="currentPage"
                :length="totalPage"
                :total-visible="6"
                color="#443d81"
                @input="handlePaging"
              ></v-pagination>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4">
              <v-skeleton-loader
                max-height="400"
                type="image, list-item-two-line"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import FilterLayout from '~/components/layout/Filter/Filter.vue'
import Product from '~/components/layout/Product/Product.vue'
import Banner from '~/components/layout/Banner/Banner.vue'

export default {
  name: 'ShopPage',
  components: {
    FilterLayout,
    Product,
    Banner,
  },
  data() {
    return {
      value: 'Sort By Title: A to Z',
      items: [
        'Sort By Title: A to Z',
        'Sort By Title: Z to A',
        'Sort By Price: Low to High',
        'Sort By Price: High to Low',
      ],
      categories: [],
      authors: [],
      books: [],
      pagingBooks: [],
      perPage: 12,
      currentPage: 1,
      start: 0,
      end: 12,
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.books.length / this.perPage)
    },
  },
  created() {
    this.getFilterBy()
  },
  methods: {
    async getFilterBy() {
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
      this.pagingBooks = []
      for (const index in this.books) {
        if (index >= this.start && index < this.end) {
          this.pagingBooks.push(this.books[index])
        }
      }
      this.haveData = true
      this.books.forEach((book) => {
        book.authors.forEach((author) => {
          if (author !== '' && !this.authors.includes(author)) {
            this.authors.push(author)
          }
        })
        book.categories.forEach((category) => {
          if (category !== '' && !this.categories.includes(category)) {
            this.categories.push(category)
          }
        })
      })
    },
    handlePaging() {
      this.start = (this.currentPage - 1) * this.perPage
      if (this.currentPage === this.totalPage) {
        this.end = this.books.length
      } else {
        this.end = this.currentPage * this.perPage
      }
      this.pagingBooks = []
      for (const index in this.books) {
        if (index >= this.start && index < this.end) {
          this.pagingBooks.push(this.books[index])
        }
      }
      window.scrollTo({ top: 360, behavior: 'smooth' })
    },
  },
}
</script>
