import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import Grid from '@material-ui/core/Grid';
import Link from "@material-ui/core/Link";
import {Avatar} from "@material-ui/core";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {


        },

        title: {
            fontSize: 14,
        },
        paper: {
            padding: theme.spacing(0,2,0,2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop:'3%',


        },
        heading:{
            paddingTop:'20px',
        },
        cText:{

        },
        icon:{
            margin: 'auto',
            height: '70px',
            width:'70px',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor:'#54AD54',
            color:'white',
            width: '90%',
            '&:hover': {
                backgroundColor: '#6ADA6A',
                borderColor: '#6ADA6A',
                boxShadow: 'none',
            },
            '&:active': {
                boxShadow: 'none',
                backgroundColor: '#6ADA6A',
                borderColor: '#6ADA6A',
            },
        },
        pText:{
            padding:'0px',
        },
        icontttt:{
            width:'100%',
            height: '35vh',
        },
        main:{
          paddingBottom:'2%',
        },

    }),
);
const imgsrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRolB5qnrVtoZiGNsC7s-UFI30kpFIy1D6VHGopGhEHSA-3a8fxAI_YN-Jei-uHqYImGjM&usqp=CAU';

export default function Reg() {

    const classes = useStyles();

    return (

        <div>
            <Container maxWidth="md">
                <Paper className={classes.paper} >
                    <img src={imgsrc} className={classes.icontttt}/>
                </Paper>
            </Container>
    <Container  maxWidth="sm"  className={classes.main}>

        <Typography component="div" variant="h5" className={classes.heading}>
            Онлайн-курсы
        </Typography>

        <Paper className={classes.paper} >
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Test1
                        </Typography>
                        <Typography  color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item>
                    <LibraryBooksIcon className={classes.icon}/>
                    <Button
                        type="submit"
                        fullWidth
                        size='small'
                        variant="outlined"
                        color="default"
                        className={classes.submit}
                    >
                        Начать
                    </Button>
                </Grid>
            </Grid>
        </Paper>


        <Paper className={classes.paper}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Test2
                        </Typography>
                        <Typography  color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item>
                    <LibraryBooksIcon className={classes.icon}/>
                    <Button
                        type="submit"
                        fullWidth
                        size='small'
                        variant="outlined"
                        color="default"
                        className={classes.submit}
                    >
                        Начать
                    </Button>
                </Grid>
            </Grid>
        </Paper>

        <Paper className={classes.paper} >
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Word of the Day
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Test3
                        </Typography>
                        <Typography  color="textSecondary">
                            adjective
                        </Typography>
                        <Typography variant="body2" component="p">
                            well meaning and kindly.
                            <br />
                            {'"a benevolent smile"'}
                        </Typography>
                    </CardContent>
                </Grid>
                <Grid item>
                    <LibraryBooksIcon className={classes.icon}/>
                    <Button
                        type="submit"
                        fullWidth
                        size='small'
                        variant="outlined"
                        color="default"
                        className={classes.submit}
                    >
                        Начать
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
        </div>
    );
}