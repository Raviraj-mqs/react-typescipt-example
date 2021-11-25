import { CartItems } from "./cartReducer";

export enum ActionType {
    PRODUCTS_LIST_BEGIN='PRODUCTS_LIST_BEGIN',
    PRODUCTS_LIST_FAILURE='PRODUCTS_LIST_FAILURE',
    PRODUCTS_LIST_SUCCESS='PRODUCTS_LIST_SUCCESS',
    ADD_TO_CART='ADD_TO_CART',
    DELETE_FROM_CART='DELETE_FROM_CART',
    REMOVE_FROM_CART='REMOVE_FROM_CART'
}

interface startAction {
    type: 'PRODUCTS_LIST_BEGIN'
}

interface failAction {
    type: 'PRODUCTS_LIST_FAILURE',
    payload: string
}
interface successAction {
    type: 'PRODUCTS_LIST_SUCCESS',
    payload: CartItems[]
}

interface addToCartAction {
    type: 'ADD_TO_CART',
    payload: CartItems
}
interface deleteFromCartAction {
    type: 'DELETE_FROM_CART',
    payload: CartItems
}

interface removeFromCartAction {
    type: 'REMOVE_FROM_CART',
    payload: CartItems
}

export type Action = startAction | failAction | successAction | addToCartAction | deleteFromCartAction | removeFromCartAction