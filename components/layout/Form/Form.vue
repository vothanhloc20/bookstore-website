<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <p class="mb-4 bsk-weight-medium">
          Fullname <span class="bsk-text-red">*</span>
        </p>
        <v-text-field
          v-model="order.name"
          color="#2e2e2e"
          filled
          dense
          hide-details
          prepend-inner-icon="mdi-account"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <p class="mb-4 bsk-weight-medium">
          Phone <span class="bsk-text-red">*</span>
        </p>
        <v-text-field
          v-model="order.phone"
          v-mask="'###########'"
          color="#2e2e2e"
          filled
          dense
          hide-details
          prepend-inner-icon="mdi-phone"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <p class="mb-4 bsk-weight-medium">
          Email <span class="bsk-text-red">*</span>
        </p>
        <v-text-field
          v-model="order.email"
          color="#2e2e2e"
          filled
          dense
          hide-details
          prepend-inner-icon="mdi-email"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <p class="mb-4 bsk-weight-medium">
          Address <span class="bsk-text-red">*</span>
        </p>
        <v-text-field
          v-model="order.address"
          color="#2e2e2e"
          filled
          dense
          hide-details
          prepend-inner-icon="mdi-map-marker"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <p class="mb-4 bsk-weight-medium">Note</p>
        <v-textarea
          v-model="order.note"
          color="#2e2e2e"
          filled
          dense
          auto-grow
          prepend-inner-icon="mdi-note-multiple"
        ></v-textarea>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  computed: {
    order: {
      get() {
        return this.$store.state.product.order
      },
    },
  },
}
</script>
