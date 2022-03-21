<template>
  <div class="footer-layout">
    <v-footer color="#f9f9f9">
      <div class="bsk-container">
        <v-row class="ma-0">
          <v-col class="fl-column-1" cols="12" md="4">
            <h1 class="fl-title bsk-text-purple mb-5">BOOKSKY</h1>
            <p class="bsk-text-gray bsk-weight-medium text-justify mb-5">
              It is a long established fact that a reader will be distracted by
              the readable content It is a long established fact that a reader
              will be distracted by the readable content.
            </p>
            <div class="fl-icon">
              <a>
                <i class="lab la-facebook-f"></i>
              </a>
              <a>
                <i class="lab la-instagram"></i>
              </a>
              <a>
                <i class="lab la-google-plus-g"></i>
              </a>
              <a>
                <i class="lab la-twitter"></i>
              </a>
            </div>
          </v-col>
          <v-col cols="12" md="2">
            <p class="bsk-text-purple bsk-weight-s-bold mb-5">USEFUL LINKS</p>
            <Menu :items="links" :flex="false" :text-center="false" />
          </v-col>
          <v-col cols="12" md="2">
            <p class="bsk-text-purple bsk-weight-s-bold mb-5">TIMING</p>
            <Menu :items="timing" :flex="false" :text-center="false" />
          </v-col>
          <v-col cols="12" md="4">
            <p class="bsk-text-purple bsk-weight-s-bold mb-5">STORE INFO</p>
            <Menu :items="info" :flex="false" :text-center="false" />
          </v-col>
        </v-row>
        <v-row class="ma-0 fl-row-2">
          <v-col cols="12" md="6" class="d-flex align-center">
            <div>
              Copyright
              <span>&copy; {{ new Date().getFullYear() }}</span>
              <span class="bsk-weight-bold bsk-text-purple">Booksky</span>. All
              rights reserved.
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-end">
            <img
              :src="require('~/assets/images/credit-cards.png')"
              alt="Credit Cards"
              max-width="100%"
              height="auto"
            />
          </v-col>
        </v-row>
      </div>
    </v-footer>
  </div>
</template>

<script>
import Menu from '~/components/layout/Menu/Menu.vue'

export default {
  name: 'FooterLayout',
  components: {
    Menu,
  },
  data() {
    return {
      links: [
        {
          title: 'Best Collection',
        },
        {
          title: 'Store Location',
        },
        {
          title: 'Support Policy',
        },
        {
          title: 'FAQs',
        },
        {
          title: 'Store Orders',
        },
        {
          title: 'Best Sale',
        },
      ],
      timing: [
        {
          title: 'Mon - Thu: 9am - 9pm',
        },
        {
          title: 'Fri: 9am - 6pm',
        },
        {
          title: 'Sat: 9am - 5pm',
        },
        {
          title: 'Sun: 1pm - 6pm',
        },
      ],
      info: [
        {
          title:
            'Thao Dien Street, District 2, Thao Dien Ward, Ho Chi Minh City, Vietnam',
          icon: 'las la-map-marker',
        },
        {
          title: 'Call Us: 123-456-7898',
          icon: 'las la-phone-volume',
        },
        {
          title: 'Email Us: info@booksky.com',
          icon: 'las la-envelope',
        },
        {
          title: 'Fax: 012345678',
          icon: 'las la-fax',
        },
      ],
    }
  },
}
</script>
