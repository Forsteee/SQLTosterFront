import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headT:{
            padding: '3%',
            textAlign: 'center',
        },
        inputBColor:{
            backgroundColor:"white",
            textAlign:'center',
            borderRadius: '2px',
            width:'80%',
            marginTop:'3%',
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
        rightB:{
            textAlign: 'right',
        },
        wDiv:{
            paddingTop:'1%',
            paddingLeft:'69%'
        },
        root:{
            textAlign: 'center',
        },
        mBtn:{

        }
    })
)

export default function CreateTask(){

    const classes = useStyles();

    return(
        <Container maxWidth="md" className={classes.root}>
            <Typography component="div" variant="h5" className={classes.headT}>
                Создание задания
            </Typography>
            <TextField
                className={classes.inputBColor}
                variant="outlined"
                fullWidth
                id="name"
                label="Название"
                name="name"
                autoComplete="name"
            />
            <TextField
                className={classes.inputBColor}
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                id="formulation"
                label="Формулировка"
                name="formulation"
                autoComplete="formulation"
            />
            <div>
                    <TextField
                        className={classes.inputBColor}
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        id="standard"
                        label="Эталон"
                        name="standard"
                        autoComplete="standard"
                    />
                <div className={classes.wDiv}>
                    <Button variant="contained"
                            size="small"
                            color="primary"
                    >
                        Отправить
                    </Button>
                </div>
            </div>
            <TextField
                className={classes.inputBColor}
                variant="outlined"
                multiline
                rows={5}
                fullWidth
                id="answer"
                label="Ответ"
                name="answer"
                autoComplete="answer"
            />
            <TextField
                className={classes.inputBColor}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                id="recommendation"
                label="Рекомендации"
                name="recommendation"
                autoComplete="recommendation"
            />
            <div className={classes.mBtn}>
                <Button
                    type="submit"
                    fullWidth
                    id="createTask"
                    variant="outlined"
                    color="default"
                    className={classes.submit}
                    href="/createTask"
                >
                    Создать
                </Button>
            </div>
        </Container>
    )
}