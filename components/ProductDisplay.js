const productDisplay = {
    template: /*html*/
    `
    <div class="product-display">
        <div class="product-container">
            <div class="product-image">
                <img :src="image" :class="{ 'out-of-stock-image': !inStock }">
            </div>
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inventory > 10">In Stock</p>
            <p v-else-if="inventory <= 10 && inventory > 0">Almost out of Stock</p>
            <p v-else>Out of Stock</p>
            
            <product-details :details="details"></product-details>

            
            <div 
                v-for="(variant, index) in variants" 
                :key="variant.id" 
                @mouseover="updateVariant(index)"
                class="color-circle" 
                :style="{ backgroundColor: variant.color }"
            ></div>
            <button 
                class="button" 
                :disabled="!inStock" 
                @click="addToCart" 
                :class="{ disabledButton: !inStock }"
            >
                Add To Cart
            </button>
            <button 
                class="button" 
        @click="removeFromCart"
>
    Remove from Cart
</button>
            <p v-if="promotionMessage">{{ promotionMessage }}</p>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
            <review-form @review-submitted="addReview"></review-form>
    </div>
    `,
    props: {
        premium: Boolean
    },
        
    setup(props, { emit }) {   
        const product = ref('Boots')
        const brand = ref('SE 331')

        const reviews = ref([])
        
        const Onsale = ref(true)
        const inventory  = ref(0)
        const details = ref([
                        '50% cotton',
                        '30% wool',
                        '20% polyester'
                    ])
        const variants = ref([
            { id: 2234, color: 'green', image: './assets/images/socks_green.jpg', quantity: 50 },
            { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0 }
        ])

        const selectedVariant = ref(0)
        
        

        const promotionMessage = computed(() => {
            return Onsale.value ? `${brand.value} ${product.value} On Sale` : '';
        })
     
        function addToCart() {
            emit('add-to-cart', variants.value[selectedVariant.value].id)
        }

        function updateVariant(index){
            selectedVariant.value = index;
        }

        const image = computed(() => {
            return variants.value[selectedVariant.value].image
        })
        
        const inStock = computed(() => {
            return variants.value[selectedVariant.value].quantity
        })

        const title = computed(() =>{
            return brand.value + ' ' + product.value
        })

        function changeToInstock() {
            inStock.value = !inStock.value
        }
        
        function updateImage(variantImage){
            image.value = variantImage
        }
        
        function removeFromCart() {
            emit('remove-from-cart', variants.value[selectedVariant.value].id)
        }

        function addReview(review){
            reviews.value.push(review)
        }

        const sizes = ref([
            'S','M','L'
        ])

        return {
            title,
            image,
            inStock,
            inventory,
            details,
            variants,            
            promotionMessage,
            updateVariant,
            //shipping,
            addToCart,
            changeToInstock,
            updateImage,
            removeFromCart,
            addReview,
            reviews,
            sizes,
            productLink:'https://www.camt.cmu.ac.th'
        };
    }
};