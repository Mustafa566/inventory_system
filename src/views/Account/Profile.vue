<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="centerAll" cols="6">
                    <h1 class="text-center">Create Profile</h1>
                    <v-form lazy-validation @keyup.enter="createProfile()">
                        <v-text-field label="Username" v-model="profile.username" required></v-text-field>
                        <v-text-field label="E-mail" v-model="profile.email" required></v-text-field>
                        <v-btn color="success" @click="createProfile()" class="mr-4">Create Profile</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
/*eslint-disable-line*/import { db } from '../../Database';
import firebase from 'firebase';

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var date = day + '-' + month + '-' + year

export default {
    data() {
        return {
            profile: {
                username: '',
                email: '',
                userId: null
            }
        }
    },
    methods: {
        async createProfile() {
            if(this.profile.email == firebase.auth().currentUser.email) {
                await db.collection('Profile').add({
                    username: this.profile.username,
                    email: this.profile.email,
                    userId: firebase.auth().currentUser.uid,
                    createdAt: date
                })
                this.profile.username = '';
                this.profile.email = '';
            } else {
                console.log('not working')
            }
        }
    },
    firestore: {
        Profile: db.collection('Profile')
    }
}
</script>