<template>
  <div>
    <v-container fluid>
      <div class="card">
        <v-row>
          <v-col v-if="loginShow" class="centerAll" cols="5">
            <h1 class="text-center">Login</h1>
            <v-form lazy-validation @keyup.enter="login()">
              <v-text-field label="E-mail" v-model="email" required></v-text-field>
              <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Password" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
              <v-btn color="success" @click="login()" class="mr-4">Login</v-btn>
            </v-form>
            <v-btn color="success" @click="loginShow = false" class="mt-2">Create a account</v-btn>
          </v-col>
      
          <v-col v-if="!loginShow" class="centerAll" cols="5">
            <h1 class="text-center">Sign Up</h1>
            <h3 class="text-center mt-5">
              Enter your email address to create your account
            </h3>
            <v-form lazy-validation @keyup.enter="register()">
              <v-text-field v-model="username" :counter="15" maxlength="15" label="Username" required></v-text-field>
              <v-text-field v-model="email" label="E-mail" required></v-text-field>
              <v-text-field 
              v-model="password" 
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" 
              :type="show1 ? 'text' : 'password'" 
              name="input-10-1" 
              label="Password" 
              hint="At least 8 characters" 
              counter @click:append="show1 = !show1">
              </v-text-field>
              <v-checkbox label="I am not a robot" required></v-checkbox>
              <v-btn color="primary" rounded @click="register()">
                <v-icon class="svg">mdi-check</v-icon>
                Create Account
              </v-btn>
            <hr class="mt-5 mb-5">
              <v-row>
                <v-col cols="9">
                  <v-row>
                    <img class="googleIcon" src="@/assets/googleIcon.png">
                    <p class="mt-1 ml-2">Sign Up with Google</p>
                  </v-row>
                </v-col>
                <v-col>
                  <v-btn color="primary" rounded @click="loginShow = true">
                    <v-icon class="svg">mdi-login-variant</v-icon>
                    Login
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

          <v-col class="centerAll rightSide" cols="6">
            
          </v-col>
        </v-row>
      </div>
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
          loginShow: true,
          email: '',
          password: ''
        }
    },
    methods: {
      register() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(/*eslint-disable-line*/user => {
            this.$router.push('/Home');
            location.reload();
          },
          err => {  
              alert(err.message);
          })
      },
      login() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          .then(/*eslint-disable-line*/user => {
            this.$router.push('Home');
            location.reload();
          },
          err => {
            alert(err.message);
          })
      }
    }
}
</script>