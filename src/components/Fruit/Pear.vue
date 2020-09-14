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
                    </tr>
                </thead>
                <tbody v-for="product in Products" :key="product.id">
                    <tr v-if="product.addProducts.product == 'Pear'">
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
                    </tr>
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
        Products: db.collection('Products')
    },
    data() {
        return {
            Products : []
        }
    },
    methods: {
        back() {
            location.reload();
            console.log(firebase.auth().currentUser)
        }
    },
    created() {
        console.log(this.Products)
    }
}
</script>