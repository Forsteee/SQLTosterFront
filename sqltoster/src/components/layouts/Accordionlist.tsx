import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
    }),
);
export interface Sections {
    title: string;
    content: string;
}
export default function AccordionList(props:{sections: Sections[]}) {

    const classes = useStyles();

    const accordionlist = props.sections.map((section) =>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{section.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {section.content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );

    return (
        <div>
            {accordionlist}
        </div>
    );
}