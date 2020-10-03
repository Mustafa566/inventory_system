<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 class="text-center">Make a order</h1>
            </v-col>
        </v-row>
            <!-- <v-simple-table class="mt-16">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-center">First name</th>
                            <th class="text-center">Last name</th>
                            <th class="text-center">Email</th>
                            <th class="text-center">Location</th>
                            <th class="text-center">Country</th>
                            <th class="text-center">Company name</th>
                            <th class="text-center">Product</th>
                            <th class="text-center">Quality</th>
                            <th class="text-center">Availability</th>
                            <th class="text-center">Price</th>
                        </tr>
                    </thead>
                        <tbody v-for="shopItems in shopItem" :key="shopItems.id">
                            <tr class="text-center">
                                <td><p>{{shopItems.firstName}}</p></td>
                                <td><p>{{shopItems.lastName}}</p></td>
                                <td><p>{{shopItems.email}}</p></td>
                                <td><p>{{shopItems.location}}</p></td>
                                <td><p>{{shopItems.country}}</p></td>
                                <td><p>{{shopItems.companyName}}</p></td>
                                <td><p>{{shopItems.product}}</p></td>
                                <td><p>{{shopItems.quality}}</p></td>
                                <td><p>{{shopItems.availability}}</p></td>
                                <td><p>{{shopItems.cours}} {{shopItems.price}}</p></td>
                            </tr>
                            <v-btn @click="min(shopItems.id)">Buy</v-btn>
                        </tbody>
                    </template>
            </v-simple-table> -->
            <v-container>
                <v-row>
                    <v-col md="3" sm="12" v-for="shopItems in shopItem" :key="shopItems.id">
                        <v-card elevation="4" outlined>
                            <v-card-text class="cardPadding">First name: <b>{{shopItems.firstName}}</b></v-card-text>
                            <v-card-text class="cardPadding">Last name: <b>{{shopItems.lastName}}</b></v-card-text>
                            <v-card-text class="cardPadding">Email: <b>{{shopItems.email}}</b></v-card-text>
                            <v-card-text class="cardPadding">Location: <b>{{shopItems.location}}</b></v-card-text>
                            <v-card-text class="cardPadding">Country: <b>{{shopItems.country}}</b></v-card-text>
                            <v-card-text class="cardPadding">Company name: <b>{{shopItems.companyName}}</b></v-card-text>
                            <v-card-text class="cardPadding">Product: <b>{{shopItems.product}}</b></v-card-text>
                            <v-card-text class="cardPadding">Quality: <b>{{shopItems.quality}}</b></v-card-text>
                            <v-card-text class="cardPadding">Availability: <b>{{shopItems.availability}}</b></v-card-text>
                            <v-card-text class="cardPadding">Price: <b>{{shopItems.cours}} {{shopItems.price}}</b></v-card-text>
                            <v-btn @click="min(shopItems.id)" class="mb-5 ml-5">Buy</v-btn>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
    </v-container>
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
    firestore: {
        StoreCart: db.collection('StoreCart'),
        Products: db.collection('Products')
    },
    data() {
        return {
            shopItem: [],
            userId: '',
            availability: '',
            newAvailability: '',
            docId: []
        }
    },
    methods: {
        min(doc) {
            var productDb = db.collection('Products').doc(this.docId);
            productDb.get().then((documentSnapshot) => {
                if(documentSnapshot.exists) {
                    this.shopItem.forEach(doc => {
                        var newAvailability = doc.availability - 1
                        if(doc.availability > 1) {
                            db.collection('Orders').add({
                                availability: newAvailability,
                                catogorie: documentSnapshot.data().catogorie,
                                companyName: documentSnapshot.data().companyName,
                                country: documentSnapshot.data().country,
                                cours: documentSnapshot.data().cours,
                                date: date,
                                email: documentSnapshot.data().email,
                                firstName: documentSnapshot.data().firstName,
                                lastName: documentSnapshot.data().lastName,
                                location: documentSnapshot.data().location,
                                price: documentSnapshot.data().price,
                                product: documentSnapshot.data().product,
                                quality: documentSnapshot.data().quality,
                                userId: documentSnapshot.data().userId
                            })
                            productDb.update({
                                availability: newAvailability
                            });
                            console.log(newAvailability)
                        } else {
                            console.log('0 items left')
                            // productDb.update({
                            //     availability: 'Out of stock'
                            // });
                        }
                    });
                } else {
                    console.log('document not found');
                }
            });

            var shopDb = db.collection('StoreCart').doc(doc);
            shopDb.get().then((documentSnapshot) => {
                if(documentSnapshot.exists) {
                    this.shopItem.forEach(doc => {
                        var newAvailability = doc.availability - 1
                        console.log(doc.docId)
                        if(doc.availability > 1) {
                            shopDb.update({
                                availability: newAvailability
                            });
                            console.log(newAvailability)
                            console.log('Updated')
                            console.log('________')
                        } else {
                            console.log('0 items left')
                            // shopDb.update({
                            //     availability: 'Out of stock'
                            // });
                        }
                        // shopDb.delete().then(function() {
                        //     console.log("Document successfully deleted!");
                        // })
                    });
                } else {
                    console.log('document not found');
                }
            });
        }
    },
    created() {
        firebase.auth().onAuthStateChanged(userId => {
            if(userId) {
                this.userId = firebase.auth().currentUser.uid;
                db.collection("StoreCart").get().then((res) => {
                    res.docs.map((doc) => {
                        if(doc.data().userId == this.userId) {
                            this.availability = doc.data().availability
                            this.docId = doc.data().docId
                            this.shopItem.push({
                                id: doc.id,
                                firstName: doc.data().firstName,
                                lastName: doc.data().lastName,
                                email: doc.data().email,
                                location: doc.data().location,
                                country: doc.data().country,
                                companyName: doc.data().companyName,
                                product: doc.data().product,
                                quality: doc.data().quality,
                                price: doc.data().price,
                                cours: doc.data().cours,
                                availability: doc.data().availability,
                                docId: doc.data().docId
                            })
                        }
                    })
                })
            }
        })
    }
}
</script>