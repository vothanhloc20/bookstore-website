<template>
  <div class="navigation-layout">
    <v-navigation-drawer
      v-model="drawer"
      app
      floating
      clipped
      :permanent="permanent"
      width="400"
      color="#f3f3fc"
    >
      <template #prepend>
        <v-app-bar elevation="0" dark color="#443d81">
          <p class="bsk-text-28px bsk-weight-bold nl-title">BOOKSKY</p>
          <v-spacer v-if="$vuetify.breakpoint.mdAndDown" />
          <img
            v-if="$vuetify.breakpoint.mdAndDown"
            :src="require('~/assets/images/hamburger.svg')"
            width="28"
            height="28"
            alt="Icon"
            style="cursor: pointer; max-width: 100%; vertical-align: middle"
            @click="controlNavigation"
          />
        </v-app-bar>
      </template>
      <div class="navigation-content">
        <div class="nc-card-infor mb-12 text-center">
          <v-avatar size="60">
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <p class="my-3 bsk-weight-s-bold bsk-text-22px">Welcome back</p>
          <p>booksky@admin.com</p>
        </div>
        <ul>
          <li
            v-for="(item, index) in menu"
            :key="index"
            :class="`${item.path === path ? 'active' : ''}`"
            @click="gotoPage(item.path)"
          >
            <p>
              <i :class="item.icon" />
              {{ item.title }}
            </p>
          </li>
        </ul>
      </div>
      <template #append>
        <v-footer color="#443d81" dark>
          <v-row>
            <v-col cols="12" class="d-flex align-center">
              <div>
                Copyright
                <span>&copy; {{ new Date().getFullYear() }}</span>
                <span class="bsk-weight-bold">Booksky</span>. All rights
                reserved.
              </div>
            </v-col>
          </v-row>
        </v-footer>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'NavigationLayout',
  props: {
    menu: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      drawer: true,
    }
  },
  computed: {
    permanent() {
      return this.$vuetify.breakpoint.lgAndUp
    },
    path() {
      return this.$route.path
    },
  },
  methods: {
    controlNavigation() {
      this.drawer = !this.drawer
    },
    gotoPage(path) {
      if (path === '/admin/products') {
        window.location.href = '/admin/products'
      } else {
        Swal.fire({
          title: 'This feature is in development',
          text: 'We are currently developing this feature.',
          cancelButtonColor: '#f85358',
          imageUrl: '/develope.svg',
          imageWidth: 100,
          imageHeight: 100,
          padding: '2em',
          allowOutsideClick: false,
        })
      }
    },
  },
}
</script>
