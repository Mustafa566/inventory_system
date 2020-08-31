<template>
    <div>
        <h1 class="text-center mt-16">Admin</h1>
        <div v-for="Profiles in Profile" :key="Profiles" class="text-center mt-16">
            <p>{{Profiles.username}}</p>
            <p>{{Profiles.username}}</p>
            <p>{{Profiles.email}}</p>
            <p>{{Profiles.userId}}</p>
            <p>{{Profiles.role}}</p>
            <p>{{Profiles.haveAccess}}</p>
            <p>{{Profiles.createdAt}}</p>
        </div>
    </div>
</template>

<script>
/*eslint-disable-line*/import { db } from '../../Database';
import firebase from 'firebase';
export default {
    data() {
        return {
            currentUser: firebase.auth().currentUser
        }
    },
    created() {
        this.currentUser = firebase.auth().currentUser;
    },
    firestore: {
      Profile: db.collection('Profile')
    }
}
</script>