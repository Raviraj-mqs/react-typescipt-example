import React, { useEffect, useState } from "react"
import {
    Table,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Button,
    Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypeSelector"

const useStyles = makeStyles({
    table: {
        width: "90%",
        margin: "50px 0 0 50px"
    },
    thead: {
        "& > *": {
            fontSize: 20,
            background: "#000000",
            color: "#FFFFFF"
        }
    },
    row: {
        "& > *": {
            fontSize: 18
        }
    },
    btn: {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
        marginRight: "15px",
        marginLeft: "15px"
    }
})

interface CartItem {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    qty: number;
}

const CartItems = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const { cartItems, totalItems } = useTypedSelector((state) => state.cart)

    const [totalSum, setTotalSum] = useState(0)

    const cartTotal = (cartItems: CartItem[]) => {
        let grandTotal = cartItems.reduce((acc, curr) => {
            let cur = curr.price * curr.qty
            return acc + cur
        }, 0)
        setTotalSum(grandTotal)
    }

    useEffect(() => {
        cartTotal(cartItems)
    }, [cartItems, totalItems])
    return cartItems?.length ? (
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cartItems.map((item, index) => (
                    <TableRow className={classes.row}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            {item.title.length > 25
                                ? `${item.title.substring(0, 25)}...`
                                : item.title}
                        </TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>
                            <Button
                                className={classes.btn}
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    item.qty > 1
                                        ? dispatch({type: "REMOVE_FROM_CART", payload: item})
                                        : dispatch({type: "DELETE_FROM_CART", payload: item})
                                }}
                                disabled={!item.qty}
                            >
                                -
                            </Button>
                            {item.qty}
                            <Button
                                className={classes.btn}
                                size="small"
                                variant="contained"
                                onClick={() => {
                                    const payload = {
                                        ...item,
                                        type: "cart"
                                    }
                                    dispatch({
                                    type: "ADD_TO_CART",
                                    payload: payload
                                })
                                }}
                            >
                                +
                            </Button>
                        </TableCell>
                        <TableCell>{item.price * item.qty}</TableCell>
                        <TableCell>
                            <Button
                                onClick={() => dispatch({
                                    type: 'DELETE_FROM_CART',
                                    payload: item
                                })}
                            >
                                DELETE
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <br />
            <br />
            <Typography variant="h6">
                Cart Total {totalSum.toFixed(2)}
            </Typography>
        </Table>
    ) : (
        <Typography variant="h6">Your cart is empty</Typography>
    )
}

export default CartItems
