<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>Entrar</v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Nome"></v-text-field>
        <v-btn color="success">Entrar</v-btn>
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