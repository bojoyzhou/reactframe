import {
    EventEmitter
} from 'events'

var __store = null;
class Store extends EventEmitter {
    constructor(name) { //构造函数
        if (__store) {
            return __store
        }
    }
}

Store.prototype = new EventEmitter

export const createStore = () => {
    if (__store) {
        return __store
    }
    return __store = new Store
}

export const dispatch = (action) => {
    if (!__store) {
        throw Error('store is not initialized')
    }
    __store.emit(action.type, action)
}
