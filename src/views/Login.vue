<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col class="centerAll" cols="3">
          <v-form lazy-validation @keyup.enter="register()">
            <v-text-field :counter="15" maxlength="15" label="Name" required></v-text-field>
            <v-text-field label="E-mail" v-model="email" required></v-text-field>
            <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
            <v-checkbox label="Do you agree?" required></v-checkbox>
            <v-btn color="success" @click="register()" class="mr-4">Validate</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase';
/*eslint-disable-line*/import { db } from '../Database';
export default {
    data() {
        return {
          show1: false,
          email: '',
          password: ''
        }
    },
    methods: {
      register() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(/*eslint-disable-line*/user => {
            this.$router.push('/');
            location.reload();
          },
          err => {  
              alert(err.message);
          })
      }
    }
}
</script>