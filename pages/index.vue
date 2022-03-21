<template>
  <div></div>
</template>

<script>
export default {
  name: 'IndexPage',
  middleware({ route, redirect }) {
    if (route.fullPath === '/') {
      return redirect('/shop')
    }
  },
}
</script>
