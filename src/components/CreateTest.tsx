import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteIcon from "@material-ui/icons/Delete";
import {AccountCircle, AddCircle} from "@material-ui/icons";
import {Backdrop, Fade, Modal} from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        headT:{
            padding: '3%',
            textAlign: 'center',
        },
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
            marginTop:'3%',
        },
        inputBColor:{
            backgroundColor:"white",
            textAlign:'center',
            borderRadius: '2px',
            width:'80%',
            marginTop:'3%',
        },
        editBtn:{
            width: '30%',
        },
        editInput:{
            height:'5vh',
            margin:'5px',
            marginTop:'3%',
        },
        cBtn:{
          color:'#54AD54'
        },
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
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
    })
)

export default function CreateTest(){

    const classes = useStyles();

    const [schema, setSchema] = React.useState<any>('');
    const [open, setOpen] = React.useState(false);
    const [openLevel, setOpenLevel] = React.useState(false);
    const [openType, setOpenType] = React.useState(false);
    const [level,setLevel] = React.useState<any>(10);
    const [type,setType] = React.useState<any>(10);
    const [disableBtn, setDisableBtn] = React.useState<any>(true);
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    let frame:string[] = [
        "<iframe width=\"100%\" height=\"500px\" style=\"box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;\" allowtransparency=\"true\" allowfullscreen=\"true\" scrolling=\"no\" title=\"Embedded DrawSQL IFrame\" frameborder=\"0\" src=\"https://drawsql.app/sqltoster/diagrams/flights/embed\"></iframe>",
        "<iframe width=\"100%\" height=\"500px\" style=\"box-shadow: 0 2px 8px 0 rgba(63,69,81,0.16); border-radius:15px;\" allowtransparency=\"true\" allowfullscreen=\"true\" scrolling=\"no\" title=\"Embedded DrawSQL IFrame\" frameborder=\"0\" src=\"https://drawsql.app/sqltoster/diagrams/library/embed\"></iframe>",
        "",
    ]

    useEffect(()=>{
        loadFrame();
    }, [schema])

    const loadFrame = () =>{
        if(schema===10) {
            return <div dangerouslySetInnerHTML={{__html: frame[0]}}/>;
        }else if (schema===20){
            return <div dangerouslySetInnerHTML={{__html: frame[1]}}/>;
        }
    }


    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSchema(event.target.value as number);
        console.log(event.target.value)
        if(event.target.value !== ''){
            setDisableBtn(false);
        }else {
            setDisableBtn(true);
        }
    };

    const handleChangeLevel = (event: React.ChangeEvent<{ value: unknown }>) => {
        setLevel(event.target.value as number);
    };

    const handleChangeType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setType(event.target.value as number);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCloseLevel = () => {
        setOpenLevel(false);
    };

    const handleOpenLevel = () => {
        setOpenLevel(true);
    };

    const handleCloseType = () => {
        setOpenType(false);
    };

    const handleOpenType = () => {
        setOpenType(true);
    };

    return(
        <Container maxWidth="md">
            <Typography component="div" variant="h5" className={classes.headT}>
                Создание теста
            </Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Схема бд</InputLabel>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="select1"
                    open={open}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={schema}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>Нет</em>
                    </MenuItem>
                    <MenuItem value={10}>1</MenuItem>
                    <MenuItem value={20}>2</MenuItem>
                    <MenuItem value={30}>3</MenuItem>
                </Select>
            </FormControl>
            <div>
                {loadFrame()}
            </div>
            <TextField
                className={classes.inputBColor}
                variant="outlined"
                fullWidth
                id="name"
                label="Название"
                name="name"
                autoComplete="name"
            />
            <Grid>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Уровень</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="select2"
                        open={openLevel}
                        onClose={handleCloseLevel}
                        onOpen={handleOpenLevel}
                        value={level}
                        onChange={handleChangeLevel}
                    >
                        <MenuItem value="">
                            <em>Нет</em>
                        </MenuItem>
                        <MenuItem value={10}>1</MenuItem>
                        <MenuItem value={20}>2</MenuItem>
                        <MenuItem value={30}>3</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Тип</InputLabel>
                    <Select
                        labelId="demo-controlled-open-select-label"
                        id="select3"
                        open={openType}
                        onClose={handleCloseType}
                        onOpen={handleOpenType}
                        value={type}
                        onChange={handleChangeType}
                    >
                        <MenuItem value="">
                            <em>Нет</em>
                        </MenuItem>
                        <MenuItem value={10}>select</MenuItem>
                        <MenuItem value={20}>dml</MenuItem>
                        <MenuItem value={30}>operations</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Button variant="contained" color="default" component="span" className={classes.editInput}>
                Загрузить картинку
                <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                </IconButton>
            </Button>
            <TextField
                className={classes.inputBColor}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                id="description"
                label="Описание"
                name="description"
                autoComplete="description"
            />
            <Button
                type="submit"
                fullWidth
                disabled = {disableBtn}
                id="createTask"
                variant="outlined"
                color="default"
                className={classes.submit}
                href="/createTask"
            >
                Создать задание
            </Button>
            <Grid >
                <Grid item>
                    <TextField
                        className={classes.inputBColor}
                        variant="outlined"
                        multiline
                        rows={5}
                        fullWidth
                        id="team"
                        label="Список участников"
                        name="team"
                        autoComplete="team"
                    />
                </Grid>
                <Grid item >
                    <IconButton aria-label="delete" className={classes.cBtn} onClick={handleOpenModal}>
                        <AddCircle fontSize="large"/>
                    </IconButton>
                    <Modal
                        aria-labelledby="title"
                        aria-describedby="description"
                        className={classes.modal}
                        open={openModal}
                        onClose={handleCloseModal}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={openModal}>
                            <div className={classes.paper}>
                                <h2 id="team-modal-title">Добавление участников на тест</h2>
                                <p id="team-modal-description">Введите "Логин" или "Email" и нажмите "Добавить"</p>
                                <TextField
                                    id="input-with-icon-textfield"
                                    label=""
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Grid
                                    container
                                    direction="row"
                                    justify="flex-end"
                                >
                                <Button
                                    type="submit"
                                    fullWidth
                                    id="createTask"
                                    variant="outlined"
                                    color="default"
                                    className={classes.submit}
                                >
                                    Добавить
                                </Button>
                                </Grid>
                            </div>
                        </Fade>
                    </Modal>
                    <IconButton color="secondary" aria-label="delete">
                        <DeleteIcon fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
        </Container>
    )
}