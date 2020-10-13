<template>
    <div>
        <!-- <h1 class="text-center mt-16">Admin</h1> -->
        <v-container>
            <v-row>
                <v-col>
                    <v-card class="mt-10 mb-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Users</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.users}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mt-10 mb-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Users have access</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.haveAccess}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mt-10 mb-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Pending access</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.dontHaveAccess}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Admin</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.admin}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Customer</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.customer}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Sales Person</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.salesPerson}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Foreman</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.foreman}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Warehouse Worker</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.warehouseWorker}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Truck Driver</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.truckDriver}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-card class="mt-5 users" max-width="344">
                        <v-card-text>
                            <p class="display-1 text--primary text-center">Forklift Driver</p>
                            <div class="display-1 text--primary text-center">
                                <p>{{queryOutput.forkliftDriver}}</p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        <hr>
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
                            <v-btn color="teal" small class="mt-2" v-if="openSelect" @click="updateProfile(Profiles.id)">Update now</v-btn>
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
            queryOutput: {
                users: 0,
                admin: 0,
                customer: 0,
                salesPerson: 0,
                foreman: 0,
                warehouseWorker: 0,
                truckDriver: 0,
                forkliftDriver: 0,
                haveAccess: 0,
                dontHaveAccess: 0,
            },
            hasAccess: false,
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
                    location.reload()
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
    },
    created() {
        // Get all user profile
        db.collection("Profile").get().then((res) => {
           this.queryOutput.users = res.size
        })
        // Get all admin
        db.collection("Profile").where("role", "==", "Admin").get().then((res) => {
            this.queryOutput.admin = res.size
        })
        // Get all customer
        db.collection("Profile").where("role", "==", "Customer").get().then((res) => {
            this.queryOutput.customer = res.size
        })
        // Get all Sales Person
        db.collection("Profile").where("role", "==", "Sales Person").get().then((res) => {
            this.queryOutput.salesPerson = res.size
        })
        // Get all Foreman
        db.collection("Profile").where("role", "==", "Foreman").get().then((res) => {
            this.queryOutput.foreman = res.size
        })
        // Get all Warehouse Worker
        db.collection("Profile").where("role", "==", "Warehouse Worker").get().then((res) => {
            this.queryOutput.warehouseWorker = res.size
        })
        // Get all Truck Driver
        db.collection("Profile").where("role", "==", "Truck Driver").get().then((res) => {
            this.queryOutput.truckDriver = res.size
        })
        // Get all Forklift Driver
        db.collection("Profile").where("role", "==", "Forklift Driver").get().then((res) => {
            this.queryOutput.forkliftDriver = res.size
        })
        // Users have access show how much
        db.collection("Profile").where("haveAccess", "==", true).get().then((res) => {
            this.queryOutput.haveAccess = res.size
        })
        // Users have access show how much
        db.collection("Profile").where("haveAccess", "==", false).get().then((res) => {
            this.queryOutput.dontHaveAccess = res.size
        })
        db.collection("Profile").where("haveAccess", "==", "true").get().then((res) => {
            this.hasAccess = true
            console.log(res.empty);
        })
    },
}
</script>