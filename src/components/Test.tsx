import React, {useEffect, useState} from 'react';
import { Theme, createStyles, makeStyles,useTheme, withStyles, WithStyles } from '@material-ui/core/styles';
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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {withRouter, RouteComponentProps, useParams} from "react-router";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectUser} from "../features/userSlice";
import {ITasks} from "./interfaces/ITasks";
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import 'react-autocomplete-input/dist/bundle.css';
import TextInput from 'react-autocomplete-input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
        },
        main:{
        },
        faq:{
            //padding: theme.spacing(1,0,1,0),
        },
        rightB:{
            textAlign: 'right',
        },
        heightT:{
            height:'50%',
        },
        borderC:{
        },
        btnH:{
            //marginTop:'35%',
        },
        contH:{
        },
        ptpl:{
            paddingTop: '7px',
            paddingLeft: '7px',
        },
        autoCInp:{
            width:'100%',
            height:'100%',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);
const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    });

interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

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
    if (val === null || typeof val == "undefined") { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}

function Test(props: TestProps) {

    const classes = useStyles();
    const theme = useTheme();

    const userAuth = useSelector(selectUser);

    const params = useParams<{ testId: string }>();

    const [tasks, setTasks] = useState<ITasks[]>();// массив с заданиями определенного теста
    const [numbersTask, setNumberTask] = useState<number>(1); // номер текущего задания на котором остановился пользователь (закладка)
    const [finished, setFinished] = useState<boolean>(false); // отметка о завершении
    const [countTasks, setCountTasks] = useState<number>(1); // количество заданий в тесте
    const [testingUser, setTestingUser] = useState<{ id: number, marker: number, finished: boolean }>();// тут лежит закладка и отметка о завершении
    const [integrationLink, setIntegrationLink] = useState<string>('');
    const operators = ['SELECT', 'FROM', 'WHERE'];

    useEffect(() => {
        signUpForTest();
        loadTesting();
    }, [userAuth])

    useEffect(() => {
        let cleanupFunction = false;
        const fetchData = async () => {
            try {
                await loadTasks();
                await loadingDBPicture();
            } catch (e) {
                console.error(e.message)
            }
        };
        fetchData();
        /*loadTasks();
        loadingDBPicture();*/
        return () => {
            cleanupFunction = true
        };
    }, [])


    const loadingDBPicture = async () => {
        await axios.get(`http://localhost:3001/tests/${params.testId}`).then(function (response) {
            setIntegrationLink(response.data.integrationLink);
        }).catch(function (error) {
            console.log(error.message)
        })
    }
    // добавляет запись в бд (привязвает пользователя к тесту и ставит закладку)
    // если пользователь с тестом уже записаны в бд то ничего не делает
    const signUpForTest = async () => {
        if (userAuth) {
            await axios.post('http://localhost:3001/testing', {
                userId: userAuth.user_id,
                testId: params.testId
            }).then(function (response) {
                /*console.log('пользователь зареган на тест')
                console.log(response)*/
            }).catch(function (error) {
                //console.log(error.message)
            })
        } else {
            // console.log('войдите в систему')
        }
    }
    // выгружает все задания данного теста
    // и записывает количество заданий
    const loadTasks = async () => {
        await axios.get(`http://localhost:3001/task/${params.testId}`).then(function (response) {
            //console.log(response);
            setTasks(response.data);
            setCountTasks(response.data!.length);
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
                    if (response.data.finished) {
                        window.location.assign('http://localhost:3000/')
                    }
                }).catch(function (error) {
                    console.log(error.message);
                })
        }
    }

    const [answer, setAnswer] = React.useState('');// ответ пользователя

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

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
    const [openSnackWin, setOpenSnackWin] = React.useState(false);
    const [openSnackEr, setOpenSnackEr] = React.useState(false);
    const [openSnackErToReq, setOpenSnackErToReq] = React.useState(false);
    const handleCloseSnack = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackS(false);
        setOpenSnackWin(false);
        setOpenSnackEr(false);
        setOpenSnackErToReq(false);
    };


    const [res, setRes] = useState('');
    const [columns, setColumns] = useState<GridColDef[]>([]);// колонки ебать для таблицы
    const [rows, setRows] = useState<any>([]);// строки ебать для таблицы
    const [eqPercent, setEqPersent] = useState();
    const [answerPercent, setAnswerPercent] = useState({
        trueAnswer: undefined,
        message: undefined
    });
    const [showStandart, setShowStandart] = useState(true);

    const handleClickReq = async () => {
        const bodyParameters = {
            request: answer,
            standart: tasks![(numbersTask - 1)].standard,
            task: tasks![(numbersTask - 1)].id
        };
        await axiosAuth.post('/testingapi/req',
            bodyParameters
        )
            .then(function (response) {
                if (isObject(response.data.response)) {
                    // заполнение колонок
                    const columnsFromRes = Object.keys(response.data.response[0]);
                    let columnsForColDef: GridColDef[] = [];
                    columnsFromRes.forEach((item: string) => {
                        columnsForColDef.push({field: item, headerName: item, flex: 1})
                        console.log(item);
                    })
                    setColumns(columnsForColDef);// колонки ответа
                    //заполнение строк
                    setRows(Object.values(response.data.response));// строки ответа
                    setEqPersent(response.data.eqPercent);// процент совпадения с возможным ответом
                    setAnswerPercent(response.data.answerPercent);// процент совпадения с верным набором данным (ответ)
                    console.log(response.data.answerPercent);
                    if(response.data.answerPercent.trueAnswer){
                        setOpenSnackWin(true);
                    }else{
                        setOpenSnackS(true);
                        setOpen(true);
                    }
                    setShowStandart(false);

                } else {
                    //сообщение об ошибке
                    //console.log(response.data.message);
                    setRes(response.data.message);
                    setOpenEr(true);
                    //setOpenSnackErToReq(true);
                }
            }).catch(function (error) {
                console.log(error);
                setOpenSnackEr(true);
            })
        /*await axiosAuth.post('/testingapi/eqPercent',
            {
                request: answer,
                standart: tasks![(numbersTask - 1)].standard,
            }
        ).then(function (response) {
            // в этом респонсе fpercent процент совпадения с эталоном
            setEqPersent(response.data);
            }).catch(function (error) {
                console.log(error);
                setOpenSnackEr(true);
            })*/
    }

    // кнопка на переход к след заданию
    // очистить поле ввода
    // сменить задание
    // сменить эталон
    // очистить результат запроса
    const handleClickNextTask = async () => {//
        setAnswer('');// очистка поля ввода
        setColumns([]);// чистим
        setRows([]);// вывод
        setEqPersent(undefined);
        setShowStandart(true);
        setNumberTask((prev) => {
            return prev + 1
        })
        if ((numbersTask + 1) === countTasks) {
            setFinished(true);
        }
        await axios.put(`http://localhost:3001/testing/${testingUser!.id}`, {
            marker: numbersTask + 1,
            finished: finished,
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }
    const handleClickFinished = async () => {
        await axios.put(`http://localhost:3001/testing/${testingUser!.id}`, {
            marker: numbersTask,
            finished: finished,
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
        window.location.assign('http://localhost:3000/')
    }

    const [age, setAge] = React.useState('');

    const handleChangeAge = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    const [open, setOpen] = React.useState(false);

    const [openEr, setOpenEr] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setOpenEr(false);
    };
    return (
        <div>
            {tasks ?
                <Container maxWidth="md" className={classes.main}>
                    <Grid container
                          direction="column"
                          justify="center"
                          className={classes.borderC}
                    >
                        <Snackbar open={openSnackWin} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert onClose={handleCloseSnack} severity="success">
                                Абсолютно верно!
                            </Alert>
                        </Snackbar>
                        {/*<Snackbar open={openSnackS} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert onClose={handleCloseSnack} severity="success">
                                Запрос выполнен, результат во вкладке 'Результат запроса'. {answerPercent.message}.
                            </Alert>
                        </Snackbar>*/}
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Сообщение
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography variant = {'h6'}>Запрос выполнен, результат во вкладке 'Результат запроса'.</Typography>
                            </DialogContent>
                            <DialogContent dividers>
                                <Typography variant = {'h6'}>Сообщение: {answerPercent.message}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    <Typography variant = {'h6'}> Понял</Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar open={openSnackEr} autoHideDuration={6000} onClose={handleCloseSnack}>
                            <Alert onClose={handleCloseSnack} severity="error">
                                Уууупс, произошла ошибка! (что-то с сервером, попробуйте позже)
                            </Alert>
                        </Snackbar>
                        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={openEr}>
                            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Сообщение
                            </DialogTitle>
                            <DialogContent dividers>
                                <Typography variant = {'h6'}>Запрос не выполнен, синтаксическая ошибка.</Typography>
                            </DialogContent>
                            <DialogContent dividers>
                                <Typography variant = {'h6'}>Ошибка: {res}</Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={handleClose} color="primary">
                                    <Typography variant = {'h6'}> Понял</Typography>
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {/*<Snackbar
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                            open={openSnackErToReq}
                            onClose={handleCloseSnack}
                        >
                            <Alert onClose={handleCloseSnack} severity="error">
                                {res}
                            </Alert>
                        </Snackbar>*/}
                        <Grid item className={classes.heightT}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={lowPanel}
                                    onChange={handleChangeLowPanel}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Схема бд" {...a11yProps(0)} />
                                    <Tab label="Таблицы БД" {...a11yProps(1)} />
                                    <Tab label="Результат" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <div className={classes.heightT}>
                                <TabPanel value={lowPanel} index={0} dir={theme.direction}>
                                    <div dangerouslySetInnerHTML={{__html: integrationLink}}/>
                                </TabPanel>
                                <TabPanel value={lowPanel} index={1} dir={theme.direction}>
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChangeAge}
                                        >
                                            <MenuItem value={10}>tickets</MenuItem>
                                            <MenuItem value={20}>flights</MenuItem>
                                            <MenuItem value={30}>aircraft</MenuItem>
                                            <MenuItem value={40}>passengers</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <DataGrid rows={rows} columns={columns} pageSize={7} autoHeight={true}/>
                                </TabPanel>
                                <TabPanel value={lowPanel} index={2} dir={theme.direction}>
                                    <DataGrid rows={rows} columns={columns} pageSize={7} autoHeight={true}/>
                                </TabPanel>
                            </div>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={3} className={classes.faq}>
                                <Grid item xs={4}>
                                    <Paper elevation={3} className={classes.ptpl}>
                                        <ListItemText primary={tasks![(numbersTask - 1)].name}/>
                                        <Divider/>
                                        <ListItemText primary={tasks![(numbersTask - 1)].formulation}/>
                                        <Divider/>
                                        <ListItemText primary='Количество попыток: 2'/>
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
                                            <Tab disabled={showStandart}
                                                 label="Возможный ответ" {...a11yProps(1)} />
                                        </Tabs>
                                    </AppBar>
                                    <div className={classes.heightT}>
                                        <TabPanel value={upperPanel} index={0} dir={theme.direction}>
                                            <TextInput
                                                trigger={['',' ']}
                                                spacer={[" "]}
                                                spaceRemovers={[',', '.', '!', '?']}
                                                requestOnlyIfNoOptions={true}
                                                regex={'^[a-zA-Z0-9\-_]+$'}
                                                disabled={false}
                                                //onRequestOptions={() => {}}
                                                className={classes.autoCInp}
                                                rows={7}
                                                onChange={(v:any)=>setAnswer(v)}
                                                value={answer}
                                                options={operators} />
                                            <Grid
                                                container
                                                direction="row"
                                                justify="space-between"
                                            >
                                                {eqPercent ?
                                                    <ListItemText
                                                        primary={`Процент совпадения с возможным ответом: ${Math.round(eqPercent!)} %`}/>
                                                    :
                                                    <div></div>
                                                }
                                                <div className={classes.rightB}>
                                                    <Button variant="contained"
                                                            size="small"
                                                            color="primary"
                                                            onClick={handleClickReq}
                                                    >
                                                        Отправить
                                                    </Button>
                                                </div>
                                            </Grid>
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
                                                aria-readonly={true}
                                            />
                                        </TabPanel>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid>
                            {finished ?
                                <Button variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={handleClickFinished}
                                >
                                    Завершить тест
                                </Button>
                                :
                                <Button variant="contained"
                                        size="small"
                                        color="primary"
                                        className={classes.btnH}
                                        onClick={handleClickNextTask}
                                >
                                    Перейти к следующему заданию
                                </Button>
                            }
                        </Grid>
                    </Grid>
                </Container>
                :
                <div>task undef</div>
            }
        </div>
    );
}
export default withRouter(Test);