<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-title class="display-1 text--primary">Registrar-se</v-card-title>
    <v-card-text>
      <v-text-field v-model="email" label="e-mail" type="e-mail" required></v-text-field>
      <v-text-field v-model="senha" label="Senha" type="password" required></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="registrarUsuario" class="primary" large>Registrar</v-btn>
      <v-spacer></v-spacer>
      <span>
        Já possui uma conta? clique em
        <router-link to="/user/entrar">entrar</router-link>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "CriarUsuario",
  data() {
    return {
      email: "",
      senha: ""
    };
  },
  methods: {
    registrarUsuario() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.senha)
        .then(user => {
          console.log(user);
          this.$router.replace("/");
        })
        .catch(err => {
          alert(err.message);
        });
    }
  }
};
</script>

<style>
</style>