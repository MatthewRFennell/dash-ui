import * as React from 'react'

import Paper from '@material-ui/core/Paper';

const style = {
    height: 96,
    width: "100vw"
}

import './Banner.scss'
import { Button } from '@material-ui/core';

const Banner = () => {
    return (
        <Paper className="banner-paper">
            <h1 className="logo">Dash</h1>
            <div className="logo-container">
                <Button variant="outlined"
                    color="primary"
                    className="chang-blue-font">
                    Account
                </Button>
            </div>
        </Paper>
    )
}

export default Banner