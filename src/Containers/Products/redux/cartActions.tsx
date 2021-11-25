import { Dispatch } from "redux";
import { Action, ActionType } from "./cartActionTypes";
import axios from 'axios'

export const getProductsList = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({type: "PRODUCTS_LIST_BEGIN"})
        axios
            .get("http://localhost:3000/products")
            .then(({ data }) => {
                console.log("[DATA]", data)
                dispatch(
                    {
                        type: 'PRODUCTS_LIST_SUCCESS',
                        payload: data
                    })
            })
            .catch((error) =>{ 
                console.log('[ERROR]',error)
                dispatch(
                    {
                        type: 'PRODUCTS_LIST_FAILURE',
                        payload: error.message
                    })
                })
    }
}