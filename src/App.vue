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
        <router-link to="Accounts" class="removeUnderline" v-if="roles.isAdmin">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-account-multiple-plus</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Manage Accounts</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="ViewProducts" class="removeUnderline" v-if="roles.isAdmin || noAccess">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-cart</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>View Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="AddProducts" class="removeUnderline" v-if="roles.isAdmin || noAccess">
          <v-list-item link>
            <v-list-item-action>
              <v-icon>mdi-plus-circle</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Add Products</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="Profile" class="removeUnderline" v-if="noAccount">
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
      <div v-for="Profiles in Profile" :key="Profiles.id" class="w-100">
          <input 
          v-if="currentUser == Profiles.email && currentId == Profiles.userId" 
          id="role"
          v-model="Profiles.role"
          disabled>
      </div>
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
          Profiles: [],
          roles: {
            isAdmin: false
          },
          noAccess: false,
          noAccount: true,
          drawer: false,
          isLoggedIn: false,
          currentUser: '',
          currentId: '',
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
        if(currentUser) {
          this.currentUser = firebase.auth().currentUser.email;
          this.currentId = firebase.auth().currentUser.uid;
          this.isLoggedIn = true;
          // Check if it is Admin
          var documentReference = db.collection('Profile').doc(this.currentId);
          documentReference.get().then((documentSnapshot) => {
            // check and do something with the data here.
            if (documentSnapshot.exists) {
              // do something with the data
              var data = documentSnapshot.data();
              if(data.role == 'Admin') {
                console.log(data.role)
                this.roles.isAdmin = true
              }
            } else {
              console.log('document not found');
            }
          });

          // Check if user has access
          documentReference.get().then((documentSnapshot) => {
            // check and do something with the data here.
            if (documentSnapshot.exists) {
              // do something with the data
              var data = documentSnapshot.data();
              if(data.haveAccess == true) {
                this.noAccess = true
              }
            } else {
              console.log('document not found');
            }
          });

          // Check if user has not a profile
          documentReference.get().then((documentSnapshot) => {
            // check and do something with the data here.
            if (documentSnapshot.exists) {
              // do something with the data
              var data = documentSnapshot.data();
              console.log(data)
              this.noAccount = false
            } else {
              console.log('document not found');
            }
          });          
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

.w-100 {
  right: 5px;
  position: absolute;
}

#role {
  color: white;
  font-size: large;
  width: 160px;
}

.users {
  background-image: url('~@/assets/users.png');
}
</style>