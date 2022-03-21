<template>
  <div></div>
</template>

<script>
export default {
  name: 'AboutPage',
  middleware({ route, redirect }) {
    if (route.fullPath === '/about-us') {
      return redirect('/shop')
    }
  },
}
</script>
