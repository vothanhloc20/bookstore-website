<template>
  <v-app id="main-wrap" :class="{ 'page-exit': !play }">
    <Navigation ref="navigation" :menu="menu" />
    <v-main style="background-color: #f5f8fa">
      <div>
        <Nuxt />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Navigation from '~/components/layout/Navigation/Navigation.vue'
export default {
  name: 'AdminLayout',
  components: {
    Navigation,
  },
  data() {
    return {
      menu: [
        {
          icon: 'las la-chalkboard-teacher',
          title: 'Dashboard',
          path: '/admin/dashboard',
        },
        {
          icon: 'las la-archive',
          title: 'Product',
          path: '/admin/products',
        },
        {
          icon: 'las la-receipt',
          title: 'Bill',
          path: '/admin/bill',
        },
        {
          icon: 'las la-user-friends',
          title: 'Staff',
          path: '/admin/staff',
        },
        {
          icon: 'las la-tools',
          title: 'Settings',
          path: '/admin/settings',
        },
        {
          icon: 'las la-sign-out-alt',
          title: 'Logout',
          path: '',
        },
      ],
      play: true,
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$nuxt.$loading.finish()
        this.play = false
      }, 500)
      this.$nuxt.$loading.start()
    })
    const preloader = document.getElementById('preloader')
    if (preloader !== null || undefined) {
      preloader.remove()
    }
  },
  created() {
    this.$nuxt.$on('handleNavigation', () => {
      this.handleNavigation()
    })
  },
  methods: {
    handleNavigation() {
      this.$refs.navigation.controlNavigation()
    },
  },
}
</script>

<style lang="scss" scoped>
#main-wrap {
  opacity: 0;

  &.page-exit {
    opacity: 1;
    -webkit-transition: opacity 400ms;
    transition: opacity 400ms;
  }
}
</style>
