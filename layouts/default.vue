<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <nuxt-link to="/" class="navbar-brand">Simple WMS</nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link" exact-active-class="active">Рабочий стол</nuxt-link>
          </li>
          <!-- <li class="nav-item">
            <nuxt-link to="/articles" class="nav-link" exact-active-class="active">Articles</nuxt-link>
          </li> -->
        </ul>

        <ul class="navbar-nav"
          v-if="!$auth.loggedIn">
          <li class="nav-item">
            <nuxt-link to="/user/login" class="nav-link" exact-active-class="active">Вход</nuxt-link>
          </li>
        </ul>

        <ul class="navbar-nav"
          v-if="$auth.loggedIn">
          <li class="nav-item">
              <nuxt-link to="/user/register" class="nav-link" exact-active-class="active">Добавить пользователя</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/user/my-account" class="nav-link" exact-active-class="active">Профиль</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/user/logout" class="nav-link" exact-active-class="active">Выход</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container mt-4">
      <nuxt />
    </div>
  </div>
</template>

