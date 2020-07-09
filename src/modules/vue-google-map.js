export default function (key) {
    let VueGoogleMaps = require("vue2-google-maps");

    Vue.use(VueGoogleMaps, {
        load: {
            key,
            libraries: "places,geometry" // necessary for places input
        }
    });
}