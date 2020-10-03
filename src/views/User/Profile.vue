<template>
    <div>
        <v-container>
            <v-row>
                <v-col class="centerAll" cols="6">
                    <h1 class="text-center">Send account request</h1>
                    <v-form lazy-validation @keyup.enter="createProfile()">
                        <v-text-field label="Username" v-model="profile.username" required></v-text-field>
                        <v-select :items="role" label="Role" v-model="profile.role"></v-select>
                        <v-text-field label="Admin key" v-model="key" required v-if="getKeyInput"></v-text-field>
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
    firestore: {
        Profile: db.collection('Profile')
    },
    data() {
        return {
            getKeyInput: false,
            adminKey: 'afatsumAdmin566',
            key: '',
            Profile: [],
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
            if(this.profile.role == 'Admin') {
                this.getKeyInput = true
                if(this.key == this.adminKey) {
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
                    setTimeout(function () { location.reload(true); }, 2000);
                    this.$router.push({ path: 'Home' })
                } else {
                    console.log('Key is not valid')
                }
            } else {
                console.log('no admin')
            }
        }
    },
    created() {
        if(firebase.auth().currentUser) {
            this.currentUser = firebase.auth().currentUser.uid;
            this.currentEmail = firebase.auth().currentUser.email;
        }
        // Check if it is Admin
          var documentReference = db.collection('Profile').doc(this.currentId);
          documentReference.get().then((documentSnapshot) => {
            // check and do something with the data here.
            if (documentSnapshot.exists) {
                // do something with the data
                var data = documentSnapshot.data();
                console.log(data)
                this.$router.push({ path: 'Home' })
            } else {
                console.log('document not found');
            }
          });
    }
}
</script>