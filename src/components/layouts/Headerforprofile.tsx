import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import {Avatar} from "@material-ui/core";
import {IUserForHeader} from "../interfaces/IUserForHeader";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop:'5%',
        },
        imgP:{
            margin: 'auto',
            height: '100px',
            width:'100px',
        },
        logotype:{
            height: '100%',
            display: 'flex',
            alignItems:'center',
        },
        nameforP:{
            marginLeft:'5px',
        },
    }),
);

const imgsrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolB5qnrVtoZiGNsC7s-UFI30kpFIy1D6VHGopGhEHSA-3a8fxAI_YN-Jei-uHqYImGjM&usqp=CAU';
const nameforPr = 'Razzebuuuu';
const levelI = '2/10';

export default function HeaderForProfile(user:IUserForHeader) {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
                <Paper className={classes.paper}>
                    <Grid container spacing={3} direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <div className={classes.logotype}>
                        <Link color="inherit" href='/'><Avatar src={user.img} variant="square" className={classes.imgP} /></Link>
                        <Typography variant="h6" className={classes.nameforP}>
                            <Link color="inherit" href='/' underline='none'><Hidden xsDown>{user.name}</Hidden></Link>
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                    Уровень знаний<br/>
                    {user.levelBrains}<br/><br/>
                    <Link color="primary" href='/editing'>Редактировать профиль</Link>
                </Grid>
                    </Grid>
                </Paper>
        </Container>
    );
}