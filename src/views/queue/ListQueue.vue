<template>
  <v-container>
    <v-row dense>
      <v-card class="mx-auto" v-if="queues.empty">
        <v-card-title class="justify-content">Você não possui filas criadas</v-card-title>
        <v-card-text>Que tal criar uma nova?</v-card-text>
        <v-card-actions>
          <v-btn block rounded color="#cccc" to="/queue/new">Nova fila</v-btn>
        </v-card-actions>
      </v-card>
      <v-col v-for="queue in queues" :key="queue.key" cols="12">
        <v-card max-width="600" class="mx-auto">
          <div class="d-flex justify-space-between">
            <div>
              <v-card-title>{{queue.queueName}}</v-card-title>
              <v-card-subtitle>{{queue.localName}}</v-card-subtitle>
            </div>

            <v-spacer></v-spacer>
            <div class="text-center ma-4">
              <h2>{{queue.currTicket}}</h2>
            </div>
            <v-btn
              depressed
              class="ma-4"
              color="primary"
              @click="nextTicket(queue)"
              rounded
              :disabled="!queue.open"
            >Próxima Senha</v-btn>
            <v-card-actions>
              <v-btn icon @click="queue.show = !queue.show">
                <v-icon>{{ queue.show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
          </div>

          <v-expand-transition>
            <div v-show="queue.show">
              <v-card-text>
                <v-row>
                  <v-col>Senha atual: {{queue.currTicket}}</v-col>
                  <v-col v-if="queue.limitTicket">Senha limite: {{queue.limitTicket}}</v-col>
                </v-row>
                <v-row>
                  <v-col>Inicio: {{queue.start}}</v-col>
                  <v-col>Encerramento:{{queue.end}}</v-col>
                </v-row>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
        <!-- <div v-for="item in queues" :key="item.nome">{{item.nome}}</div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "../../plugins/firebase";

export default {
  name: "ListQueue",
  data() {
    return {
      queues: [],
      queuesRef: firebase.firestore().collection("queue")
    };
  },
  created() {
    this.queuesRef
      .where("userId", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        this.queues = [];
        snapshot.forEach(doc => {
          this.queues.push({
            key: doc.id,
            queueName: doc.data().queueName,
            localName: doc.data().localName,
            currTicket: doc.data().currTicket,
            limitTicket: doc.data().limitTicket,
            start: doc.data().start,
            end: doc.data().end,
            userId: doc.data().userId,
            show: false
          });
        });
      });
  },
  methods: {
    nextTicket(queue) {
      if (!queue.limitTicket || queue.limitTicket > queue.currTicket) {
        let nextTicket = ++queue.currTicket;
        firebase
          .firestore()
          .collection("queue")
          .doc(queue.key)
          .update({ currTicket: nextTicket });
      } else {
        console.log("foda né");
      }
    }
  }
};
</script>

<style>
</style>