import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser} from "../features/userSlice";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign:'center',
        backgroundColor: '#2F2E33',
        height:'100vh',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width:'40%',
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
    container:{
        height:'100%',
    },
    inputBColor:{
        backgroundColor:"white",
        textAlign:'center',
        borderRadius: '2px',
        width:'80%',
    },
    hColor:{
      color:'white',
        marginTop: theme.spacing(3),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [Login, setLogin] = useState('');
    const [Name, setName]=useState('');
    const [Surname, setSurname]=useState('');
    const [Email, setEmail]=useState('');
    const [Password, setPassword]=useState('');

    const bodyParameters = {
        login: Login,
        name: Name,
        surname: Surname,
        mail: Email,
        password: Password
    };

    const loginR = async () => {
        await axios.post('http://localhost:3001/auth/login', {
            username: Login,
            password: Password,
        }).then(function (response){
            console.log('da')
            localStorage.setItem('user_token', response.data.access_token);
            localStorage.setItem('user_id', response.data.user_id);
            dispatch(login({
                user_id: response.data.user_id,
                loginIn:true,
            }));
        }).catch(function (error){
            console.log(error)
        })
    }

    const handleClickReg = async() => {

        console.log('response.data');
        await axios.post('http://localhost:3001/users/create',
            bodyParameters,)
            .then(function(response){
                   console.log(response.data);
                console.log('response.data');
               }
            )
            .catch(console.log)
    };
    const userAuthent = useSelector(selectUser);

    const goHome = () =>{
        window.location.assign('http://localhost:3000/')
    }

    return (
        <>
        {userAuthent ? <>{goHome()}</> : <Container component="main" maxWidth="sm" className={classes.container}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.hColor}>
                        Регистрация
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.inputBColor}
                                    autoComplete="log"
                                    name="login"
                                    required
                                    fullWidth
                                    id="login"
                                    placeholder="Логин"
                                    autoFocus
                                    onChange={e=>setLogin(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.inputBColor}
                                    autoComplete="fname"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    placeholder="Имя"
                                    autoFocus
                                    onChange={e=>setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.inputBColor}
                                    required
                                    fullWidth
                                    id="lastName"
                                    placeholder="Фамилия"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={e=>setSurname(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.inputBColor}
                                    required
                                    fullWidth
                                    id="email"
                                    placeholder="Email"
                                    name="email"
                                    autoComplete="email"
                                    onChange={e=>setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.inputBColor}
                                    required
                                    fullWidth
                                    name="password"
                                    placeholder="Пароль"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={e=>setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="default"
                            className={classes.submit}
                            onClick={handleClickReg}
                        >
                            Зарегистрироваться
                        </Button>

                    </form>
                </div>
            </Container>}
        </> );
}