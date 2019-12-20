<template>
  <v-card max-width="400" class="mx-auto pa-sm-2 pa-md-6">
    <v-card-title class="justify-center">Entrar no Sistema</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" label="e-mail" type="e-mail" :rules="emailRules" required></v-text-field>
        <v-text-field v-model="senha" label="Senha" type="password" :rules="senhaRules" required></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn class="primary" rounded block large @click="entrar">Login</v-btn>
    </v-card-actions>
    <br />
    <span>
      Não possui uma conta? clique em
      <router-link to="/user/registrar">registrar</router-link>
    </span>
  </v-card>
</template>

<script>
import firebase from "../../plugins/firebase";

export default {
  name: "UserLogin",
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [v => !!v || "O e-mail precisa ser informado"],
      senha: "",
      senhaRules: [v => !!v || "A senha precisa ser informada"]
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