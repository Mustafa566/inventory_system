<template>
    <v-container>
        <v-row>
            <v-col>
                <h1 class="text-center">products page</h1>
            </v-col>
        </v-row>
        <!-- Catogorie of products -->
        <v-row v-if="fruit == false && vegetable == false">
            <v-col cols="3">
                <v-card shaped max-width='400' @click="fruit = true" elevation="10">
                    <v-img
                    height="200"
                    width="400"
                    src="https://www.retaildetail.nl/sites/default/files/news/shutterstock_1465341938_0.jpg"></v-img>
                    <h2 class="text-center py-3">Fruit</h2>
                </v-card>
            </v-col>
            <v-col>
                <v-card shaped max-width='400' @click="vegetable = true" elevation="10"> 
                    <v-img
                        height="200"
                        width="400"
                        src="https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg">
                    </v-img>
                    <h2 class="text-center py-3">Vegetable</h2>
                </v-card>
            </v-col>
        </v-row>

        <!-- if fruit is true  -->
        <div v-if="fruit == true">
            <v-row>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10" @click="fruit = false">
                        <v-img
                        height="200"
                        width="400"
                        src="https://cdn.iconscout.com/icon/free/png-256/back-arrow-1486700-1258750.png"></v-img>
                        <h2 class="text-center py-3">Back</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/Do_Apples_Affect_Diabetes_and_Blood_Sugar_Levels-732x549-thumbnail.jpg?w=756&h=567"></v-img>
                        <h2 class="text-center py-3">Apple</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://images.newscientist.com/wp-content/uploads/2019/01/31134057/gettyimages-86304874.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Bananan</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://www.arabnews.com/sites/default/files/styles/n_670_395/public/2019/06/11/1618821-102622775.jpg?itok=89EsTD4W"></v-img>
                        <h2 class="text-center py-3">Grape</h2>
                    </v-card>
                </v-col>
            </v-row>
            <!-- second row -->
            <v-row>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://media.libelle.nl/m/h3w8croigvo3.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Kiwi</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://www.healthline.com/hlcmsresource/images/AN_images/lemon-health-benefits-1200x628-facebook.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Lemon</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://calories-info.com/site/assets/files/1173/mango.650x0.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Mango</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://www.rd.com/wp-content/uploads/2019/05/09-2.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Orange</h2>
                    </v-card>
                </v-col>
            </v-row>
            <!-- third row -->
            <v-row>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://blog.healthypawspetinsurance.com/wp-content/uploads/2018/12/pears.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Pear</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://media.self.com/photos/5b4371cc4d0c3c282a8878d3/1:1/w_3414,h_3414,c_limit/pineapple.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Pineapple</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://hips.hearstapps.com/clv.h-cdn.co/assets/15/22/1432664914-strawberry-facts1.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Strawberry</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://post.healthline.com/wp-content/uploads/2019/10/watermelon-fruit-sliced-1200x628-facebook.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Watermelon</h2>
                    </v-card>
                </v-col>
            </v-row>
        </div>

        <!-- if vegetable is true  -->
        <div v-if="vegetable == true">
            <v-row>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10" @click="vegetable = false">
                        <v-img
                        height="200"
                        width="400"
                        src="https://cdn.iconscout.com/icon/free/png-256/back-arrow-1486700-1258750.png"></v-img>
                        <h2 class="text-center py-3">Back</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://resources.stuff.co.nz/content/dam/images/2/0/6/5/a/c/image.related.StuffLandscapeThreeByTwo.1464x976.2063fj.png/1587687891774.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Cabbage</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://www.gardeningknowhow.com/wp-content/uploads/2009/03/radish.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Radish</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://ucarecdn.com/459eb7be-115a-4d85-b1d8-deaabc94c643/-/format/auto/-/preview/3000x3000/-/quality/lighter/">
                        </v-img>
                        <h2 class="text-center py-3">Carrot</h2>
                    </v-card>
                </v-col>
            </v-row>
            <!-- Second row -->
            <v-row>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://www.adaptiveseeds.com/wp-content/uploads/2014/12/kral-russian-parsnip-2.jpg"></v-img>
                        <h2 class="text-center py-3">Parsnip</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://i5.walmartimages.ca/images/Enlarge/006/949/6000196006949.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Lettuce</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://thefamilydinnerproject.org/wp-content/uploads/2013/09/Green-bean-lime-633x326.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Green bean</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://groentegroente.nl/wp-content/uploads/Aubergine-2-S-D-698-1.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Aubergine</h2>
                    </v-card>
                </v-col>
            </v-row>
            <!-- Third row -->
            <v-row>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://ychef.files.bbci.co.uk/976x549/p04w46sp.jpg"></v-img>
                        <h2 class="text-center py-3">Tomato</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10">
                        <v-img
                        height="200"
                        width="400"
                        src="https://cdn.mos.cms.futurecdn.net/EBEXFvqez44hySrWqNs3CZ.jpg">
                        </v-img>
                        <h2 class="text-center py-3">Cucumber</h2>
                    </v-card>
                </v-col>
                <v-col cols="3">
                    <v-card shaped max-width='400' elevation="10"> 
                        <v-img
                            height="200"
                            width="400"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQMQBPlYPe1cnAeKatbdb8JXLLOriKVvWKr_g&usqp=CAU">
                        </v-img>
                        <h2 class="text-center py-3">Sweet pepper</h2>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            fruit: false,
            vegetable: false
        }
    }
}
</script>