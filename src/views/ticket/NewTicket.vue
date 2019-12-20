<template>
  <v-card max-width="400" class="mx-auto pa-sm-2 pa-md-6">
    <v-card-title class="justify-center">Gerar Senha</v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-text>
        <v-text-field
          label="Seu nome completo"
          v-model="ticket.userName"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          label="Nome da fila"
          v-model="ticket.queueName"
          :rules="queueNameRules"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" rounded block @click="newTicket">Gerar</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import firebase from "../../plugins/firebase";

export default {
  name: "NewTicket",
  data() {
    return {
      valid: true,
      ticket: {
        userName: "",
        queueName: "",
        queueId: "",
        ticketNumber: ""
      },
      nameRules: [v => !!v || "Você precisa nos informar o seu nome completo"],
      queueNameRules: [v => !!v || "Você precisa informar o nome da fila"],
      queuesRef: firebase.firestore().collection("queue")
    };
  },
  methods: {
    getQueue() {
      let queueName = this.ticket.queueName;
      // let queueId = "";

      this.queuesRef.get().then(snapshot => {
        // console.log(queueName);
        this.queueId = "";
        snapshot.forEach(doc => {
          if (doc.data().queueName.toLowerCase() == queueName.toLowerCase()) {
            this.ticket.queueId = doc.id;
            this.ticket.ticketNumber = ++doc.data().lastTicket;
            if (
              doc.data().open &&
              doc.data().limitTicket &&
              doc.data().lastTicket < doc.data().limitTicket
            ) {
              firebase
                .firestore()
                .collection("ticket")
                .add(this.ticket);
              firebase
                .firestore()
                .collection("queue")
                .doc(doc.id)
                .update({ lastTicket: ++doc.data().lastTicket });

              // this.$router.replace("/ticket/" + this.ticket.id);
              console.log(this.ticket);
            } else {
              console.log("Não é possível entrar na fila");
            }
          }
        });
      });

      // console.log(queueId);
    },
    async newTicket() {
      await this.getQueue();

      console.log(this.queueId);

      // let queue = "";
    }
  },
  created() {
    console.log("Gerar Senha");
  }
};
</script>

<style>
</style>