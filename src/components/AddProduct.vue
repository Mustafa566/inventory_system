<template>
    <v-container>
        <h1>Add products</h1>
        <v-form>
            <v-row>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-select
                    :items="sort"
                    v-model="addProducts.catogorie"
                    label="Sort"
                    ></v-select>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-select
                    v-if="addProducts.catogorie == 'Fruit'"
                    v-model="addProducts.product"
                    :items="fruit"
                    label="Fruit"
                    ></v-select>
                    <v-select
                    v-if="addProducts.catogorie == 'Vegetable'"
                    v-model="addProducts.product"
                    :items="vegetable"
                    label="Vegetable"
                    ></v-select>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-select
                    :items="quality"
                    v-model="addProducts.quality"
                    label="Quality"
                    ></v-select>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.availability"
                        label="Availability"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="2" md="2" sm="6" xs="12">
                    <v-select
                        :items="cours"
                        v-model="addProducts.cours"
                        label="Cours"
                        required
                    ></v-select>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.price"
                        label="Price"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="4" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.firstName"
                        label="First name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col lg="4" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.lastName"
                        label="Last name"
                        required
                    ></v-text-field>
                </v-col>
                <v-col lg="4" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.companyName"
                        label="Company name"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        type="email"
                        v-model="addProducts.email"
                        label="Email"
                        required
                    ></v-text-field>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.location"
                        label="Location"
                        required
                    ></v-text-field>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.country"
                        label="Country"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-btn @click="add">Click</v-btn>
         </v-form>
    </v-container>
</template>

<script>
/*eslint-disable-line*/import { db } from '../Database';
import firebase from 'firebase';

export default {
    firestore: {
        Products: db.collection('Products')
    },
    data() {
        return {
            sort: ['Fruit', 'Vegetable'],
            fruit: ['Apple', 'Bananan', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Pear', 'Pineapple', 'Strawberry', 'Watermelon'],
            vegetable: ['Cabbage', 'Radish', 'Carrot', 'Parsnip', 'Lettuce', 'Green bean', 'Aubergine', 'Tomato', 'Cucumber', 'Sweet pepper'],
            quality: [1,2,3,4,5,6,7,8,9,10],
            cours: ['€ (Euro)', '$ (Dollar)', '£ (British pound)', '₺ (Turkish lira)'],
            addProducts: {
                catogorie: '',
                product: '',
                quality: '',
                availability: '',
                cours: '',
                price: '',
                firstName: '',
                lastName: '',
                companyName: '',
                email: '',
                location: '',
                country: '',
            }
        }
    },
    methods: {
        async add() {
            var currentUser = firebase.auth().currentUser.uid
            const res = await db.collection('Products').doc(currentUser).set(this.addProducts);
            console.log(res)
        }
    }
}
</script>