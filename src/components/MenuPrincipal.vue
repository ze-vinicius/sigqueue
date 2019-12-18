<template>
  <div>
    <v-navigation-drawer v-model="drawer" app right :clipped="clipped">
      <v-list dense nav>
        <!-- <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>-->

        <v-list-group
          :prepend-icon="item.icon"
          value="true"
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </template>

          <v-list-item v-for="subitem in item.items" :key="subitem.title" link>
            <v-list-item-title v-text="subitem.title"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar fixed app :clipped-right="clipped">
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        color="deep-purple"
        dark
        dense
        clipped-right
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "MenuPrincipal",
  data() {
    return {
      drawer: false,
      clipped: false,
      title: "Sigqueue",
      items: [
        { title: "Home", icon: "mdi-home", items: {} },
        {
          title: "Filas",
          icon: "",
          items: [
            { title: "Criar Fila", icon: "" },
            { title: "Minhas Filas", icon: "" }
          ]
        },
        {
          title: "Senhas",
          icon: "mdi-ticket",
          items: [
            { title: "Gerar Senha", icon: "" },
            { title: "Minhas Senhas", icon: "" }
          ]
        }
      ],
      senhaItems: [{ title: "Gerar Senha" }],
      right: null
    };
  }
};
</script>

<style>
</style>