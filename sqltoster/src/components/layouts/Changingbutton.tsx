import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import RadioGroup from '@material-ui/core/RadioGroup';
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btnG:{
            textAlign:'center',
            color:'white',
            width:'100%',
        },
    }),
);
export let Values = new String();

export default function ColorChangingButton(props:{elements: string[]}) {

    const classes = useStyles();
    const i = props.elements;


    const [value, setValue] = React.useState(i[0]);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        //Values[0] = (event.target as HTMLInputElement).value;
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    Values = value;

    const listButton = i.map((element) =><Button
        value={element}
        variant="contained"
        color='default'
        onClick = {handleClick}
    >хуета - {value}</Button>);


    return (
       <div>
           <ButtonGroup
               orientation="vertical"
               aria-label="vertical contained primary button group"
               //className={classes.btnG}
           >
               {listButton}
           </ButtonGroup>
          {/* <RadioGroup name="section" value={value} onChange={handleChange}>
               {listButton}
           </RadioGroup>*/}
       </div>
    );
}