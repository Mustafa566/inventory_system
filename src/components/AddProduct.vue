<template>
    <v-container>
        <h1>Add products</h1>
        <v-alert type="error" dismissible v-if="errorAlert">One of the inputs is empty</v-alert>
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
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="2" md="2" sm="6" xs="12">
                    <v-select
                        :items="cours"
                        v-model="addProducts.cours"
                        label="Cours"
                    ></v-select>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.price"
                        label="Price"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="4" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.firstName"
                        label="First name"
                    ></v-text-field>
                </v-col>
                <v-col lg="4" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.lastName"
                    ></v-text-field>
                </v-col>
                <v-col lg="4" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.companyName"
                        label="Company name"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        type="email"
                        v-model="addProducts.email"
                        label="Email"
                    ></v-text-field>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.location"
                        label="Location"
                    ></v-text-field>
                </v-col>
                <v-col lg="3" md="3" sm="6" xs="12">
                    <v-text-field
                        v-model="addProducts.country"
                        label="Country"
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

var d = new Date();
var day = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var date = day + '-' + month + '-' + year

export default {
    firestore: {
        Products: db.collection('Products')
    },
    data() {
        return {
            errorAlert: false,
            sort: ['Fruit', 'Vegetable'],
            fruit: ['Apple', 'Bananan', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange', 'Pear', 'Pineapple', 'Strawberry', 'Watermelon'],
            vegetable: ['Cabbage', 'Radish', 'Carrot', 'Parsnip', 'Lettuce', 'Green bean', 'Aubergine', 'Tomato', 'Cucumber', 'Sweet pepper'],
            quality: [1,2,3,4,5,6,7,8,9,10],
            cours: ['€', '$', '£', '₺'],
            random: Math.floor(Math.random() * 1000000),
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
                userId: firebase.auth().currentUser.uid,
                date: date
            }
        }
    },
    methods: {
        async add() {
            if (
                this.addProducts.catogorie != '' && 
                this.addProducts.product != '' && 
                this.addProducts.quality != '' && 
                this.addProducts.availability != '' && 
                this.addProducts.cours != '' && 
                this.addProducts.price != '' && 
                this.addProducts.firstName != '' && 
                this.addProducts.lastName != '' && 
                this.addProducts.companyName != '' && 
                this.addProducts.email != '' && 
                this.addProducts.location != '' && 
                this.addProducts.country != ''
                ) {
                await db.collection('Products').add({
                    addProducts: this.addProducts
                });
                console.log(this.addProducts)
                this.$router.push('/ViewProducts')
            } else {
                this.errorAlert = true
            }
        }
    },
    created() {
        console.log(this.random + firebase.auth().currentUser.uid)
    }
}
</script>