import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {ChangingButton} from "./layouts/Changingbutton";
import AccordionList from "./layouts/Accordionlist";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            flexGrow: 1,
            backgroundColor:  theme.palette.background.paper,
            display: 'flex',
            height: 224,
        },
        tabs: {
            borderRight: `1px solid ${theme.palette.divider}`,
            marginTop: '11%',
            '&:hover': {
                backgroundColor: '#6ADA6A',
                color: 'white',
            },
        },
        faq:{

        },
        cont:{
            backgroundColor: '#EDEEF0',
            height: '100vh',
        },
    }),
);



/////vkladki
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}
///

export default function Library() {
    const classes = useStyles();

    ////// тестовые константы
    const section1 = ({id:1,name:'Глава 1'});
    const section2 = ({id:2,name:'Глава 2'});
    const chapterList = [section1,section2];
    const sectionItem1 = ({id:1,title:'1',content:'2',section_id:1});
    const sectionItem2 = ({id:2,title:'2',content:'3',section_id:1});
    const sectionItem3 = ({id:3,title:'3',content:'3sdfsdf',section_id:2});
    const sectionItem4 = ({id:4,title:'3',content:'4sdsf',section_id:2});
    const sectionList1 = [sectionItem1,sectionItem2,sectionItem3,sectionItem4];
    /*
    * const - массив с строками таблицы 'главы' ()
    * const - массив с строками таблицы 'содержание глав'
    *
    *
    *
    * */

    /////vkladki
    interface TabPanelProps {
        children?: React.ReactNode;
        index: any;
        value: any;
    }

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
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
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    /////

    return (

        <div className={classes.root}>
            <Container maxWidth="md" className={classes.cont}>
                <Grid container spacing={3} className={classes.faq}>
                    <Grid item xs={3}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                {chapterList.map((chapter) =>
                    <Tab label={chapter.name} {...a11yProps(chapter.id)} />
                )}
            </Tabs>
                    </Grid>
                    <Grid item xs={9}>
            {chapterList.map((chapter)=>
                <TabPanel value={value} index={chapter.id-1}>
                    {sectionList1.map((section)=>{
                        if(section.section_id==chapter.id){
                            return(
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography >{section.title}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {section.content}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>)
                    }
                        }
                    )}
                </TabPanel>
            )}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
