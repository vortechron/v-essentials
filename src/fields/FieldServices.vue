<!-- fieldAwesome.vue -->
<template>
    <div :class="schema.cssClasses" class="w-full">
        <div class="card border-0 shadow w-full mb-2" v-for="(service, key) in value" :key="key">
              <div class="card-body d-flex align-items-center">
                <div class="w-100">
                  <h6 class="card-title"><a href="detail-rooms.html" class="text-decoration-none text-dark font-bold">{{ service.name }}</a>
                    <b-form-checkbox v-model="service.is_active" name="check-button" switch class="float-right">
                        </b-form-checkbox>
                  </h6>
                  <div class="d-flex card-subtitle mb-3">
                        {{ service.description }}
                  </div>
                  <p class="card-text text-muted" v-if="service.is_active">
                      <money class="form-control" v-model="service.rate"></money>
                   </p>
                  <p class="card-text text-muted" v-if="service.is_active">
                      What you'll earn per services: {{ net(service.rate) }}
                   </p>
                </div>
              </div>
            </div>
    </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ],

         methods: {
             net(raw)
             {
                 let take = 85;
                 let final = raw/100 * take;

                 return this.money(final.toFixed(2));
             }
         }
   };
</script>