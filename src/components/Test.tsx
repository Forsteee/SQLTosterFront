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
        borderC:{

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

    const [upperPanel, setUpperPanel] = React.useState(0);

    const handleChangeUpperPanel = (event: React.ChangeEvent<{}>, newValue: number) => {
        setUpperPanel(newValue);
    };

    const [lowPanel, setLowPanel] = React.useState(0);

    const handleChangeLowPanel = (event: React.ChangeEvent<{}>, newValue: number) => {
        setLowPanel(newValue);
    };

    const [answer, setAnswer] = React.useState('');

    const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value);
    };

    const [standart, setStandart] = React.useState('Эталон из БД');

    return (
        <div>
            <Container maxWidth="md" className={classes.main}>
                <Grid container
                      direction="column"
                      justify="center"
                      className={classes.borderC}
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
                                value={upperPanel}
                                onChange={handleChangeUpperPanel}
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
                            <TabPanel value={upperPanel} index={0} dir={theme.direction}>
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
                            <TabPanel value={upperPanel} index={1} dir={theme.direction}>
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
                        <AppBar position="static" color="default">
                            <Tabs
                                value={lowPanel}
                                onChange={handleChangeLowPanel}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab label="Схема базы данных" {...a11yProps(0)} />
                                <Tab label="Результат запроса" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <div className={classes.heightT}>
                            <TabPanel value={lowPanel} index={0} dir={theme.direction}>
                                <TextField
                                    id=""
                                    multiline
                                    rows={20}
                                    placeholder="Схема БД"
                                    variant="outlined"
                                    fullWidth
                                />
                            </TabPanel>
                            <TabPanel value={lowPanel} index={1} dir={theme.direction}>
                                <TextField
                                    id=""
                                    multiline
                                    rows={20}
                                    placeholder="Резульат запроса: табличка"
                                    variant="outlined"
                                    fullWidth
                                />
                            </TabPanel>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}