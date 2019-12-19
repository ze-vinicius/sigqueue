<template>
  <v-card max-width="600" class="mx-auto">
    <v-card-title>Criar Fila</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field label="Nome" v-model="fila.nome"></v-text-field>

        <v-checkbox
          v-model="checkLimite"
          :label="checkLimite ? 'Quantidade de senhas limitada' : 'Sem limite de senhas' "
        ></v-checkbox>
        <v-text-field
          label="Limite de Senhas"
          type="number"
          single-line
          :disabled="!checkLimite"
          v-model="fila.limiteDeSenhas"
          :required="!checkLimite"
        ></v-text-field>
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
              :return-value-sync="fila.start"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fila.start"
                  label="Inicio"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuInicio"
                v-model="fila.start"
                full-width
                :max="fila.end"
                @click:minute="$refs.menu.save(fila.start)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="11" sm="5">
            <v-menu
              ref="menu"
              v-model="menuEncerramento"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value-sync="fila.end"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fila.end"
                  label="Encerramento"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuEncerramento"
                v-model="fila.end"
                full-width
                :min="fila.start"
                @click:minute="$refs.menu.save(fila.end)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-btn color="success" x-large @click="criarFila">Criar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "firebase";

export default {
  name: "CriarFila",
  data() {
    return {
      fila: {
        nome: "",
        limiteDeSenhas: "",
        start: null,
        end: null,
        usuario: firebase.auth().currentUser.uid
      },
      menuInicio: false,
      menuEncerramento: false,
      checkLimite: false
    };
  },
  methods: {
    criarFila() {
      firebase
        .firestore()
        .collection("filas")
        .add(this.fila);
    }
  },
  created() {
    console.log(firebase.firestore().collection("filas"));
  }
};
</script>

<style>
</style>