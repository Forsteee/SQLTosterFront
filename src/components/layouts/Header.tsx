import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../images/logo.png';
import {Avatar} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Help from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import  MenuAuth from './Authmenu'
import {useSelector} from "react-redux";
import {selectUser} from "../../features/userSlice";
//import styles = module

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {

        },
        colored:{
            backgroundColor: '#2F2E33',
        },
        logo:{
            margin: 'auto',
            height: '50px',
            width:'50px',
        },
        logotype:{
            height: '100%',
            display: 'flex',
            alignItems:'center',
        },
        height50px:{
            minHeight: '50px',
            height:'50px',

        },
        linkcenterp:{

        },
        linq:{
            paddingRight:'11px',// доделать отступы между элементами
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

export default function MenuAppBar() {
    const classes = useStyles();

    const userAuthent = useSelector(selectUser);

    const [checkUser,setCheckUser] = useState('');

    useEffect(()=>{
        if(userAuthent) setCheckUser('/mycourses')
        else setCheckUser('')
    },[userAuthent])

    return (
            <AppBar position="static" className={classes.colored}>
                <Toolbar className={classes.height50px}>
                    <Grid container direction="row" justify="space-evenly" alignItems="center">
                        <Grid item>
                    <div className={classes.logotype}>
                        <Link color="inherit" href='/'><Avatar src={logo} variant="square" className={classes.logo} /></Link>
                        <Typography variant="h6" className={classes.title}>
                            <Link color="inherit" href='/' underline='none'><Hidden xsDown>SQL Toster</Hidden></Link>
                        </Typography>
                    </div>
                        </Grid>
                        <Grid item className={classes.linkcenterp}>
                        <Link color="inherit" href={checkUser} className={classes.linq}>
                            <IconButton color="inherit">
                                <WhatshotIcon className={classes.icon}/>
                                <Typography variant="body1"><Hidden xsDown>Мои курсы</Hidden></Typography>
                            </IconButton>
                        </Link>
                        <Link color="inherit" href="/library" className={classes.linq}>
                            <IconButton color="inherit">
                            <LocalLibraryIcon className={classes.icon} />
                                <Typography variant="body1"><Hidden xsDown>Материал</Hidden></Typography>
                            </IconButton>
                        </Link>
                        <Link color="inherit" href="/faq">
                            <IconButton color="inherit">
                            <Help className={classes.icon} />
                                <Typography variant="body1"><Hidden xsDown>FAQ</Hidden></Typography>
                            </IconButton>
                        </Link>
                            </Grid>
                    <div>
                        <MenuAuth/>
                    </div>
                    </Grid>
                </Toolbar>
            </AppBar>
    );
}