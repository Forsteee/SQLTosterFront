import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

export default function Test() {

    const classes = useStyles();

    return (

        <div>
            <Container maxWidth="md">

            </Container>
        </div>
    );
}