import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="inherit">
            {'Copyright © '}
            SQL Toster
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        padding: theme.spacing(1, 0),
        marginTop: 'auto',
        backgroundColor:'#2F2E33',
        color:'white',
        textAlign:'center',
    }
}));

export default function StickyFooter() {
    const classes = useStyles();
    return (
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">ТюмГУ</Typography>
                    <Copyright />
                </Container>
            </footer>
    );
}