<!-- fieldAwesome.vue -->
<template>
    <media-manager>
        <tab-blank title="Import From Instagram">
            <card class="p-2">
                sss
            </card>
        </tab-blank>
    </media-manager>
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
