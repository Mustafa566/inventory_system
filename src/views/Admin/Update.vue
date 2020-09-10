<template>
    <div>
        <h1 class="text-center mt-16">update</h1>
        <v-form v-on:submit.prevent="update">
            <v-container>
                <div class="mt-16">
                    <p class="text-center">
                        If the text says it is 'true' then the user has access to the application.
                    </p>
                </div>
                <v-row>
                    <v-col cols="12">
                        <v-row justify="center">
                            <input type="checkbox" class="mt-2 mr-2" v-model="haveAccess">
                            <h3>{{haveAccess}}</h3><br>
                        </v-row>
                        <v-row justify="center" class="mt-10">
                            <v-btn large color="primary" @click="update">Send</v-btn>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </div>
</template>

<script>
/*eslint-disable-line*/import { db } from '../../Database';
import firebase from 'firebase';
export default {
    props: { profileId: String },
    data() {
        return {
            Profile: [],
            haveAccess: ''
        }
    },
    methods: {
        async update() {
            await db.collection('Profile').doc(String(this.profileId)).update({
                haveAccess: this.haveAccess
            });
            console.log('updated' + '' + firebase.auth().currentUser.uid)
            this.$router.push('/Accounts')
        }
    },
    firestore: {
        Profile: db.collection('Profile')
    }
}
</script>