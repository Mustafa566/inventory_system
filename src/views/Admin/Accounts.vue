<template>
    <div>
        <h1 class="text-center mt-16">Admin</h1>
        <v-container>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Username</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">User id</th>
                        <th class="text-left">Role</th>
                        <th class="text-left">Access</th>
                        <th class="text-left">Created at</th>
                    </tr>
                </thead>
                    <tbody>
                        <tr v-for="Profiles in Profile" :key="Profiles.id">
                            <td>{{Profiles.username}}</td>
                            <td>{{Profiles.email}}</td>
                            <td>{{Profiles.userId}}</td>
                            <td>{{Profiles.role}}</td>
                            <v-select :items="access" label="Access" v-model="haveAccess" v-if="openSelect"></v-select>
                            <td v-if="!openSelect">{{Profiles.haveAccess}}</td>
                            <td>{{Profiles.createdAt}}</td>
                            <v-btn color="warning" small class="mt-2" v-if="!openSelect" @click="openSelect = true;">Update</v-btn>
                            <v-btn color="warning" small class="mt-2" v-if="openSelect" @click="updateProfile(Profiles.id)">Update now</v-btn>
                            <v-btn color="error" small class="mt-2 ml-2" v-if="openSelect" @click="openSelect = false;">Cancel</v-btn>
                            <v-btn color="error" small class="mt-2 ml-2" v-if="!openSelect" @click="deleteProfile(Profiles.id)">Delete</v-btn>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-container>
    </div>
</template>

<script>
/*eslint-disable-line*/import { db } from '../../Database';
import firebase from 'firebase';
export default {
    data() {
        return {
            Profile: [],
            username: '',
            haveAccess: '',
            access: [true, false],
            openSelect: false,
            currentUser: firebase.auth().currentUser
        }
    },
    firestore: {
        Profile: db.collection('Profile')
    },
    methods: {
        deleteProfile(doc) {
            if(confirm('Are you sure ? ')) {
                db.collection("Profile").doc(doc).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            } else {
                console.log('nothing')
            }
        },
        updateProfile(doc) {
            db.collection('Profile').doc(doc).update({
                haveAccess: this.haveAccess
            });
            console.log('updated')
            this.openSelect = false;
        }
    }
}
</script>