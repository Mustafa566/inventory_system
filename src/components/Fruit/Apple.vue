<template>
    <v-container>
        <v-btn @click="back" dark>Back</v-btn>
        <h1>apple</h1>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Catogorie</th>
                        <th class="text-left">Product</th>
                        <th class="text-left">Quality</th>
                        <th class="text-left">Availability</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">First name</th>
                        <th class="text-left">Last name</th>
                        <th class="text-left">Company name</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Location</th>
                        <th class="text-left">Country</th>
                        <th class="text-left">Date</th>
                        <th class="text-left">Buy</th>
                    </tr>
                </thead>
                <tbody v-for="product in Products" :key="product.id">
                    <tr v-if="product.addProducts.product == 'Apple'">
                        <td>{{product.addProducts.catogorie}}</td>
                        <td>{{product.addProducts.product}}</td>
                        <td>{{product.addProducts.quality}}</td>
                        <td>{{product.addProducts.availability}}</td>
                        <td>{{product.addProducts.cours}} {{product.addProducts.price}}</td>
                        <td>{{product.addProducts.firstName}}</td>
                        <td>{{product.addProducts.lastName}}</td>
                        <td>{{product.addProducts.companyName}}</td>
                        <td>{{product.addProducts.email}}</td>
                        <td>{{product.addProducts.location}}</td>
                        <td>{{product.addProducts.country}}</td>
                        <td>{{product.addProducts.date}}</td>
                        <td>
                            <v-btn @click="getItem(product.id)">Buy</v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
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
        Products: db.collection('Products'),
        StoreCart: db.collection('StoreCart')
    },
    data() {
        return {
            Products: [],
            showItem: '',
            addCart: {
                catogorie: '',
                product: '', 
                quality: '',
                availability: '',
                price: '',
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                location: '',
                country: '',
                date: '',
                userId: firebase.auth().currentUser.uid
            }
        }
    },
    methods: {
        back() {
            location.reload();
            console.log(firebase.auth().currentUser)
        },
        getItem(doc) {
            var documentReference = db.collection('Products').doc(doc);
            documentReference.get().then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    var data = documentSnapshot.data();
                    this.addCart.catogorie = data.addProducts.catogorie
                    this.addCart.product = data.addProducts.product
                    this.addCart.quality = data.addProducts.quality
                    this.addCart.availability = data.addProducts.availability
                    this.addCart.price = data.addProducts.price
                    this.addCart.firstName = data.addProducts.firstName
                    this.addCart.lastName = data.addProducts.lastName
                    this.addCart.companyName = data.addProducts.companyName
                    this.addCart.email = data.addProducts.email
                    this.addCart.location = data.addProducts.location
                    this.addCart.country = data.addProducts.country
                    this.addCart.date = date
                    db.collection('StoreCart').add({
                        catogorie: this.addCart.catogorie,
                        product: this.addCart.product,
                        quality: this.addCart.quality,
                        availability: this.addCart.availability,
                        price: this.addCart.price,
                        firstName: this.addCart.firstName,
                        lastName: this.addCart.lastName,
                        companyName: this.addCart.companyName,
                        email: this.addCart.email,
                        location: this.addCart.location,
                        country: this.addCart.country,
                        date: this.addCart.date,
                        userId: this.addCart.userId
                    });
                    console.log(this.addCart)
                } else {
                    console.log('document not found');
                    console.log(doc)
                }
            });
        }
    }
}
</script>