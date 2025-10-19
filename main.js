const { createApp, ref, computed } = Vue

const app = createApp({
    setup(){
        const cart = ref({})
        const premium = ref(true)

        function updateCart(id) {
            if (cart.value[id]) {
                cart.value[id] += 1
            } else {
                cart.value[id] = 1
            }
        }

        function removeFromCart(id) {
            if (cart.value[id]) {
                cart.value[id] -= 1
                if (cart.value[id] === 0) {
                    delete cart.value[id]  // 数量为0时删除该商品
                }
            }
        }

        return {
            cart,
            premium,
            removeFromCart,
            updateCart           
        }
    }
  
})

app.component('product-display', productDisplay)
app.component('product-details', productDetails)
app.component('review-form', reviewForm)
app.component('review-list',reviewList)
app.mount('#app')