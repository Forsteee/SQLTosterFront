import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {ITests} from "./interfaces/ITests";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

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

    const userAuthent = useSelector(selectUser);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [allTests, setAllTests] = useState<ITests[]>([]);

    useEffect(()=>{
        loadTests();
    }, [])

    const loadTests = async () => {
    if(userAuthent){
       await axios.get('http://localhost:3001/tests')
            .then(function (response){
                setAllTests(response.data);
                setLoading(true);
            })
            .catch(function (error){
                setLoading(true);
                setError(error);
            })}
    else{
        //переделать под запрос на получение тестов для неавторизованных пользователей
        await axios.get('http://localhost:3001/tests')
            .then(function (response){
                setAllTests(response.data);
                setLoading(true);
            })
            .catch(function (errors){
                setLoading(true);
                setError(errors.message);
                console.log(error)
            })
        }
    }
    return (
        <div>
            <Container maxWidth="md">
                <Paper className={classes.paper}>
                    <img src={imgsrc} className={classes.icontttt}/>
                </Paper>
            </Container>
            <Container maxWidth="sm" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.heading}>
                    Онлайн-курсы
                </Typography>
                {loading && !error && allTests.map(test =>
                    <Paper className={classes.paper}>
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Уровень {test.level}
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        {test.name}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        {test.description}
                                    </Typography>
                                </CardContent>
                            </Grid>
                            <Grid item>
                                <img src={test.img} className={classes.icon}/>
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
                )}
                {loading && error &&
                <div>Ошибка при загрузке тестов: {error}</div>
                }
                {!loading && <CircularProgress/>}
            </Container>
        </div>
    );
}