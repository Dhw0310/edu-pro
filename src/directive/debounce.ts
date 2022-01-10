import { debounce } from 'lodash'
export const MyDebounce = {
  inserted: function(el: any, binding: { expression: any }, vnode: any) {
    if (typeof binding?.value !== 'function') return false
    el.addEventListener('click', debounce(binding.value, 1000))
  }
}
