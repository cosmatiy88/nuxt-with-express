<template>
  <div>
    <h1>Выход</h1>
    <hr>

    <p>...</p>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  async asyncData(context){
    await context.$auth.logout()
  },
}
</script>
