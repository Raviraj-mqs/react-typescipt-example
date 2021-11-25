import React, { useEffect } from "react"
import { useHistory } from "react-router"
import Product from "../Product"
import { Container, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch } from "react-redux"
import { getProductsList } from "../redux/cartActions"
import { useTypedSelector } from "../../../hooks/useTypeSelector"

// interface IAllProducts {
//     id: number,
//     price: number,
//     title: string,
//     description: string,
//     image: string,
//     category?: string
// }

const useStyles = makeStyles({
    root: {
        width: "100vw",
        height: "100vh",
        paddingTop: "15px"
    }
})

const ProductsList = () => {
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()

//    const [products, setProducts] = useState<IAllProducts[] | null>([])
   const { products, loading } = useTypedSelector((state) => state.cart)

    // const fetchAllProducts = async () => {
    //     setLoading(true)
    //     await axios
    //         .get("http://localhost:3000/products")
    //         .then(({ data }) =>  {
    //             setProducts(data)
    //             setLoading(false)
    //         })
    //         .catch((error) => console.log("Error in fetching products", error))

    // }

    const handleOnClick = (id: number) => {
        history.push(`/products/${id}`)
    }

    useEffect(() => {
        // fetchAllProducts()
        dispatch(getProductsList())
    }, [])

    return !loading ? (
        <>
            <Typography variant="h4">ProductsList</Typography>
            <Container className={classes.root}>
                <Grid container xs={12} spacing={3}>
                    {products?.map((product) => (
                        <Product
                            product={product}
                            key={product.id}
                            onClick={(id) => handleOnClick(id)}
                        />
                    ))}
                </Grid>
            </Container>
        </>
    ): <Typography variant="h5">Fetching products ...</Typography>
}

export default ProductsList