import React, { useEffect, useState } from "react"
import {
    Container,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    CardMedia,
    Typography
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"

const useStyles = makeStyles({
    root: {
        width: "70vw",
        height: "100vh",
        paddingTop: "15px"
    }
})

type IViewProductProps = {
    match:{
        params:{
            id: number
        }
    }
}

interface IProduct {
    id: number,
    price: number,
    title: string,
    description: string,
    image: string,
    category?: string
}

const ViewProduct = ({ match }:IViewProductProps) => {
    const [product, setProduct] = useState<IProduct | null>(null)
    const classes = useStyles()
    const { id } = match.params

    const fetchProductDetails = async (productId: number) => {
         await axios
            .get(`http://localhost:3000/products/${productId}`)
            .then(({data}) => setProduct(data))
            .catch((error) =>
                console.log("Error in fetching a product's details", error)
            )

        // setProduct(data)
    }

    useEffect(() => {
        fetchProductDetails(id)
    }, [id])

    return (
        <div>
            <Typography variant="h4">Product Details</Typography>

            {product && (
                <Container className={classes.root}>
                    <Grid container xs={12}>
                        <Grid item sm={8}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={product.image}
                                        style={{ height: 400 }}
                                    />
                                    <CardContent>
                                        <Typography variant="h5">
                                            {product.title}
                                        </Typography>
                                        <Typography variant="subtitle1">
                                            {product.description}
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                    <Button>+</Button>
                    <Button>-</Button>
                  </CardActions> */}
                                </CardActionArea>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </div>
    )
}

export default ViewProduct
