import {
    dispatch
} from '../store'

import {EventEmitter} from 'events'

function dispatch(){
    console.log('dispatch', arguments)
}

const middleWare = []

const func = (action, next) => {
    // dosomething with action
    // next(action)
}
export const middle = (func) => {
    middleWare.unshift(wrapperMiddle(func, middleWare[0]))
}

function wrapperMiddle(func,next){
    return (action) => {
        return func(action, next)
    }
}

export const create = (type) => {
    const temp = (payload) => {
        const action = {
            type,
            payload
        }
        middleWare[0].call(null, action)
    }
    temp.when = (start,end) => {
        EventEmitter.on.call(temp, 'whenStart', start)
        EventEmitter.on.call(temp, 'whenEnd', end)
    }
    return temp
}

middle((action, next) => {
    action.next = next
    dispatch(action)
})

// middle((action, next) => {
//     console.log('middle, ', action)
//     action.status='succ'
//     next(action)
// })

// var add = create('add')

// add(1234)
