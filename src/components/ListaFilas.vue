<template>
  <v-container>
    <v-row dense>
      <v-col v-for="fila in filas" :key="fila.nome" cols="12">
        <v-card max-width="600" class="mx-auto">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-title class="headline">{{fila.nome}}</v-card-title>
            <v-spacer></v-spacer>
            <div class="text-center ma-4">
              <h2>{{fila.senha}}</h2>
            </div>
            <v-btn depressed class="ma-4" color="primary" @click="fila.senha++">Chamar Senha</v-btn>
            <v-card-actions>
              <v-btn icon @click="fila.show = !fila.show">
                <v-icon>{{ fila.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
          </div>

          <v-expand-transition>
            <div v-show="fila.show">
              <v-card-text>
                <v-row>
                  <v-col>Senha atual: {{fila.senha}}</v-col>
                  <v-col v-if="fila.senhaLimite">Senha limite: {{fila.senhaLimite}}</v-col>
                </v-row>
                <v-row>
                  <v-col>Inicio: {{fila.horarioInicio}}</v-col>
                  <v-col>Encerramento:{{fila.horarioEncerramento}}</v-col>
                </v-row>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <div v-for="item in filas" :key="item.nome">{{item.nome}}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Filas",
  data() {
    return {
      filas: firebase
        .firestore()
        .collection("filas")
        .where("usuario", "==", firebase.auth().currentUser.uid)
        .get()
        .then(snapshot => {
          let array = [];
          if (snapshot.empty) {
            console.log("Não há filas");
            // return array;
          } else {
            snapshot.forEach(doc => {
              console.log(doc.id, "=>", doc.data());
              array.push(doc.data());
            });
            console.log(array);
            return array;
          }
        })
    };
  },
  firestore() {
    return {
      filas: db.collection("filas").orderBy("start")
    };
  },
  methods: {
    chamarFila(fila) {
      fila.senha++;
    }
  }
};
</script>

<style>
</style>