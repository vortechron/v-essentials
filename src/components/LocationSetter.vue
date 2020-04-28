<template>
  <div class="w-full">
    <div class="input-label-absolute input-label-absolute-right w-100">
      <!-- <label for="location" class="label-absolute cursor-pointer" @click="geolocate">
        <i class="fa fa-crosshairs"></i>
        <div class="sr-only">City</div>
      </label> -->
      <gmap-autocomplete
        class="form-control mb-2"
        :class="inputClass"
        :placeholder="placeholder"
        @place_changed="setPlace"
      ></gmap-autocomplete>

      <div v-if="address != '' && enableFields">
        <input type="hidden" name="location[address]" :value="address" />
        <input type="hidden" name="location[lat]" :value="current.lat" />
        <input type="hidden" name="location[lng]" :value="current.lng" />
        <!-- <input type="hidden" name="location[short_address]" :value="current.lng" /> -->
      </div>
    </div>

    <gmap-map
      :class="{'hidden': !showMap}"
      class="border border-solid"
      @click="setPlaceOnMapClick"
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
      :options="{
        streetViewControl: false
      }"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  props: {
    placeholder: {
      type: String,
      default: "Search and then click on map to pin your exact location"
    },
    showMap: {
      type: Boolean,
      default: true
    },
    enableFields: {
      type: Boolean,
      default: true
    },
    lat: {
      type: Number,
      default: 3.1237557
    },
    lng: {
      type: Number,
      default: 101.46885880000002
    },
    boot: {
      type: Boolean,
      default: true
    },
    inputClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      short_address: '',
      address: '',
      center: { lat: this.lat, lng: this.lng },
      current: { lat: this.lat, lng: this.lng },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  methods: {
    setMarker(position) {
      this.setAddress(position)
      
      this.markers = [];
      this.markers.push({ position: position });

      this.current = position;

      this.$emit("change", {...position, address: this.address});
    },
    setPlaceOnMapClick(e) {
      this.current = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };

      this.setMarker({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });

    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;

      this.addMarker();
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;

        this.setMarker(this.center);
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.setMarker(this.center);
      });
    },
    setAddress(position) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            console.log(results[0]);
            // new collect(comp).filter((item) => {return new collect(item.types).contains('country')}).first()
            this.address = results[0].formatted_address
          } else {
            console.log('Failed');
          }
        } else {
          console.log('Failed');
        }
      });
    }
  },
  created() {
    if (this.boot)
      setTimeout(() => {
        this.setMarker(this.center);
      }, 1000)
  }
};
</script>

<style>
</style>