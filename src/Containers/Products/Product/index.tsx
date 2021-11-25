import React, { useState } from "react"
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    Button,
    CardActions,
    // Typography,
    Select,
    MenuItem,
    // FormControl,
    InputLabel
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"

const useStyles = makeStyles({
    root: {
        width: "100vw",
        height: "100vh",
        paddingTop: "15px"
    },
    title: {
        height: "10px"
    },
    btn: {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
        marginRight: "15px",
        marginLeft: "15px"
    },
    qty: {
        maxWidth: "30px",
        maxHeight: "30px",
        minWidth: "30px",
        minHeight: "30px",
        marginRight: "15px",
        marginLeft: "15px"
    }
})

interface IProduct {
    product: {
        id: number,
        price: number,
        title: string,
        description: string,
        image: string,
        category?: string
    },
    onClick: (id: number) => void
}

const Product = ({ product, onClick }: IProduct) => {
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const { id, image } = product

    return (
        <Grid item sm={3}>
            <Card>
                <CardActionArea>
                    <CardMedia
                        onClick={() => onClick(id)}
                        component="img"
                        image={image}
                        style={{ height: 300 }}
                    />
                    
                    <CardActions>
                        {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
                            <InputLabel id="demo-simple-select-helper-label">
                                Quantity
                            </InputLabel>
                            <Select
                                className={classes.qty}
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={qty}
                                label="Quantity"
                                onChange={(e) => setQty(e.target.value as number)}
                            >
                                {/* <MenuItem value="">
                                    <em>Quantity</em>
                                </MenuItem> */}
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                            </Select>
                        {/* </FormControl> */}
                        <Button
                            className={classes.btn}
                            size="small"
                            variant="contained"
                            onClick={() => {
                                let newProduct = {
                                    qty: qty,
                                    ...product,
                                    type: "product"
                                }
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: newProduct
                                })
                                console.log("Add a Product to Cart", newProduct)
                            }}
                        >
                            Add
                        </Button>
                        {/* <Typography className={classes.title} variant="h7">
                            Price : {price}
                        </Typography> */}
                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default Product
