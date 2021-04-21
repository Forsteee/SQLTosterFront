import React from 'react';
import { Theme, createStyles, makeStyles,useTheme  } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
        },
        main:{

        },
        faq:{
            padding: theme.spacing(1,0,1,0),
        },
        rightB:{
            textAlign: 'right',
        },
        heightT:{
            height:'228px',
        },
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Test() {

    const classes = useStyles();
    const theme = useTheme();

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };


    const [answer, setAnswer] = React.useState('');

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const [standart, setStandart] = React.useState('Эталон из БД');

    const handleChangeStandart = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStandart(event.target.value);
    };

    return (
        <div >
            <Container maxWidth="md" className={classes.main}>
                <Grid container
                      direction="column"
                      justify="center"
                >
                    <Grid item>
                <Grid container spacing={3} className={classes.faq}>
                    <Grid item xs={4}>
                        <Paper elevation={3}>
                            задание
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Поле ввода" {...a11yProps(0)} />
                                <Tab label="Эталон" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <div className={classes.heightT}>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <TextField
                                    id=""
                                    multiline
                                    rows={5}
                                    placeholder="Поле ввода"
                                    variant="outlined"
                                    value={answer}
                                    onChange={handleChangeAnswer}
                                    fullWidth
                                />
                                <div className={classes.rightB}>
                                <Button variant="contained"
                                        size="small"
                                        color="primary">
                                    Отправить
                                </Button>
                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                <TextField
                                    id=""
                                    multiline
                                    rows={5}
                                    placeholder="Поле ввода"
                                    variant="outlined"
                                    value={standart}
                                    fullWidth
                                    disabled
                                />
                            </TabPanel>
                        </div>
                    </Grid>
                </Grid>
                    </Grid>
                    <Grid item>
                       <>{/*сделать независимые вкладки */}</>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}