import React, {useEffect, useState} from 'react';
import { makeStyles, createStyles, useTheme, Theme } from '@material-ui/core/styles';
import HeaderForProfile from "./layouts/Headerforprofile";
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
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import axios from "axios";
import {IUserForHeader} from "./interfaces/IUserForHeader";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
            alignItems:'center',
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
        tabs:{
          width: '600px',
            marginLeft: '12%',
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

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const imgsrc = 'https://english-verbs.ru/words/select.jpeg';
const nameforPr = 'SELECT - Тест';
const levelI = '1/8';
const progress = 12.5;

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
    const theme = useTheme();
    const user = useSelector(selectUser);// или отсюда данные юзера или аксиосом

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [value, setValue] = React.useState(0);

    const [userAPI, setUserAPI] = useState<IUserForHeader>();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    useEffect(()=>{
        loaduser();
        console.log(userAPI);
    }, [user])

    const loaduser = async ()=>{
        if(user){
            await axios.get(`http://localhost:3001/users/${user.user_id}`)
                .then(function (response){
                    console.log(response)
                    setLoading(true);
                    setUserAPI(response.data)
                    //return response.data;
                    }
                ).catch(function (error){
                    setLoading(true);
                    setError(error.message);
                    }
                )
        }
    }
    //axios.get('http://localhost:3001/')

    return (
        <div className={classes.root}>
            {userAPI &&
            <HeaderForProfile name={userAPI!.name} surname={userAPI!.surname} login={userAPI!.login} img={userAPI!.img} levelBrains={userAPI!.levelBrains}/>
                &&
                <Container maxWidth="md">
                    <Paper className={classes.paper}>
                        <Grid container spacing={3} direction="row" justify="space-between" alignItems="center">
                            <Grid item>
                                <div className={classes.logotype}>
                                    <Link color="inherit" href='/'><Avatar src={userAPI.img} variant="square" className={classes.imgP} /></Link>
                                    <Grid direction="column">
                                    <Typography variant="h6" className={classes.nameforP}>
                                        <Link color="inherit" href='/' underline='none'><Hidden xsDown>{userAPI.login} </Hidden></Link>
                                    </Typography>
                                    <Typography variant="h6" className={classes.nameforP}>
                                        <Link color="inherit" href='/' underline='none'><Hidden xsDown>{userAPI.name} {userAPI.surname}</Hidden></Link>
                                    </Typography>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item>
                                Уровень знаний<br/>
                                {userAPI.levelBrains}<br/><br/>
                                <Link color="primary" href='/createTest'>Создать тест</Link><br/>
                                <Link color="primary" href='/editing'>Редактировать профиль</Link>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Container maxWidth="md" className={classes.main}>
                        <Typography component="div" variant="h5" className={classes.headT}>
                            Мои тесты
                        </Typography>
                                    <AppBar position="static" color="default">
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            indicatorColor="primary"
                                            textColor="primary"
                                            variant="fullWidth"
                                            aria-label="full width tabs example"
                                        >
                                            <Tab label="Мои тесты" {...a11yProps(0)} />
                                            <Tab label="Созданные тесты" {...a11yProps(1)} />
                                        </Tabs>
                                    </AppBar>
                    </Container>
                    <Container maxWidth="md" className={classes.main}>
                                    <TabPanel value={value} index={0} dir={theme.direction} >
                                        <div className={classes.tabs}>
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
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={value} index={1} dir={theme.direction}>

                                    </TabPanel>
                    </Container>
                </Container>
            }
        </div>
    );
}