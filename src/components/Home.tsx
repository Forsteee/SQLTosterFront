import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {ITests} from "./interfaces/ITests";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

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
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardMedia: {
            paddingTop: '56.25%', // 16:9
        },
        cardContent: {
            flexGrow: 1,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
        },
        img: {
            height: 255,
            display: 'block',
            maxWidth: 1000,
            overflow: 'hidden',
            width: '100%',
        },
        mrg:{
            paddingTop:'20px',
        },

    }),
);
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        id: 1,
        imgPath: 'https://storage.googleapis.com/hackersandslackers-cdn/2019/02/SQLpt1-3.jpg',
    },
    {
        id: 2,
        imgPath:
            'https://it-black.ru/wp-content/uploads/2018/06/order-by.jpg',
    },
    {
        id: 3,
        imgPath:
            'https://miro.medium.com/max/1200/0*U7MaO_xqQl13bjXH.jpg',
    },
    {
        id: 4,
        imgPath:
            'https://thumbs.dreamstime.com/b/%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F-%D1%81%D0%BB%D0%BE%D0%B2%D0%B0-sql-137812620.jpg',
    },
    {
        id: 5,
        imgPath:
            'https://i.ytimg.com/vi/qmwKiuKDPBQ/maxresdefault.jpg',
    },
];


export default function Reg() {

    const classes = useStyles();

    const theme = useTheme();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [allTests, setAllTests] = useState<ITests[]>([]);

    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    }

    const handleStartTest = (testId:any) => {

    }

    const user = useSelector(selectUser);

    useEffect(()=>{
        loadTests();
    }, [user])


    const loadTests = async () => {
    if(user){
       await axios.get(`http://localhost:3001/tests/allauth/${true}`
           )
            .then(function (response){
                setLoading(true);
                setAllTests(response.data);
            })
            .catch(function (error){
                setLoading(true);
                setError(error.message);
            })}
    else{
        //переделать под запрос на получение тестов для неавторизованных пользователей
        await axios.get(`http://localhost:3001/tests/allauth/${false}`
        )
            .then(function (response){
                setLoading(true);
                setAllTests(response.data);
            })
            .catch(function (error){
                setLoading(true);
                setError(error.message);
            })}
    }

    return (
        <div>
            <Container maxWidth="md" className={classes.mrg}>
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {tutorialSteps.map((step, index) => (
                        <div key={step.id}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img className={classes.img} src={step.imgPath} />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            Back
                        </Button>
                    }
                />
            </Container>
            <Container maxWidth="md" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.heading}>
                    Онлайн-курсы
                </Typography>
                    <Container className={classes.cardGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            {loading && !error && allTests.map(test =>
                                <Grid item key={test.id} xs={12} sm={6} md={4}>
                                    <Card className={classes.card}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={test.img}
                                            title="Image title"
                                        />
                                        <CardContent className={classes.cardContent}>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Уровень {test.level}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {test.name}
                                            </Typography>
                                            <Typography>
                                                {test.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                type="submit"
                                                fullWidth
                                                size='small'
                                                variant="outlined"
                                                color="default"
                                                key={test.id}
                                                className={classes.submit}
                                                href={`/test/${test.id}`}
                                                //onClick={(e)=>handleStartTest(test.id)}
                                            >
                                                Начать
                                            </Button>
                                        </CardActions>
                                    </Card>
                                    </Grid>
                            )}
                        </Grid>
                    </Container>

                {loading && error &&
                <div>Ошибка при загрузке тестов: {error}</div>
                }
                {!loading && <CircularProgress/>}
            </Container>
        </div>
    )
}