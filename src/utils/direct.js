import Vue from 'vue'
/**权限指令**/

Vue.directive('has', {
    inserted: function (el, binding, vnode) {
        let value = binding.value
        let list = vnode.context.$route.meta.btnPress;
        let flag = false
        for (let i = 0; i < list.length; i++) {
            if (list[i] == value) {
                flag = true
                break
            } else {
                if (i == list.length - 1 && !flag) {
                    flag = false
                    el.parentNode.removeChild(el);
                }
            }
        }
    }
});
