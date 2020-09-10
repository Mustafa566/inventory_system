<template>
  <v-app id="app">
    <v-navigation-drawer v-model="drawer" app v-if="isLoggedIn">
      <v-list dense>
        <router-link to="Home" class="removeUnderline">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="Accounts" class="removeUnderline" v-if="isAdmin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Manage Accounts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="ViewProducts" class="removeUnderline" v-if="isAdmin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>View Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="AddProducts" class="removeUnderline" v-if="isAdmin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Add Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="Profile" class="removeUnderline">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <v-list-item link @click="logout" v-if="isLoggedIn">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer =! drawer" v-if="isLoggedIn"></v-app-bar-nav-icon>
      <v-toolbar-title>Interoute</v-toolbar-title>
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
/*eslint-disable-line*/import { db } from './Database';
import firebase from 'firebase';
export default {
    data() {
        return {
          drawer: false,
          isLoggedIn: false,
          isAdmin: false,
          haveAccess: false,
          currentUser: ''
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
    firestore: {
      Profile: db.collection('Profile')
    },
    created() {
      firebase.auth().onAuthStateChanged(currentUser => {
        if (currentUser) {
          this.currentUser = firebase.auth().currentUser.email;
          this.isLoggedIn = true;
          if(this.currentUser == 'mustafa@gmail.com') {
            this.isAdmin = true
          }
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

.removeUnderline {
  text-decoration: none;
}

/* LOGIN */
.card {
  width: 80%;
  background-color: white;
  margin: 5% auto;
  border-radius: 15px;
  box-shadow: 1px 1px 40px 0px black;
}

.svg {
  width: 24px; 
  height: 24px;
  margin-right: 5px;
}

.googleIcon {
  width: 30px; 
  height: 30px;
}

.rightSide {
  border-left: 2px solid black;
}
</style>