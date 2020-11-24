<!-- fieldAwesome.vue -->
<template>
    <div class="w-full">
        <div class="mt-1 form-input block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" id="card-element"></div>
    </div>
</template>

<script>
import { abstractField } from "vue-form-generator";
import {loadStripe} from '@stripe/stripe-js/pure';

export default {
    mixins: [abstractField],
    mounted() {
        loadStripe(this.schema.publicKey)
            .then((stripe) => {
                 const elements = stripe.elements();
                const cardElement = elements.create("card");

                cardElement.mount("#card-element");
            })

       
    }
};
</script>
