<template>
  <v-card max-width="400" class="mx-auto pa-sm-2 pa-md-6">
    <v-card-title class="justify-center">
      <span>Crie sua conta grátis</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="email" label="e-mail" type="e-mail" :rules="emailRules" required></v-text-field>
        <v-text-field v-model="senha" label="Senha" type="password" :rules="senhaRules" required></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-btn class="primary" rounded block large @click="registrarUsuario">Registrar</v-btn>
    </v-card-actions>
    <br />
    <span>
      Já possui uma conta? clique em
      <router-link to="/user/entrar">entrar</router-link>
    </span>
  </v-card>
</template>

<script>
import firebase from "../../plugins/firebase";

export default {
  name: "UserJoin",
  data() {
    return {
      valid: true,
      email: "",
      emailRules: [
        v => !!v || "Você precisa digitar o e-mail",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      senha: "",
      senhaRules: [
        v => !!v || "Você precisa informar uma senha!",
        v =>
          (v && v.length >= 6) || "A senha precisa ter no mínimo 6 caracteres"
      ]
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