<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 class="text-center">Make a order</h1>
            </v-col>
        </v-row>
            <v-simple-table class="mt-16">
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
            </v-simple-table>
            
    </v-container>
</template>

<script>
/*eslint-disable-line*/import { db } from '../../Database';
import firebase from 'firebase';

export default {
    firestore: {
        StoreCart: db.collection('StoreCart')
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
                            productDb.update({
                                availability: newAvailability
                            });
                            console.log(newAvailability)
                            console.log('Updated')
                        } else {
                            console.log('0 items left')
                            productDb.update({
                                availability: 'Out of stock'
                            });
                        }
                    });
                } else {
                    console.log('document not found');
                }
            });

            var shopDb = db.collection('StoreCart').doc(doc);
            shopDb.get().then((documentSnapshot) => {
                if(documentSnapshot.exists) {
                    // this.shopItem.forEach(doc => {
                        // console.log(doc.docId)
                        // shopDb.delete().then(function() {
                        //     console.log("Document successfully deleted!");
                        // })
                    // });
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