<template>
  <div>
    <h1>Профиль</h1>

    <hr>

    <div class="card">
      <div class="card-body">
        <h4>{{ this.$auth.user.fio }}</h4>
        <div class="mb-5"><strong>Логин:</strong> {{ this.$auth.user.login }}</div>
        <nuxt-link to="/user/logout" class="btn btn-danger">Выход</nuxt-link>
      </div>
    </div>


  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
