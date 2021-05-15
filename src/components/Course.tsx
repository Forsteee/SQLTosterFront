import React, {useState} from 'react';
import {makeStyles, createStyles, Theme, useTheme} from '@material-ui/core/styles';
import {Container, FormGroup, Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading:{
            paddingTop:'20px',
            textAlign: 'center',
        },
        card: {
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        },
        cardContent: {
            flexGrow: 1,
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
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            marginTop:'3%',
        },
    }));

export default function Course(){

    const classes = useStyles();
    const [state, setState] = React.useState('');
    /*const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };*/
    return(
        <Container  maxWidth="md">
            <Typography component="div" variant="h5" className={classes.heading}>
                Список заданий
            </Typography>
            <Container maxWidth="md">
                <Grid container direction="column">
                    <Grid item xs={9}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Задание 1
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                type="submit"
                                fullWidth
                                size='small'
                                variant="outlined"
                                color="default"
                                className={classes.submit}
                                href="/test"
                            >
                                Начать
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper} elevation={3}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            //checked={state}
                                            //onChange={handleChange}
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Primary"
                                />
                            </FormGroup>
                        </Paper>
                        <Paper className={classes.paper} elevation={3}>

                        </Paper>
                        <Paper className={classes.paper} elevation={3}>

                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Container>
    )
}
