<template>
  <div>
      <h1 @click="hello">Homepage</h1>
  </div>
</template>

<script>
export default {
    computed: {
        hello() {
            var user = this.$store.state.email
            return user
        }
    }
}
</script>
