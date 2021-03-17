'use strict';

import traverser from './traverser'
import $ from "jquery";

// # USAGE
// VFG.make(this.$children)
// .fromChildren()
// .shouldScroll()
// .validate(() => {
//     this.form['post'](this.$page._action)
// })

class VFG {

    constructor(context) {
        this._context = context
        this.scrollable = false
        this.childrenable = false
        this.componentName = 'vVfg'
    }

    static make(context) {
        return new VFG(context)
    }

    componentName(name) {
        this.componentName = name
        return this
    }

    fromChildren() {
        this.childrenable = true
        return this
    }

    shouldScroll() {
        this.scrollable = true
        return this
    }

    validator(vfg, componentName = 'vVfg') {
        let name = vfg.$options.name || vfg.$options._componentTag
        if (name == componentName) vfg = vfg.vfg()
        vfg.validate()

        return vfg
    }

    scrollToError() {
        $('html, body').animate({
            scrollTop: $('.error').offset().top - 200
        }, 500);
    }

    validate(submission) {
        let statusError = false;
        let vfg;
        if (this.childrenable) {
            traverser.traverse(
                this._context,
                (object) => {
                    if (object.$options.name == this.componentName) {
                        vfg = this.validator(object, this.componentName)

                        if (vfg.errors.length != 0) statusError = true;
                    }
                    return object.$children
                }
            )
        } else {
            this._context.forEach((vfg) => {
                vfg = this.validator(vfg, this.componentName)
                if (vfg.errors.length != 0) statusError = true;
            })
        }

        if (! statusError && typeof submission == 'function') {
            submission()
        } 
        
        if (statusError) {
            setTimeout(this.scrollToError, 200)
        }

        return statusError
    }
}

export default VFG