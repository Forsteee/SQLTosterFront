import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{

        },
        main:{

        },
    }),
);

export default function FAQ() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="md" className={classes.main}>
            </Container>
        </div>
    );
}