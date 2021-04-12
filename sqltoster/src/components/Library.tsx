import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
//import {PContainer} from "./MainPagination";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{

        },
        main:{

        },
        heading:{
            textAlign:'center',
        },

    }),
);

export default function Library() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.main}>
                <Typography component="div" variant="h5" className={classes.heading}>
                    Материалы
                </Typography>
                {/*<PContainer/>*/}
                <Pagination count={10} />
            </Container>
        </div>
    );
}
