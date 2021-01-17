<template>
  <div>
    <h1>Добавление пользователя</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <label for="">ФИО</label>
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.fio }"
              v-model="fio">
            <div class="invalid-feedback" v-if="errors && errors.fio">
              {{ errors.fio.msg }}
            </div>
          </div>

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

          <input type="submit" value="Сохранить" class="btn btn-primary mr-3">
          <nuxt-link to="/" class="btn btn-secondary mr-3">Отмена</nuxt-link>

        </form>

      <div class="alert alert-success"
      v-if="mess">пользователь добавлен</div> 

      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  // auth: 'guest',
  data(){
    return{
      errors:null,
      fio:null,
      login:null,
      password:null,
      status:false,
      mess:null
    }
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/users/register', {
          fio: this.fio,
          login: this.login,
          password: this.password,
        })
        .then((response) => {
          console.log(response)
          this.mess = 'success'
          // if(response.data._id){
          //   // this.$router.push({ name:'user-login', params:{ registered:'yes' } })
          //   this.mess = 'success'
          //   // log in if successfully registered
          //   // this.$auth.loginWith('local', {
          //   //     data: {
          //   //       login: this.login,
          //   //       password: this.password
          //   //     }
          //   //   })
          //     .catch( (error) => {
          //       console.log(error)
          //     })
          // }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>
