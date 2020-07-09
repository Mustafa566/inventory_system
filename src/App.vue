<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app v-if="isLoggedIn">
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout" v-if="isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from 'firebase';
export default {
    data() {
        return {
          drawer: null,
          isLoggedIn: false,
          user: ''
        }
    },
    methods: {
      logout() {
        firebase.auth().signOut().then(() => {
          this.$router.push('/Login')
          location.reload();
        })
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
          this.user = firebase.auth().currentUser.email;
          this.isLoggedIn = true;
          console.log(this.user);
          console.log(this.isLoggedIn);
        } else {
          console.log('no user'); 
        }
      });
    }
  }
</script>

<style>
.centerAll {
  margin: 0 auto;
  top: 50%;
}
</style>