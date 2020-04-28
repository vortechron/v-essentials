Vue.directive('submission', {
    bind: function (el, binding, vnode) {
        const instance = vnode.context;

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
            
            let statusError = true;
            binding.value.forEach((value) => {
                instance.$refs[value].vfg().validate()

                if (! instance.$refs[value].vfg().errors.length > 0) {
                    statusError = false;
                }
            })
            
            if (statusError) {
                e.preventDefault()
            }

            setTimeout(() => {
                loader('stop')
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