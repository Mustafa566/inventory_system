<template>
  <div>
      <h1>Homepage</h1>
      <router-link to="Login"><v-btn v-if="this.noAuth">Go to login page</v-btn></router-link>
  </div>
</template>

<script>
/*eslint-disable-line*/import { db } from '../Database';
import firebase from 'firebase';
export default {
    data() {
      return {
        noAuth: true,
        currentUser: ''
      }
    },
    created() {
      firebase.auth().onAuthStateChanged(currentUser => {
        if(currentUser) {
          this.currentUser = firebase.auth().currentUser.email;
          this.noAuth = false;
        } else {
          console.log('no user'); 
        }
      });
    }
}
</script>
