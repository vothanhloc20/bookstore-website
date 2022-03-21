<template>
  <div class="menu-layout">
    <ul :class="`${flex ? 'd-flex justify-center' : ''}`">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="`~${textCenter ? 'text-center' : ''} ${
          index < items.length - 1 && flex ? 'mr-8' : 'mb-4'
        }`"
      >
        <a
          :href="item.link"
          :class="`bsk-weight-bold ${item.link === path ? 'active' : ''}`"
        >
          <i :class="item.icon" />
          {{ item.title }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'MenuLayout',
  props: {
    items: {
      type: Array,
      default: () => {
        return []
      },
    },
    textCenter: {
      type: Boolean,
      default: true,
    },
    flex: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    path() {
      return this.$route.path
    },
  },
}
</script>
