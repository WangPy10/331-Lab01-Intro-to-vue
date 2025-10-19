const { reactive, toRefs} = Vue

const reviewForm = {
    template: /*html*/
        `<form class="review-form" @submit.prevent="onSubmit">
            <h3>Leave a review</h3>

            <label for="name">Name:</label>
            <input id="name" v-model="name">

            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>

            <label for="rating">Rating:</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>

<label>
Would you recommend this product?
<input 
    type="radio" 
    value="yes" 
    v-model="recommend"
/> Yes
<input 
    type="radio" 
    value="no" 
    v-model="recommend"
/> No
</label>

            <input class="button" type="submit" value="Submit">
        </form>`,
    setup(props,{emit}) {
        const form = reactive({
            name: '',
            review: '',
            rating: null,
            recommend:null
        })

        const errors = reactive({
            name: '',
            review: '',
            rating: '',
            all: ''
        })

        function onSubmit(){

            errors.name = ''
            errors.review = ''
            errors.rating = ''
            errors.recommend=''
            errors.all = ''

            if (form.name === '' || form.review === '' || form.rating === null||form.recommend===''){
            
                alert('Review is incomplete. Please fill out every field.')
                return
            }

            const productReview = {
            name: form.name,
            review: form.review,
            rating: form.rating,
            recommending:form.recommend
            }
                emit('review-submitted', productReview)
                form.name = ''
               form.review = ''
                form.rating = null
                form.recommend=null
        }

        return {
            ...toRefs(form),
            onSubmit,
            errors
        }
    }
}