import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles,useTheme  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axiosAuth from "./api/AxiosConfig";
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {withRouter, RouteComponentProps, useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {ITasks} from "./interfaces/ITasks";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
        },
        main:{
        },
        faq:{
            padding: theme.spacing(1,0,1,0),
        },
        rightB:{
            textAlign: 'right',
        },
        heightT:{
            height:'228px',
        },
        borderC:{
        },
    }),
);

interface TestProps extends RouteComponentProps {
    testId: number;
}

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

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function isObject(val: any) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function Test(props: TestProps) {

    const classes = useStyles();
    const theme = useTheme();

    const userAuth = useSelector(selectUser);

    const params = useParams<{testId: string}>();

    const [tasks,setTasks] = useState<ITasks[]>();// массив с заданиями определенного теста
    const [numbersTask,setNumberTask] = useState<number>(1); // номер текущего задания на котором остановился пользователь (закладка)
    const [finished,setFinished] = useState<boolean>(false); // отметка о завершении
    let countTasks: number; // количество задания в тесте
    const[testingUser,setTestingUser] = useState<{id:number,marker:number,finished:boolean}>();// тут лежит закладка и отметка о завершении
    useEffect(()=> {
        signUpForTest();
        loadTesting();
    },[userAuth])

    useEffect(()=> {
        loadTasks();
    },[])
    // добавляет запись в бд (привязвает пользователя к тесту и ставит закладку)
    // если пользователь с тестом уже записаны в бд то ничего не делает
    const signUpForTest = async () => {
        if(userAuth){
            await axios.post('http://localhost:3001/testing',{
                userId:userAuth.user_id,
                testId:params.testId
            }).then(function (response){
                /*console.log('пользователь зареган на тест')
                console.log(response)*/
            }).catch(function (error){
                //console.log(error.message)
            })
        }else{
           // console.log('войдите в систему')
        }
    }
    // выгружает все задания данного теста
    // и записывает количество заданий
    const loadTasks = async () => {
            await axios.get(`http://localhost:3001/task/${params.testId}`).then(function (response) {
                //console.log(response);
                setTasks(response.data);
                countTasks = response.data!.length;
                console.log(countTasks);
            }).catch(function (error) {
                console.log(error.message)
            })
    }

    // выгружает прогресс пользователя по тесту
    // меняет стайты закладки и отметки о завершении
    const loadTesting = async () => {
        if (userAuth) {
            await axios.get(`http://localhost:3001/testing/${userAuth.user_id}/${params.testId}`)
                .then(function (response) {
                    //console.log(response.data);
                    setTestingUser(response.data);
                    setNumberTask(response.data.marker);
                    setFinished(response.data.finished);
                }).catch(function (error){
                    console.log(error.message);
                })
        }
    }

    const [answer, setAnswer] = React.useState('');// ответ пользователя
    const [standart, setStandart] = React.useState('');

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };


    const [upperPanel, setUpperPanel] = React.useState(0);

    const handleChangeUpperPanel = (event: React.ChangeEvent<{}>, newValue: number) => {
        setUpperPanel(newValue);
    };

    const [lowPanel, setLowPanel] = React.useState(0);

    const handleChangeLowPanel = (event: React.ChangeEvent<{}>, newValue: number) => {
        setLowPanel(newValue);
    };

    const [openSnackS, setOpenSnackS] = React.useState(false);
    const [openSnackEr, setOpenSnackEr] = React.useState(false);
    const [openSnackErToReq, setOpenSnackErToReq] = React.useState(false);
    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackS(false);
        setOpenSnackEr(false);
        setOpenSnackErToReq(false);
    };



    const bodyParameters = {
        request: answer,
    };
    const [res,setRes] = useState('');
    const [columns,setColumns] = useState<GridColDef[]>([]);// колонки ебать для таблицы
    const [rows, setRows] = useState<[]>([]);// строки ебать для таблицы

    const handleClickReq = async () => {
        await axiosAuth.post('/testingapi',
            bodyParameters)
            .then(function (response){
                if(isObject(response.data[0])){
                    // заполнение колонок
                    const columnsFromRes = Object.keys(response.data[0]);
                    let columnsForColDef: GridColDef[] = [];
                    columnsFromRes.forEach((item:string)=>{
                        columnsForColDef.push({ field: item, headerName: item })
                    })
                    setColumns(columnsForColDef);
                    //заполнение строк
                    setRows(response.data);
                    setOpenSnackS(true);
                }else{
                    //сообщение об ошибке
                    setRes(response.data.message);
                    setOpenSnackErToReq(true);
                }
            }).catch(function (error){
                console.log(error);
                setOpenSnackEr(true);
            })
    }

    // кнопка на переход к след заданию
    // очистить поле ввода
    // (сменить задание
    // сменить эталон
    // сменить скрин бд) => меняется с сетнумбертаском
    // очистить результат запроса
    //!!!!!!СДЕЛАТЬ ЛОГИКУ ФИНИША, МЕНЯТЬ СОДЕРЖИМОЕ СТРАНИЦЫ ИЛИ МЕНЯТЬ ФУНКЦИОНАЛ КНОПКИ (ПЕРЕЙТИ НА ГЛАВНУЮ НАПРИМЕР)!!!!!!!!!!!
    const hadleClickNextTask = async () => {
        setAnswer('');// очистка поля ввода
        setColumns([]);// чистим
        setRows([]);// вывод
        if(numbersTask === countTasks){
            setFinished(true);
            await axios.put(`http://localhost:3001/testing/${testingUser!.id}`,{
                marker: numbersTask,
                finished: true,
            }).then(function (response){
                console.log(response)
            }).catch(function (error){
                console.log(error)
            })
        }else{
            setNumberTask((prev) => { return prev + 1})
            await axios.put(`http://localhost:3001/testing/${testingUser!.id}`,{
                marker: numbersTask + 1,
                finished: false,
            }).then(function (response){
                console.log(response)
            }).catch(function (error){
                console.log(error)
            })
        }
    }
    const db = '<iframe width = "100%" height = "500px" style = "box-shadow: 0 2px 8px 0 rgba (63,69,81,0.16); border-radius: 15px;" allowtransparency = "true" allowfullscreen = "true" scrolling = "no" title = "Встроенный IFrame DrawSQL" frameborder = "0" src = "https://drawsql.app/sqltoster/diagrams/car/embed"> </ iframe >';

    return (
        <div>
            {tasks &&
            <Container maxWidth="md" className={classes.main}>
                <Grid container
                      direction="column"
                      justify="center"
                      className={classes.borderC}
                >
                    <Snackbar open={openSnackS} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="success">
                            Запрос выполнен, результат во вкладке 'Результат запроса'!
                        </Alert>
                    </Snackbar>
                    <Snackbar open={openSnackEr} autoHideDuration={6000} onClose={handleCloseSnack}>
                        <Alert onClose={handleCloseSnack} severity="error">
                            Уууупс, произошла ошибка!
                        </Alert>
                    </Snackbar>
                    <Snackbar
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        open={openSnackErToReq}
                        onClose={handleCloseSnack}
                    >
                        <Alert onClose={handleCloseSnack} severity="error">
                            {res}
                        </Alert>
                    </Snackbar>
                    <Grid item>
                        <Grid container spacing={3} className={classes.faq}>
                            <Grid item xs={4}>
                                <Paper elevation={3}>
                                    {tasks![(numbersTask - 1)].description}
                                </Paper>
                            </Grid>
                            <Grid item xs={8}>
                                <AppBar position="static" color="default">
                                    <Tabs
                                        value={upperPanel}
                                        onChange={handleChangeUpperPanel}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        variant="fullWidth"
                                        aria-label="full width tabs example"
                                    >
                                        <Tab label="Поле ввода" {...a11yProps(0)} />
                                        <Tab label="Эталон" {...a11yProps(1)} />
                                    </Tabs>
                                </AppBar>
                                <div className={classes.heightT}>
                                    <TabPanel value={upperPanel} index={0} dir={theme.direction}>
                                        <TextField
                                            id=""
                                            multiline
                                            rows={5}
                                            placeholder="Поле ввода"
                                            variant="outlined"
                                            value={answer}
                                            onChange={handleChangeAnswer}
                                            fullWidth
                                        />
                                        <div className={classes.rightB}>
                                        <Button variant="contained"
                                                size="small"
                                                color="primary"
                                                onClick={handleClickReq}
                                        >
                                            Отправить
                                        </Button>
                                        </div>
                                    </TabPanel>
                                    <TabPanel value={upperPanel} index={1} dir={theme.direction}>
                                        <TextField
                                            id=""
                                            multiline
                                            rows={5}
                                            placeholder="Поле ввода"
                                            variant="outlined"
                                            value={tasks![(numbersTask - 1)].standard}
                                            fullWidth
                                            disabled
                                        />
                                    </TabPanel>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={lowPanel}
                                onChange={handleChangeLowPanel}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Схема базы данных" {...a11yProps(0)} />
                                <Tab label="Результат запроса" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <div className={classes.heightT}>
                            <TabPanel value={lowPanel} index={0} dir={theme.direction}>
                                {/*<TextField
                                    id=""
                                    multiline
                                    rows={20}
                                    placeholder="Схема БД"
                                    variant="outlined"
                                    fullWidth
                                />*/}
                                <div dangerouslySetInnerHTML={{__html: db}} />
                            </TabPanel>
                            <TabPanel value={lowPanel} index={1} dir={theme.direction}>
                                <DataGrid rows={rows} columns={columns} pageSize={7} autoHeight={true} />
                            </TabPanel>
                        </div>
                    </Grid>
                    <Button variant="contained"
                            size="small"
                            color="primary"
                            onClick={hadleClickNextTask}
                    >
                        Перейти к следующему заданию
                    </Button>
                </Grid>
            </Container>
            }
        </div>
    );
}
export default withRouter(Test);