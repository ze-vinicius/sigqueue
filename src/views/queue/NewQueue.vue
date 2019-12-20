<template>
  <v-card max-width="400" class="mx-auto pa-sm-2 pa-md-6">
    <v-card-title class="justify-center">Criar Fila</v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field label="Nome da fila" v-model="queue.queueName"></v-text-field>
        <v-text-field label="Nome do estabelecimento" v-model="queue.localName"></v-text-field>

        <v-checkbox
          v-model="checkLimite"
          :label="checkLimite ? 'Quantidade de senhas limitada' : 'Sem limite de senhas' "
        ></v-checkbox>
        <v-text-field
          label="Limite de Senhas"
          type="number"
          single-line
          :disabled="!checkLimite"
          v-model="queue.limitTicket"
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
              :return-value-sync="queue.start"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="queue.start"
                  label="Inicio"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuInicio"
                v-model="queue.start"
                full-width
                :max="queue.end"
                @click:minute="$refs.menu.save(queue.start)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="11" sm="5">
            <v-menu
              ref="menu"
              v-model="menuEncerramento"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value-sync="queue.end"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="queue.end"
                  label="Encerramento"
                  prepend-icon="mdi-clock-outline"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menuEncerramento"
                v-model="queue.end"
                full-width
                :min="queue.start"
                @click:minute="$refs.menu.save(queue.end)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="queue.date"
                  label="Selecione a Data"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="queue.date" @input="menuDate == false" :min="minDate"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-btn color="success" x-large rounded block @click="newQueue">Criar</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from "../../plugins/firebase";

export default {
  name: "NewQueue",
  data() {
    return {
      valid: true,
      queue: {
        queueName: "",
        localName: "",
        currTicket: 0,
        lastTicket: 0,
        limitTicket: "",
        date: new Date().toISOString().substr(0, 10),
        start: null,
        end: null,
        userId: firebase.auth().currentUser.uid,
        open: ""
      },
      menuDate: false,
      minDate: new Date().toISOString().substr(0, 10),
      menuInicio: false,
      menuEncerramento: false,
      checkLimite: false
    };
  },
  methods: {
    newQueue() {
      let timeNow = new Date().getHours() + ":" + new Date().getMinutes();
      let dateNow = new Date().toISOString().substr(0, 10);
      // console.log(dateNow == this.queue.date);

      this.queue.open =
        timeNow >= this.queue.start &&
        timeNow < this.queue.end &&
        dateNow == this.queue.date
          ? true
          : false;
      firebase
        .firestore()
        .collection("queue")
        .add(this.queue);

      this.$router.replace("/queue/list");
    }
  },
  watch: {
    checkLimite(val) {
      if (!val) this.queue.limiteDeSenhas = "";
    }
  },
  created() {
    console.log(firebase.firestore().collection("queue"));
  }
};
</script>

<style>
</style>