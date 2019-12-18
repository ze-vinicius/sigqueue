<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-title>Criar Fila</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="Nome"></v-text-field>
        <v-text-field label="Limite de Senhas" type="number" single-line></v-text-field>
        <!-- <v-row justify="space-around" align="center">
          <v-col style="width: 290px; flex: 0 1 auto;">
            <h2>Inicio</h2>
            <v-time-picker v-model="start" :max="end"></v-time-picker>
          </v-col>
          <v-col style="width: 290px; flex: 0 1 auto;">
            <h2>Encerramento</h2>
            <v-time-picker v-model="end" :min="start"></v-time-picker>
          </v-col>
        </v-row>-->
        <v-row justify="space-around" align="center">
          <v-col cols="11" sm="5">
            <v-menu
              ref="menu"
              v-model="menuInicio"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value-sync="start"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="start"
                  label="Inicio"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuInicio"
                v-model="start"
                full-width
                :max="end"
                @click:minute="$refs.menu.save(start)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="11" sm="5">
            <v-menu
              ref="menu"
              v-model="menuEncerramento"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value-sync="end"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="end"
                  label="Encerramento"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuEncerramento"
                v-model="end"
                full-width
                :min="start"
                @click:minute="$refs.menu.save(end)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-btn color="success" x-large>Criar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CriarFila",
  data() {
    return {
      start: null,
      end: null,
      menuInicio: false,
      menuEncerramento: false
    };
  }
};
</script>

<style>
</style>