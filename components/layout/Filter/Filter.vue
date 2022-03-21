<template>
  <div class="filter-layout">
    <v-expansion-panels v-model="panel" accordion multiple flat>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-0 bsk-weight-bold">
          <span class="bsk-text-purple">CATEGORY</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-autocomplete
            v-model="category"
            :items="categories"
            filled
            chips
            color="#443D81"
            item-color="#443d81"
            small-chips
            single-line
            multiple
            dense
            clearable
            hide-details
          ></v-autocomplete>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-0 bsk-weight-bold">
          <span class="bsk-text-purple">AUTHOR</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-autocomplete
            v-model="author"
            :items="authors"
            filled
            chips
            color="#443D81"
            item-color="#443d81"
            small-chips
            single-line
            multiple
            dense
            clearable
            hide-details
          ></v-autocomplete>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-0 bsk-weight-bold">
          <span class="bsk-text-purple">PRICE</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-range-slider
            v-model="price"
            thumb-label="always"
            color="#443D81"
            track-color="#443D81"
            max="100"
            min="10"
            hide-details=""
          ></v-range-slider>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="px-0 bsk-weight-bold">
          <span class="bsk-text-purple">RATING</span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-checkbox
            v-for="n in 5"
            :key="n"
            v-model="rating"
            :value="`${n - 1} ${n - 1 >= 2 ? 'stars' : 'star'}`"
            hide-details
            :ripple="false"
            color="#443D81"
          >
            <template #label>
              <v-rating
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                background-color="#443d81"
                color="#443d81"
                readonly
                length="5"
                size="16"
                :value="n"
              ></v-rating>
            </template>
          </v-checkbox>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: 'FilterLayout',
  props: {
    authors: {
      type: Array,
      default: () => {
        return []
      },
    },
    categories: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      panel: [0, 1, 2, 3],
      category: [],
      author: [],
      rating: null,
      price: [10, 100],
    }
  },
}
</script>
