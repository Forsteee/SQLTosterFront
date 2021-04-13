import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChangingButton from "./layouts/Changingbutton";
import AccordionList from "./layouts/Accordionlist";


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

export default function Library() {
    const classes = useStyles();

    const section = ['1','2'];
    const sectionItem = ({title:'1',content:'2'});
    const sectionList = [sectionItem,sectionItem,sectionItem]

    return (
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.headT}>
                    Материал
                </Typography>
                <Grid container spacing={3} className={classes.faq}>
                    <Grid item xs={8}>
                        <AccordionList sections={sectionList}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            {/*<ButtonGroup
                                orientation="vertical"
                                aria-label="vertical contained primary button group"
                                className={classes.btnG}
                            >*/}
                            <ChangingButton elements={section}/>
                            {/* </ButtonGroup>*/}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
