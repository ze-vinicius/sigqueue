<template>
  <div>
    <v-card class="mx-auto pa-4" max-width="400">
      <v-card-text>
        <div class="display-1 text--primary justify-center">
          <div>SENHA</div>
          <div>{{ticket.ticketNumber}}</div>
        </div>
        <div>Identificador: {{ticket.id}}</div>
        <div>Id da Fila: {{ticket.queueId}}</div>
        <div>Nome da Fila: {{ticket.queueName}}</div>
        <span></span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from "../../plugins/firebase";

export default {
  props: ["id"],
  data() {
    return {
      ticket: ""
    };
  },
  created() {
    console.log("id" + this.id);
    firebase
      .firestore()
      .collection("ticket")
      .doc(this.id)
      .get()
      .then(snapshot => {
        console.log(snapshot);
        this.ticket = {
          id: snapshot.id,
          ticketNumber: snapshot.data().ticketNumber,
          userName: snapshot.data().userName,
          queueId: snapshot.data().queueId,
          queueName: snapshot.data().queueName
        };
      });
  }
};
</script>

<style>
</style>