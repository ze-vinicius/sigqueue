<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-title class="display-1 text--primary">Entrar</v-card-title>
    <v-card-text>
      <v-text-field v-model="email" label="e-mail" type="e-mail" required></v-text-field>
      <v-text-field v-model="senha" label="Senha" type="password" required></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="entrar" class="primary" large>Criar</v-btn>
      <v-spacer></v-spacer>
      <span>
        Não possui uma conta? clique em
        <router-link to="/user/criar">registrar-se</router-link>
      </span>
    </v-card-actions>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Entrar",
  data() {
    return {
      email: "",
      senha: ""
    };
  },
  methods: {
    entrar() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.senha)
        .then(user => {
          console.log(user);
          this.$router.replace("/");
          alert(`Bem Vindo, ${this.email}`);
        })
        .catch(err => {
          alert("Não foi possível entrar na conta do usuário" + err.message);
        });
    }
  }
};
</script>

<style>
</style>