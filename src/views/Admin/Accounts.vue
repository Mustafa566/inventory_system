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
                            <td>{{Profiles.haveAccess}}</td>
                            <td>{{Profiles.createdAt}}</td>
                            <router-link :to="{ name: 'Update', params: {id: Profiles.id} }" class="btn btn-warning removeUnderline">
                                <v-btn color="warning" small class="mt-2">Update</v-btn>
                            </router-link>
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
            currentUser: firebase.auth().currentUser
        }
    },
    firestore: {
        Profile: db.collection('Profile')
    }
}
</script>