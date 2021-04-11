import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import logo from '../../images/logo.png';
import {Avatar} from "@material-ui/core";
import {inspect} from "util";
import Link from '@material-ui/core/Link';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import  MenuAuth from './Authmenu'
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
            paddingRight:'15px',// доделать отступы между элементами
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
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
            <AppBar position="static" className={classes.colored}>
                {/*<FormGroup>
                <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>*/}
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
                        <Link color="inherit" href="/" className={classes.linq}>
                            <IconButton color="inherit">
                                <WhatshotIcon className={classes.icon}/>
                                <Typography variant="body1"><Hidden xsDown>Курсы</Hidden></Typography>
                            </IconButton>
                        </Link>
                        <Link color="inherit" href="/" className={classes.linq}>
                            <IconButton color="inherit">
                            <LocalLibraryIcon className={classes.icon} />
                                <Typography variant="body1"><Hidden xsDown>Библиотека</Hidden></Typography>
                            </IconButton>
                        </Link>
                        <Link color="inherit" href="/">
                            <IconButton color="inherit">
                            <InfoOutlinedIcon className={classes.icon} />
                                <Typography variant="body1"><Hidden xsDown>О нас</Hidden></Typography>
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