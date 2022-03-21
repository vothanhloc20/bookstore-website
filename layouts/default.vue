<template>
  <v-app id="main-wrap" :class="{ 'page-exit': !play }">
    <Header />
    <v-main>
      <div>
        <div class="bsk-container">
          <div class="px-4 pt-8 pb-6">
            <Menu :items="menu" />
          </div>
        </div>
      </div>
      <div class="bsk-container">
        <Nuxt />
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Header from '~/components/layout/Header/Header.vue'
import Footer from '~/components/layout/Footer/Footer.vue'
import Menu from '~/components/layout/Menu/Menu.vue'
import MenuData from '~/static/data/menu.json'

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer,
    Menu,
  },
  data() {
    return {
      menu: MenuData.menu,
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
