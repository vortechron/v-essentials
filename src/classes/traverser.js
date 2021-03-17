'use strict';

class Traverser {
    static traverse(context, callback) {
        if(context !== null && typeof context == "object") {
            Object.entries(context).forEach(([key, value]) => {
                value = callback(value)
                Traverser.traverse(value, callback);
            });
        }
    }
}

export default Traverser