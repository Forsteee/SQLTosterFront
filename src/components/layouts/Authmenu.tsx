import React from 'react';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import axios from "axios";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputBColor:{
            backgroundColor:"white",
            textAlign:'center',
            width: '100%',
            borderRadius: '2px',
        },
        btnG:{
            textAlign:'center',
            color:'white',
            width:'100%',
        },
    }),
);

const StyledMenu = withStyles({
    paper: {
        borderRadius: '0px',
        backgroundColor: '#2F2E33',

    },

})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
       /* '&:focus': {
            //backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                //color: theme.palette.common.white,
            },
        },*/
    },
}))(MenuItem);

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

export default function CustomizedMenus() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const auth= false;

    const handleClickAuth = async ()=>{
        await axios.post('http://localhost:3001/auth/login', {
            username: '3',
            password: '3'
        }).then(function (response){
            console.log(response)
        }).catch(function (error){
            console.log(error)
        })
    }
    return (
        <div>

        {!auth && (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <TextField id="" placeholder='Логин' className={classes.inputBColor} />
                </StyledMenuItem>
                <StyledMenuItem>
                    <Input
                        id="outlined-adornment-password"
                        className={classes.inputBColor}
                        placeholder='Пароль'
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ButtonGroup
                        orientation="vertical"
                        size='small'
                        color="inherit"
                        variant="text"
                        className={classes.btnG}
                    >
                        <Button onClick={handleClickAuth}>Войти</Button>
                        <Button href='/registration'>Регистрация</Button>
                    </ButtonGroup>
                </StyledMenuItem>
            </StyledMenu>
        </div>
        )}

    {auth && (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem>
                    <ButtonGroup
                        orientation="vertical"
                        size='small'
                        color="inherit"
                        variant="text"
                        className={classes.btnG}
                    >
                        <Button>Профиль</Button>
                        <Button>Настройки</Button>
                        <Button>Мои задания</Button>
                        <Button>Уведомления</Button>
                        <Button>Выход</Button>
                    </ButtonGroup>
                </StyledMenuItem>
            </StyledMenu>
        </div>
    )}
        </div>
    );
}