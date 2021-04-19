import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {ChangingButton} from "./layouts/Changingbutton";
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

export default function FAQ() {
    const classes = useStyles();

    ////// тестовые константы
    const section1 = ({id:1,name:'Глава 1'});
    const section2 = ({id:2,name:'Глава 2'});
    const chapterList = [section1,section2];
    const sectionItem1 = ({id:1,title:'1',content:'2'});
    const sectionItem2 = ({id:2,title:'2',content:'3'});
    const sectionItem3 = ({id:3,title:'3',content:'3sdfsdf'});
    const sectionItem4 = ({id:4,title:'3',content:'4sdsf'});
    const sectionList1 = [sectionItem1,sectionItem2];
    const sectionList2 = [sectionItem3,sectionItem4];
    /*
    * const - массив с строками таблицы 'главы' ()
    * const - массив с строками таблицы 'содержание глав'
    *
    *
    *
    * */
    const [activeChapter,setActiveChapter]=React.useState(1);
    const changeChapter=(id:number)=>{
        setActiveChapter(id);
        //запрос к бд по вытягиванию строки таблицы 'содержание глав' по id главы -> массив с содержанием главы (sectionList - сейчас), будем юзать setSectionList
        //setSectionList(/*ответ от БД (response)*/)
        //пока так (для теста)
        if (id==1){
            setSectionList(sectionList1);
        }else{
            setSectionList(sectionList2);
        }

        console.log(id);
    }

    const [sectionList,setSectionList]=React.useState(sectionList1);

    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.headT}>
                    Ответы на часто задаваемые вопросы
                </Typography>
                <Grid container spacing={3} className={classes.faq}>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                                <ChangingButton onClickChapter={changeChapter} chapters={chapterList} /> {/*onClickChapter={changeChapter}*/}
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <AccordionList sections={sectionList}/>
                </Grid>
                </Grid>
            </Container>
        </div>
    );
}