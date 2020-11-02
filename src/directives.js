import ClickOutside from 'vue-click-outside'
import Vue from 'vue';

Vue.directive('submission', {
    bind: function (el, binding, vnode) {
        const instance = vnode.context;

        if (binding.modifiers.spinner) {
          let firstChild = el.firstElementChild
          if (firstChild) el = firstChild
          el.classList.add("has-spinner");
        }

        let loader = (action) => {
          if (action == 'start') {
            $(el).attr('data-btn-text', $(el).text());
            $(el).html('<span class="spinner mr-1"><i class="fa fa-spinner fa-spin"></i></span> &nbsp;'+ $(el).attr('data-btn-text'));
            $(el).addClass('active');
          }

          if (action == 'stop') {
            $(el).html($(el).attr('data-btn-text'));
            $(el).removeClass('active');
          }
        }

        el.addEventListener('click', (e) => {
            loader('start')

            let statusError = false;
            binding.value.forEach((value) => {
              let comp = typeof value == 'object' ? value : instance.$refs[value];
              if (! comp || ! comp.$options) return;
              
              let name = comp.$options.name || comp.$options._componentTag
              let vfg = null

                if (name == 'vfgRepeater') vfg = comp
                else if (name == 'vfg') vfg = comp.vfg() 
                else if (name == 'formGenerator') vfg = comp

                if (vfg) {
                  vfg.validate()
  
                  if (vfg.errors.length != 0) statusError = true;
                }
            })
            
            if (statusError) {
              e.preventDefault()
            }

            setTimeout(() => {
              $('html, body').animate({
                scrollTop: $('.error').offset().top - 200
              }, 500);
            }, 500)
            
            setTimeout(() => {
              loader('stop')
            }, 3000)

        })
    }
})

// v-spinner
Vue.directive('spinner', {
    bind: function (el, binding, vnode) {
        const instance = vnode.context;

        let firstChild = el.firstElementChild
        if (firstChild) el = firstChild
        el.classList.add("has-spinner");

        let loader = (action) => {
          if (action == 'start') {
            $(el).attr('data-btn-text', $(el).text());
            $(el).html('<span class="spinner mr-1"><i class="fa fa-spinner fa-spin"></i></span> &nbsp;'+ $(el).attr('data-btn-text'));
            $(el).addClass('active');
          }

          if (action == 'stop') {
            $(el).html($(el).attr('data-btn-text'));
            $(el).removeClass('active');
          }
        }

        el.addEventListener('click', (e) => {
          loader('start')
          setTimeout(() => {
            loader('stop')
          }, 3000)
      })

        
    }
})

Vue.directive('post', {
    bind: function (el, binding, vnode) {

      var text = $(el).html()
      var id = Math.random().toString(36).substring(7)
      var route = binding.value;
      var attrib = `event.preventDefault();document.getElementById(\'${id}\').submit();`;

      if (binding.arg == 'confirm') {
        route = binding.value.route;
        attrib = `event.preventDefault();if(confirm('${binding.value.confirm_msg}')) {document.getElementById(\'${id}\').submit();}`
      }

      el.setAttribute('onclick', attrib);
      var form = `<form id="${id}" action="${route}" method="POST" style="display: none;">
      <input type="hidden" name="_token" value="${document.head.querySelector('meta[name="csrf-token"]').content}">
        </form>`
      el.innerHTML = text + form;
    }
})

Vue.directive('ClickOutside', ClickOutside)