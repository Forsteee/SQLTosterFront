import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, Container, Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import DeleteIcon from '@material-ui/icons/Delete';
import {inspect} from "util";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main:{
            paddingBottom:'2%',
        },
        heading:{
            paddingTop:'20px',
            textAlign:'center',
        },
        inputBColor:{
            backgroundColor:"white",
            textAlign:'center',
            borderRadius: '2px',
            width:'80%',
        },
        logotype:{
            height: '100%',
            display: 'flex',
            alignItems:'center',
        },
        imgP:{
            margin: 'auto',
            height: '100px',
            width:'100px',
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
            backgroundColor:'#54AD54',
            width: '30%',
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
        editBtn:{
          width: '30%',
        },
        input: {
            display: 'none',
        },
        editInput:{
            height:'5vh',
            margin:'5px',
        },
        bloc:{
            paddingTop:'20px',
        },
        pad:{
         paddingTop:'20px',
        },
    }),
);

const imgsrc = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa57gjoZOz-fWpMTybuMsAaow0Wv5Sa-u6td_00_bIsDB42hjNgsIlYT92iVzX8Jp3Xmo&usqp=CAU';

export default function Editing(){
    const classes = useStyles();



    const [isOpen, setIsOpen] = useState(true);

    function Open(){
      setIsOpen(false);
    }
    function Close(){
        setIsOpen(true);
    }
    const styles = {
        display: isOpen ? 'none':'block'
    }

    return(
        <Container maxWidth="md" className={classes.main}>
            <Typography component="div" variant="h5" className={classes.heading}>
                Редактирование профиля
            </Typography>
            <Grid container>
                <Grid item xs={2}>
                    <Link color="inherit" href='/mycourses'>Мои курсы</Link>
                </Grid>
                <Grid item xs={10} >
                    <Grid className={classes.pad}>
                    <TextField
                        className={classes.inputBColor}
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="Имя"
                        name="name"
                        autoComplete="name"
                    />
                    </Grid>
                    <Grid className={classes.pad}>
                    <TextField
                        className={classes.inputBColor}
                        variant="outlined"
                        required
                        fullWidth
                        id="surname"
                        label="Фамилия"
                        name="surname"
                        autoComplete="surname"
                    />
                    </Grid>
                    <Grid className={classes.pad}>
                        <Typography component="div" variant="h6" >
                            Email
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            className={classes.editBtn}
                            onClick = {Open}
                        >
                            Редактировать
                        </Button>
                        <Grid className={classes.pad}>
                        <TextField
                            className={classes.inputBColor}
                            variant="outlined"
                            required
                            fullWidth
                            style = {styles}
                            id="currentEmail"
                            placeholder="currentEmail"
                            name="currentEmail"
                            autoComplete="currentEmail"
                        />
                        </Grid>
                        <Grid className={classes.pad}>
                        <TextField
                            className={classes.inputBColor}
                            variant="outlined"
                            required
                            fullWidth
                            style = {styles}
                            id="newEmail"
                            placeholder="newEmail"
                            name="newEmail"
                            autoComplete="newEmail"
                        />
                        </Grid>
                        <Grid item xs={12} spacing={2}>
                        <Button
                            variant="contained"
                            color="default"
                            className={classes.editBtn}
                            style = {styles}
                        >
                            Изменить
                        </Button>
                        </Grid>
                        <Grid item xs={12} spacing={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.editBtn}
                            style = {styles}
                            onClick = {Close}
                        >
                            Отмена
                        </Button>
                        </Grid>
                    </Grid>
                    <Grid className={classes.pad}>
                        <Typography component="div" variant="h6" >
                            Аватарка
                        </Typography>
                        <div className={classes.logotype}>
                            <Link color="inherit" href='/'><Avatar src={imgsrc} variant="square" className={classes.imgP} /></Link>
                        </div>
                    <div>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="default" component="span" className={classes.editInput}>
                                Загрузить
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.editInput}
                                startIcon={<DeleteIcon />}
                            >
                                Delete
                            </Button>
                        </label>
                    </div>
                    </Grid >
                    <Button
                        type="submit"
                        fullWidth
                        variant="outlined"
                        color="default"
                        className={classes.submit}
                    >
                        Сохранить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}