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
                    <tr v-if="product.product == 'Apple'">
                        <td>{{product.catogorie}}</td>
                        <td>{{product.product}}</td>
                        <td>{{product.quality}}</td>
                        <td>{{product.availability}}</td>
                        <td>{{product.cours}} {{product.price}}</td>
                        <td>{{product.firstName}}</td>
                        <td>{{product.lastName}}</td>
                        <td>{{product.companyName}}</td>
                        <td>{{product.email}}</td>
                        <td>{{product.location}}</td>
                        <td>{{product.country}}</td>
                        <td>{{product.date}}</td>
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
                cours: '',
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                location: '',
                country: '',
                date: '',
                userId: firebase.auth().currentUser.uid,
                docId: ''
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
                    console.log(data)
                    var docId = doc
                    this.addCart.catogorie = data.catogorie
                    this.addCart.product = data.product
                    this.addCart.quality = data.quality
                    this.addCart.availability = data.availability
                    this.addCart.price = data.price
                    this.addCart.cours = data.cours
                    this.addCart.firstName = data.firstName
                    this.addCart.lastName = data.lastName
                    this.addCart.companyName = data.companyName
                    this.addCart.email = data.email
                    this.addCart.location = data.location
                    this.addCart.country = data.country
                    this.addCart.date = date
                    this.addCart.docId = docId
                    db.collection('StoreCart').add({
                        catogorie: this.addCart.catogorie,
                        product: this.addCart.product,
                        quality: this.addCart.quality,
                        availability: this.addCart.availability,
                        price: this.addCart.price,
                        cours: this.addCart.cours,
                        firstName: this.addCart.firstName,
                        lastName: this.addCart.lastName,
                        companyName: this.addCart.companyName,
                        email: this.addCart.email,
                        location: this.addCart.location,
                        country: this.addCart.country,
                        date: this.addCart.date,
                        userId: this.addCart.userId,
                        docId: this.addCart.docId
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