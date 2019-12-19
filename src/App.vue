<template>
  <v-app>
    <div id="MenuPrincipal">
      <v-navigation-drawer v-model="drawer" app right :clipped="clipped">
        <template v-slot:prepend v-if="usuarioAtual">
          <v-list-item>
            <v-list-item-icon>
              <v-icon large>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <!-- <v-list-item-title>{{usuarioAtual.email}}</v-list-item-title> -->
              <v-list-item-subtitle>{{usuarioAtual.email}}</v-list-item-subtitle>
              <v-list-item-subtitle>Logado</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <v-divider></v-divider>
        <v-list dense nav>
          <!-- <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
          </v-list-item>-->
          <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
            <v-list-item-icon>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item>

          <v-list-group
            :prepend-icon="item.icon"
            value="true"
            v-for="item in groupItems"
            :key="item.title"
            v-model="item.active"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </template>

            <v-list-item
              v-for="subitem in item.items"
              :key="subitem.title"
              link
              :to="subitem.to"
              flat
            >
              <v-list-item-title v-text="subitem.title"></v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item>
            <!-- <v-btn v-model="txtBtnLogin" @click="txtBtnLogin ? sair() : entrar()">{{txtBtnLogin}}</v-btn> -->
            <!-- <v-btn
              v-model="value"
              @click.stop="usuarioAtual ? sair() : entrar()"
            >{{usuarioAtual? "Sair" : "Entrar"}}</v-btn>-->
            <v-btn v-if="usuarioAtual" block rounded color="red" @click="sair">Sair</v-btn>
            <v-btn v-else block rounded color="primary" to="/user/entrar">Entrar</v-btn>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar fixed app :clipped-right="clipped">
        <v-toolbar-title>
          <v-btn text to="/"> <v-img :src="require('./assets/logo.png' ) " class="my-3" contain height="60" width='60' ></v-img></v-btn>
        </v-toolbar-title>
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
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
// import MenuPrincipal from "./components/MenuPrincipal";
import firebase from "firebase";
export default {
  name: "App",
  components: {
    // MenuPrincipal
  },
  data() {
    return {
      drawer: false,
      clipped: false,
      title: "Sigqueue",
      items: [{ title: "Home", icon: "mdi-home", items: {} }],
      groupItems: [
        {
          title: "Fila",
          icon: "",
          items: [
            { title: "Criar Fila", icon: "", to: "/fila/criar" },
            { title: "Minhas Filas", icon: "", to: "/fila/lista" }
          ],
          auth: firebase.auth().currentUser || true
        },
        {
          title: "Senhas",
          icon: "mdi-ticket",
          items: [
            { title: "Gerar Senha", icon: "", to: "/senha/gerar" },
            { title: "Minhas Senhas", icon: "", to: "" }
          ],
          auth: firebase.auth().currentUser ^ true
        }
      ],
      usuarioAtual: firebase.auth().currentUser
    };
  },
  methods: {
    sair() {
      console.log("saindo");
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/").catch(err => {
            console.log(err.message);
          });
        });
    },
    entrar() {
      this.$router.replace("/user/entrar").catch(err => {
        console.log(err.message);
      });
    }
  },
  computed: {}
};
</script>
