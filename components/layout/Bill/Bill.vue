<template>
  <v-card class="bill-layout pa-6">
    <p class="bsk-text-28px bsk-weight-bold bsk-text-purple bl-title">
      BOOKSKY
    </p>

    <div class="mt-3 my-6">
      <p class="bsk-text-gray bsk-weight-s-bold">
        <i class="las la-map-marker"></i>&nbsp;Thao Dien Street, District 2,
        Thao Dien Ward, Ho Chi Minh City, Vietnam
      </p>
      <p class="bsk-text-gray bsk-weight-s-bold my-2">
        <i class="las la-phone-volume"></i>&nbsp;123-456-7898
      </p>
      <p class="bsk-text-gray bsk-weight-s-bold">
        <i class="las la-envelope"></i>&nbsp;info@booksky.com
      </p>
    </div>

    <div class="d-flex bl-invoice-card mb-6">
      <div class="flex-grow-1">
        <p class="bsk-weight-s-bold pb-2">Invoice Number</p>
        <p class="pb-2">INV-2022</p>
        <p class="bsk-weight-s-bold pb-2">Date order</p>
        <p>21/03/2022</p>
      </div>
      <div class="flex-grow-1 text-right">
        <p class="bsk-weight-s-bold pb-2">Billed to</p>
        <p class="mb-2">{{ order.name }}</p>
        <p class="mb-2">{{ order.phone }}</p>
        <p>{{ order.address }}</p>
      </div>
    </div>

    <div class="mb-6 bl-table">
      <table>
        <thead>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in product" :key="index">
            <td width="10%">{{ index + 1 }}</td>
            <td width="30%">{{ item.title }}</td>
            <td width="20%" class="text-center">{{ item.quantity }}</td>
            <td
              v-if="item.final_price !== '' && item.final_price !== null"
              width="20%"
            >
              {{ item.final_price }}
            </td>
            <td v-else width="20%">{{ item.book_price }}</td>
            <td
              v-if="item.final_price !== '' && item.final_price !== null"
              width="20%"
            >
              ${{ parseFloat(item.quantity * item.final_price).toFixed(2) }}
            </td>
            <td v-else width="20%">
              ${{ parseFloat(item.quantity * item.book_price).toFixed(2) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <p class="bsk-weight-s-bold pb-2">Note</p>
      <v-textarea
        v-model="order.note"
        color="#2e2e2e"
        readonly
        filled
        auto-grow
        dense
      />
    </div>

    <div class="bl-final-price">
      <div class="d-flex mb-2">
        <p class="flex-grow-1 bsk-weight-s-bold">Sub Total</p>
        <p class="flex-grow-1 text-right ml-3 bsk-weight-s-bold">
          ${{ total }}
        </p>
      </div>
      <div class="d-flex mb-2">
        <p class="flex-grow-1 bsk-text-gray bsk-weight-medium">Discount</p>
        <p class="flex-grow-1 text-right ml-3 bsk-weight-s-bold">$0.00</p>
      </div>
      <div class="d-flex mb-6">
        <p class="flex-grow-1 bsk-text-gray bsk-weight-medium">Total tax</p>
        <p class="flex-grow-1 text-right ml-3 bsk-weight-s-bold">$0.00</p>
      </div>
      <div class="d-flex mb-2 blfp-total-amount">
        <p class="flex-grow-1 bsk-text-gray bsk-weight-medium bsk-text-20px">
          Total Amount
        </p>
        <p class="flex-grow-1 text-right ml-3 bsk-weight-s-bold bsk-text-20px">
          ${{ total }}
        </p>
      </div>
    </div>

    <div class="mt-6">
      <em>* This order will be automatically sent to your email</em>
    </div>

    <div class="mt-6">
      <v-btn color="#443d81" dark block @click="closeBill">Close Bill</v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'BillLayout',
  props: {
    product: {
      type: Array,
      default: () => {
        return []
      },
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    order: {
      get() {
        return this.$store.state.product.order
      },
    },
  },
  methods: {
    closeBill() {
      this.$emit('closeBill')
    },
  },
}
</script>
