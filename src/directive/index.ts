import { MyDebounce } from './debounce'

const directive = {
  MyDebounce
}
export default {
  install(Vue: { directive: (arg0: string, arg1: any) => void }) {
    Object.keys(directive).forEach(key => {
      Vue.directive(key, directive[key])
    })
  }
}
