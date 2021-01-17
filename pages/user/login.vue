<template>
  <div>
    <h1>Вход</h1>
    <hr>

    <!-- <div class="alert alert-success"
      v-if="$route.params.registered=='yes'">You have registered successfully</div> -->

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">Логин</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.login }"
              v-model="login">
            <div class="invalid-feedback" v-if="errors && errors.login">
              {{ errors.login.msg }}
            </div>
          </div>

          <div class="form-group">
            <label for="">Пароль</label>
            <input type="password" class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password">
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <div class="alert alert-danger"
            v-if="login_error">{{ login_error }}</div>

          <input type="submit" value="Вход" class="btn btn-primary mr-3">
          <!-- <nuxt-link to="/" class="btn btn-secondary mr-3">Cancel</nuxt-link> -->

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      login_error:null,
      login:null,
      password:null,
      status:false,
    }
  },

  methods:{
    submitForm(){
      this.$auth.loginWith('local', {
          data: {
            login: this.login,
            password: this.password
          }
        })
        .catch( (error) => {
          console.log(error.response)
          if(error.response.data.message){
            this.login_error = error.response.data.message
          }
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        })
    }
  }
}
</script>
