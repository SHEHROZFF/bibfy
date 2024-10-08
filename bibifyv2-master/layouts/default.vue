<template>
  <v-app dark :hidden="hidden">
    <Nuxt />
  </v-app>
</template>

<script>
export default {
  mounted() {
      this.$nextTick(() => {
          this.hidden = false
      })
  },

  data () {
    return {
        hidden: true
    }
  }
}
</script>
