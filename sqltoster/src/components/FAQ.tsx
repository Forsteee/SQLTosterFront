import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{

        },
        main:{

        },
        headT:{
            textAlign:'center',
            paddingTop:'1%',

        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            whiteSpace: 'nowrap',
            marginBottom: theme.spacing(1),
        },
        btnG:{
            textAlign:'center',
            color:'white',
            width:'100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        faq:{
            padding: theme.spacing(1,0,1,0),
        },
    }),
);

export default function FAQ() {
    const classes = useStyles();
    const [flag, setFlag] = React.useState(true);
    const handleClick = () => {
        setFlag(!flag);
    };
    const messege = 'Не важно, с какой скоростью ты движешься к своей цели — главное не останавливаться. Конфуций';

    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.headT}>
                    Ответы на часто задаваемые вопросы
                </Typography>
                <Grid container spacing={3} className={classes.faq}>
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <ButtonGroup
                                orientation="vertical"
                                aria-label="vertical contained primary button group"
                                variant="contained"
                                className={classes.btnG}
                            >
                                <Button
                                    onClick={handleClick}
                                    color={flag ? "default" : "primary"}
                                >Раздел 1</Button>
                                <Button
                                    onClick={handleClick}
                                    color={flag ? "default" : "primary"}
                                >Раздел 2</Button>
                                <Button
                                    onClick={handleClick}
                                    color={flag ? "default" : "primary"}
                                >Раздел 3</Button>
                            </ButtonGroup>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Тема раздела 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {messege}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                </Grid>
                </Grid>
            </Container>
        </div>
    );
}