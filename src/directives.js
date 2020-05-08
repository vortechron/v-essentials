// v-submission.spinner="[vfg]"
Vue.directive('submission', {
    bind: function (el, binding, vnode) {
        const instance = vnode.context;

        if (binding.modifiers.spinner) {
          el.classList.add("has-spinner");
        }

        let loader = (action) => {
            //start loading animation
        if (action == 'start') {
            $(el).attr('data-btn-text', $(el).text());
            $(el).html('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span> '+ $(el).attr('data-btn-text'));
            $(el).addClass('active');
          }

          //stop loading animation
          if (action == 'stop') {
            $(el).html($(el).attr('data-btn-text'));
            $(el).removeClass('active');
          }
        }

        el.addEventListener('click', (e) => {
            loader('start')
            
            let statusError = false;
            binding.value.forEach((value) => {

                let comp = instance.$refs[value];
                let name = comp.$options.name || comp.$options._componentTag
                let vfg = null
                if (name == 'formGenerator') {
                  vfg = comp
                  vfg.validate()
                } else {
                  vfg = instance.$refs[value].vfg()
                  vfg.validate()
                }

                if (vfg.errors.length != 0) {
                    statusError = true;
                }
            })
            
            if (statusError) {
                e.preventDefault()
            }

            setTimeout(() => {
              loader('stop')
                $('html, body').animate({
                  scrollTop: $('.error').offset().top - 200
              }, 500);
            }, 1000)

        })
    }
})

Vue.directive('post', {
    bind: function (el, binding, vnode) {

      var id = Math.random().toString(36).substring(7);
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
      el.innerHTML = el.textContent + form;
    }
})