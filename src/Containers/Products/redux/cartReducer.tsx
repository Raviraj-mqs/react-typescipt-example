import { Action, ActionType } from './cartActionTypes';

// ******* local storage with typescript *******

// type of JSON.parse dependency must be a string
// But the local storage return type is string|null so it can be both string and null and when you declare the data, its value is null until you render the component (or call the function) and then call the getItem function, it gets the value, and then it's a string.

// You can use || operation and add a string to it so that it is not null anymore.

const cartLocal = JSON.parse(localStorage.getItem("cart") || '')
const totalCartItemLocal: number = JSON.parse(localStorage.getItem("totlCartItems") || '')
const initialState = cartLocal
    ? {
          cartItems: cartLocal,
          totalItems: totalCartItemLocal,
          loading: false,
          errors: null,
          products: [],
          cartTotal: 0
      }
    : {
          cartItems: [],
          totalItems: 0,
          loading: false,
          errors: null,
          products: [],
          cartTotal: 0
      }

export interface CartItems {
    id: number,
    price: number,
    title: string,
    description: string,
    image: string,
    category: string,
    qty: number,
    type?:string
}

interface State {
    cartItems: CartItems[],
    products: CartItems[],
    loading: boolean,
    errors: string | null,
    totalItems: number
}


const cartReducer = (state: State = initialState, action: Action): State => {
    switch(action.type) {
        case 'PRODUCTS_LIST_BEGIN':
            return {
                ...state,
                loading: true,
                errors: null
            }
        
        case 'PRODUCTS_LIST_FAILURE':
            return {
                ...state,
                loading: false,
                errors: action.payload
            }

        case 'PRODUCTS_LIST_SUCCESS':
            return {
                ...state,
                loading: false,
                errors: null,
                products: action.payload
            }

        case 'ADD_TO_CART':

            let alreadyExists = false
            state.cartItems.map((item) => {
                if (item.id === action.payload.id) {
                    alreadyExists = true
                    // item.qty++
                    if (action.payload.type === "cart") {
                        item.qty++
                    } else {
                        item.qty = item.qty + action.payload.qty
                    }
                }
            })
            if (!alreadyExists) {
                // state.cartItems.push({ ...action.payload, qty: 1 })
                state.cartItems.push({ ...action.payload })
            }
            let cart = localStorage.setItem("cart", JSON.stringify(state.cartItems))
            console.log('cart',cart)
            localStorage.setItem(
                "totlCartItems",
                JSON.stringify(
                    action.payload.type === "cart"
                            ? state.totalItems + 1
                        : state.totalItems + action.payload.qty
                )
            )
            return {
                ...state,
                cartItems: state.cartItems,
                totalItems:
                    action.payload.type === "cart"
                        ? state.totalItems + 1
                        : state.totalItems + action.payload.qty
            }

        case 'REMOVE_FROM_CART':
            state.cartItems.map((item) => {
                if (item.id === action.payload.id) {
                    item.qty--
                }
            })
            localStorage.setItem("cart", JSON.stringify(state.cartItems))
            localStorage.setItem(
                "totlCartItems",
                JSON.stringify(state.totalItems - 1)
            )
            return {
                ...state,
                cartItems: state.cartItems,
                totalItems: state.totalItems - 1
            }

        case 'DELETE_FROM_CART':
            
            let newArray = state.cartItems.filter((item) => {
                return item.id !== action.payload.id
            })

            localStorage.setItem("cart", JSON.stringify(newArray))
            localStorage.setItem(
                "totlCartItems",
                JSON.stringify(state.totalItems - action.payload.qty)
            )
            return {
                 ...state,
                cartItems: newArray,
                totalItems: state.totalItems - action.payload.qty
            }

        default:
            return state
    }
}

export default cartReducer

    