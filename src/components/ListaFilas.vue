<template>
  <v-container>
    <v-row dense>
      <v-col v-for="fila in filas" :key="fila.name" cols="12">
        <v-card max-width="600" class="mx-auto">
          <div class="d-flex flex-no-wrap justify-space-between">
            <v-card-title class="headline">{{fila.name}}</v-card-title>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Filas",
  data() {
    return {
      filas: [
        {
          name: "Fila para Pizza",
          senha: "3",
          ativa: true,
          show: false
        },
        {
          name: "Fila para Sorvete",
          senha: "1",
          senhaLimite: 50,
          horarioInicio: "08:30",
          horarioEncerramento: "12:00",
          ativa: false,
          show: false
        }
      ]
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