<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>Gerar Senha</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Seu nome completo"></v-text-field>
        <v-text-field label="Nome da fila"></v-text-field>
        <v-btn color="success">Gerar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GerarSenha",
  created() {
    console.log("Gerar Senha");
  }
};
</script>

<style>
</style>