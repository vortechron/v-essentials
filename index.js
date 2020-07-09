window.Droppable = require('droppable').default;
const _ = require('lodash');
window.enablePageChangeWarn = true;

module.exports = {

    install(Vue, options) {
        const pace = require('./src/pace')
        pace.start()

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

        if (options.hasMixins) {
            require('./src/mixins')
        }

        if (options.hasAutoRegister) {
            const files = require.context('./src', true, /\.vue$/i)
            files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))
        }

        if (options.hasDirectives) require('./src/directives');
    }
}