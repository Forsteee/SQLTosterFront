import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import HeaderForProfile from "./Headerforprofile";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Avatar} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
//import CircularProgressWithLabel from "./CircularProgressWithLabel";
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{

        },
        main:{

        },
        headT:{
            padding: '1%',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop:'3%',

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
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor:'#54AD54',
            color:'white',
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
    }),
);

const imgsrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa57gjoZOz-fWpMTybuMsAaow0Wv5Sa-u6td_00_bIsDB42hjNgsIlYT92iVzX8Jp3Xmo&usqp=CAU';
const nameforPr = 'SQL Lite Mode';
const levelI = '4/8';
const progress = 50;

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function MyCourses() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <HeaderForProfile/>
            <Container maxWidth="sm" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.headT}>
                    Мои курсы
                </Typography>
            <Paper className={classes.paper} elevation={3}>
                <Grid container spacing={3} direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <div className={classes.logotype}>
                            <Link color="inherit" href='/'><Avatar src={imgsrc} variant="square" className={classes.imgP} /></Link>
                            <Typography variant="h6" className={classes.nameforP}>
                                <Link color="inherit" href='/' underline='none'><Hidden xsDown>{nameforPr}</Hidden></Link>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item>
                        Пройдено {levelI}<br/>
                        <CircularProgressWithLabel value={progress} /><br/>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="default"
                            className={classes.submit}
                        >
                            Продолжить
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
            </Container>
        </div>
    );
}