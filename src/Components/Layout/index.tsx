import React from "react"
import { Box, Grid } from "@material-ui/core"
import Header from "../Header"
// import Footer from "../Footer.js"

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
       <Box>
            <Grid>
                <Header />
                <div>{children}</div>
                {/* <Footer /> */}
            </Grid>
        </Box>    
    )
}

export default Layout