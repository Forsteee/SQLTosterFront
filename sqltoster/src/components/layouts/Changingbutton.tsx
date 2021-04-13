import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        btnG:{
            textAlign:'center',
            color:'white',
            width:'100%',
        },
        ourBtn:{
            position: 'relative',
            display: 'block',
            //margin: '30px auto',
            padding: '5px',
            overflow: 'hidden',
            borderWidth: '0',
            outline: 'none',
            borderRadius: '3px',
            //boxShadow: '0 1px 4px rgba(0, 0, 0, .6)',
            backgroundColor: 'white',
            //color: '#ecf0f1',
            fontSize: theme.typography.pxToRem(21),
            fontWeight: theme.typography.fontWeightRegular,
            transition: 'background-color .3s',
            width: '100%',
            height:'100%',
            '&:hover': {
                backgroundColor: '#6ADA6A',
                color: 'white',
            },
           /* '&:active': {
                boxShadow: 'none',
                backgroundColor: '#6ADA6A',
                borderColor: '#6ADA6A',
            },*/
            /*'&:focus': {
                color: '#0083FF',
                //backgroundColor: '#27ae60',
            },*/
        },
    }),
);

export const numberSectionActive = 'sdfsdfsdfsdfdf';

export default function ChangingButton(props:{elements: string[]}) {

    const classes = useStyles();
    const i = props.elements;


    const [value, setValue] = React.useState(i[0]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        //console.log('fgfgfg');
        setValue((event.target as HTMLInputElement).value);
        //numberSectionActive = (event.target as HTMLInputElement).value;
    };




    const listButton = i.map((element) =><button
        className={classes.ourBtn}
        value={element}
        onClick = {handleClick}
    >222</button>);


    return (
       <div>
           <ButtonGroup
               orientation="vertical"
               fullWidth
               className={classes.btnG}
           >
               {listButton}
               {/*<Typography component="div" variant="h5" >{value}</Typography>
               {numberSectionActive}*/}
           </ButtonGroup>
          {/* <RadioGroup name="section" value={value} onChange={handleChange}>
               {listButton}
           </RadioGroup>*/}
       </div>
    );
}