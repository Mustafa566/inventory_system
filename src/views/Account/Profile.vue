<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="centerAll" cols="6">
                    <h1 class="text-center">Send account request</h1>
                    <v-form lazy-validation @keyup.enter="createProfile()">
                        <v-text-field label="Username" v-model="profile.username" required></v-text-field>
                        <v-select :items="role" label="Role" v-model="profile.role"></v-select>
                        <v-btn color="success" @click="createProfile()" class="mr-4">Send</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import firebase from 'firebase';
/*eslint-disable-line*/import { db } from '../../Database';

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var date = day + '-' + month + '-' + year

export default {
    data() {
        return {
            currentUser: firebase.auth().currentUser.uid,
            profile: {
                username: '',
                role: '',
                email: firebase.auth().currentUser.email,
                userId: null
            },
            role: ['Admin', 'Customer', 'Sales Person', 'Foreman', 'Warehouse Worker', 'Truck Driver', 'Forklift Driver']
        }
    },
    methods: {
        async createProfile() {
            const data = {
                username: this.profile.username,
                email: this.profile.email,
                role: this.profile.role,
                userId: firebase.auth().currentUser.uid,
                createdAt: date,
                haveAccess: false
            };
            const res = await db.collection('Profile').doc(this.currentUser).set(data);
            console.log(res + data)
            this.profile.username = '';
        }
    },
    firestore: {
        Profile: db.collection('Profile')
    },
    created() {
        console.log(this.currentUser)
    }
}
</script>