window.Droppable = require('droppable').default;
window.enablePageChangeWarn = true;

module.exports = {

    install(Vue, options) {

        window.enablePageChangeWarn = false
        window.onload = function() {
            window.addEventListener("beforeunload", function (e) {

                if (! window.enablePageChangeWarn) {
                    return undefined;
                } 
        
                var confirmationMessage = 'It looks like you have been editing something. '
                                        + 'If you leave before saving, your changes will be lost.';
        
                (e || window.event).returnValue = confirmationMessage; //Gecko + IE
                return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
            });
        };

        if (options.hasPace) {
            const pace = require('./src/pace')
            pace.start()
        }

        if (options.hasMixins) {
            require('./src/mixins')
        }

        if (options.hasAutoRegister) {
            const fields = require.context('./src/fields', true, /\.vue$/i)
            fields.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], fields(key).default))
            
            const components = require.context('./src/components', true, /\.vue$/i)
            const prefix = options.componentPrefix || "v"
            components.keys().map(key => {
                let baseName = key.split('/').pop().split('.')[0]
                let name = baseName.charAt(0).toUpperCase() + baseName.slice(1)
                Vue.component(prefix + name, components(key).default)
            })
        }

        if (options.hasDirectives) {
            require('./src/directives')
        }
    }
}