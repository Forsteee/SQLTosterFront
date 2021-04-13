import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
//import {PContainer} from "./MainPagination";
import Pagination from '@material-ui/lab/Pagination';
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Link from '@material-ui/core/Link';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{

        },
        main:{

        },
        heading:{
            textAlign:'center',
        },
        paper: {
            padding: theme.spacing(0,2,0,2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop:'3%',


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
        title: {
            fontSize: 14,
        },
    }),
);

export default function Library() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="sm" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.heading}>
                    Материалы
                </Typography>
                <Typography component="div" variant="h6" >
                    Язык SQL
                </Typography>
                <Typography component="div" variant="body1" >
                    В данном разделе учебнике использовались наиболее общие подходы к написанию SQL запросов.
                </Typography>

                <Paper className={classes.paper} >
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Глава 1: Введение
                                </Typography>
                                <Link>
                                    1.1 Основные понятия о базах данных
                                </Link>
                            </CardContent>
                        </Grid>
                        <Grid item>
                            <LocalLibraryIcon className={classes.icon}/>
                            <Button
                                type="submit"
                                fullWidth
                                size='small'
                                variant="outlined"
                                color="default"
                                className={classes.submit}
                            >
                                Читать
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {/*<Pagination count={10} />*/}
            </Container>
        </div>
    );
}
