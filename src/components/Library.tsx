import React, {useEffect, useState} from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {IMaterials} from "./interfaces/IMaterials";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";


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

        },
        faq:{

        },
        cont:{
            backgroundColor: '#EDEEF0',
            height: '100vh',
        },
        headT:{
            textAlign:'center',
            paddingTop:'1%',

        },
        paper: {
            padding: theme.spacing(0,2,0,2),
            textAlign: 'center',
            color: theme.palette.text.primary,
            marginTop:'3%',
        },
        title:{
            fontSize:'20px',
            padding:'20px',
        },
        description:{
            textAlign: 'left',
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


export default function Library() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
    /////
    const [loading, setLoading] = useState(false);
    const [allMaterials, setAllMaterials] = useState<IMaterials[]>([]);
    const [error, setError] = useState(null);

    useEffect(()=>{
        loadMaterials();
    }, [])

    const loadMaterials = async () => {
    axios.get('http://localhost:3001/materials')
        .then(function (response){
            setAllMaterials(response.data);

            console.log(response.data);
            setLoading(true);
        })
        .catch(function (error){
            console.log(error)
            setError(error);
        })
    }

    return (

        <div className={classes.root}>
            <Container maxWidth="md" className={classes.cont}>
                <Typography component="div" variant="h5" className={classes.headT}>
                    Материалы
                </Typography>
                {loading && !error &&
                <Grid container spacing={3} className={classes.faq}>
                    <Grid item xs={9}>
                           {allMaterials.map((material)=>
                                <TabPanel value={value} index={material.chapter-1}>
                                    <Paper className={classes.paper} elevation={3}>
                                        {JSON.parse(JSON.stringify(material.file)).title}
                                        {JSON.parse(JSON.stringify(material.file)).description}
                                    </Paper>
                                </TabPanel>
                           )}
                    </Grid>
                    <Grid item xs={3}>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs example"
                            className={classes.tabs}
                        >
                            {allMaterials.map((material)=>{
                                return(
                                <Tab label={`Глава ${material.chapter}`} {...a11yProps(material.chapter - 1)} />
                                )
                            })}
                        </Tabs>
                    </Grid>
                </Grid>}
                {loading && error &&
                <div>Ошибка при загрузке тестов: {error}</div>
                }
                {!loading && <CircularProgress/>}
            </Container>
        </div>
    );
}
