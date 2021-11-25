import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Button, Typography, Box } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useTypedSelector } from "../../hooks/useTypeSelector"

const useStyles = makeStyles({
    button: {
        "&:hover": {
            background: "black"
        }
    }
})

const Header = () => {
    const classes = useStyles()
    const { totalItems } = useTypedSelector((state) => state.cart)
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    
                    <Box display="flex" flexGrow={1}>
                        <Typography variant="h6">ReactApp</Typography>
                        
                        <Button
                            className={classes.button}
                            color="inherit"
                            component={Link}
                            to="/"
                        >
                            Home
                        </Button>
                        <Button
                            className={classes.button}
                            color="inherit"
                            component={Link}
                            to="/about"
                        >
                            About Us
                        </Button>
                        <Button
                            className={classes.button}
                            color="inherit"
                            component={Link}
                            to="/contact"
                        >
                            Contact Us
                        </Button>
                        <Button
                            className={classes.button}
                            color="inherit"
                            component={Link}
                            to="/products"
                        >
                            Products
                        </Button>
                   
                    </Box>
                    <Button
                        className={classes.button}
                        color="inherit"
                        component={Link}
                        to="/cart"
                    >
                        Cart {totalItems}
                    </Button>
                     

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header