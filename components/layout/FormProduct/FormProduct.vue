<template>
  <div class="form-product">
    <!-- Hình ảnh -->
    <div class="fd-card mb-4">
      <p class="card-title mb-4">
        <v-icon>mdi-numeric-1-box-multiple</v-icon>
        Thumbnail
      </p>
      <p class="mb-4 bsk-weight-bold">Thumbnail</p>
      <v-text-field
        v-model="products.thumbnailUrl"
        filled
        dense
        placeholder="Image link"
        hide-details
        color="#2e2e2e"
      />
    </div>
    <!-- Thông tin sách (không có author, category) -->
    <div class="fd-card mb-4">
      <p class="card-title mb-4">
        <v-icon>mdi-numeric-2-box-multiple</v-icon>
        Book information
      </p>
      <p class="mb-4 bsk-weight-bold">Title</p>
      <v-text-field
        v-model="products.title"
        filled
        dense
        placeholder="Title"
        color="#2e2e2e"
      />
      <v-row>
        <v-col cols="12" md="6">
          <p class="mb-4 bsk-weight-bold">ISBN</p>
          <v-text-field
            v-model="products.isbn"
            filled
            dense
            placeholder="ISBN"
            color="#2e2e2e"
          />
        </v-col>
        <v-col cols="12" md="6">
          <p class="mb-4 bsk-weight-bold">Page count</p>
          <v-text-field
            v-model="products.pageCount"
            filled
            dense
            placeholder="Page count"
            color="#2e2e2e"
          />
        </v-col>
      </v-row>
      <p class="mb-4 bsk-weight-bold">Published date</p>
      <v-text-field
        v-model="products.publishedDate.date"
        filled
        dense
        placeholder="Published date"
        color="#2e2e2e"
      />
      <p class="mb-4 bsk-weight-bold">Short description</p>
      <v-textarea
        v-model="products.shortDescription"
        auto-grow
        filled
        dense
        placeholder="Short description"
        color="#2e2e2e"
      />
      <p class="mb-4 bsk-weight-bold">Long description</p>
      <v-textarea
        v-model="products.longDescription"
        auto-grow
        filled
        dense
        placeholder="Long description"
        hide-details
        color="#2e2e2e"
      />
    </div>
    <!-- Author -->
    <div class="fd-card mb-4">
      <p class="card-title mb-4">
        <v-icon>mdi-numeric-3-box-multiple</v-icon>
        Author
      </p>
      <p class="mb-4 bsk-weight-bold">Author</p>
      <v-row class="mb-3">
        <v-col
          v-for="(author, index) in products.authors"
          :key="index"
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="products.authors[index]"
            filled
            dense
            color="#2e2e2e"
            hide-details
            :append-icon="`${products.authors.length > 1 ? 'mdi-close' : ''}`"
            @click:append="deleteObject('authors', index)"
          />
        </v-col>
      </v-row>
      <a class="bsk-weight-bold bsk-text-gray" @click="addNew('authors')"
        ><i class="las la-plus"></i>&nbsp;Add new author</a
      >
    </div>
    <!-- Category -->
    <div class="fd-card mb-4">
      <p class="card-title mb-4">
        <v-icon>mdi-numeric-4-box-multiple</v-icon>
        Category
      </p>
      <p class="mb-4 bsk-weight-bold">Category</p>
      <v-row class="mb-3">
        <v-col
          v-for="(category, idx) in products.categories"
          :key="idx"
          cols="12"
          md="6"
        >
          <v-text-field
            v-model="products.categories[idx]"
            filled
            dense
            color="#2e2e2e"
            hide-details
            :append-icon="`${
              products.categories.length > 1 ? 'mdi-close' : ''
            }`"
            @click:append="deleteObject('categories', idx)"
          />
        </v-col>
      </v-row>
      <a class="bsk-weight-bold bsk-text-gray" @click="addNew('categories')"
        ><i class="las la-plus"></i>&nbsp;Add new category</a
      >
    </div>
    <!-- Trạng thái -->
    <div class="fd-card mb-4">
      <p class="card-title mb-4">
        <v-icon>mdi-numeric-5-box-multiple</v-icon>
        Status
      </p>
      <p class="mb-4 bsk-weight-bold">Status</p>
      <v-switch
        v-model="products.status"
        label="PUBLISH"
        color="success"
        value="PUBLISH"
        hide-details
      ></v-switch>
    </div>
    <!-- Giá -->
    <div class="fd-card">
      <p class="card-title mb-4">
        <v-icon>mdi-numeric-6-box-multiple</v-icon>
        Price
      </p>
      <p class="mb-4 bsk-weight-bold">Price</p>
      <v-text-field
        v-model="products.book_price"
        filled
        dense
        placeholder="Price"
        hide-details
        color="#2e2e2e"
      />
      <v-switch
        v-model="products.sale"
        label="Sale"
        color="success"
        value="Sale"
        hide-details
      ></v-switch>
      <div v-if="products.sale === 'Sale'">
        <p class="my-4 bsk-weight-bold">Sale price</p>
        <v-text-field
          v-model="products.final_price"
          filled
          dense
          placeholder="Sale price"
          hide-details
          color="#2e2e2e"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormProduct',
  computed: {
    products: {
      get() {
        return this.$store.state.product.product
      },
    },
  },
  methods: {
    addNew(value) {
      this.products[value].push('')
    },
    deleteObject(value, index) {
      this.products[value].splice(index, 1)
    },
  },
}
</script>
