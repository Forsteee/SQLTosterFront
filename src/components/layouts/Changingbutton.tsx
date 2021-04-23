import React ,{useState}from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
            padding: '5px',
            overflow: 'hidden',
            borderWidth: '0',
            outline: 'none',
            borderRadius: '3px',
            backgroundColor: 'white',
            fontSize: theme.typography.pxToRem(21),
            fontWeight: theme.typography.fontWeightRegular,
            transition: 'background-color .3s',
            width: '100%',
            height:'100%',
            '&:hover': {
                backgroundColor: '#6ADA6A',
                color: 'white',
            },
        },
    }),
);

interface IChapters {
    id: number;
    name: string;
}
interface ISetChapterProps {
    onClickChapter(id:number):void
    chapters: IChapters[]
}

export const ChangingButton:React.FC<ISetChapterProps> =(props)=>{

    const classes = useStyles();

    const  handleClick=(event: React.MouseEvent<HTMLElement>)=>{
        props.onClickChapter(+(event.currentTarget as HTMLButtonElement).value);// изменяем id главы в форме FAQ
    }

    const listButton = props.chapters.map((chapter) =><Button
        className={classes.ourBtn}
        value={chapter.id}
        onClick = {handleClick}
    >{chapter.name}</Button>);

    return (
       <div>
           <ButtonGroup
               orientation="vertical"
               fullWidth
               className={classes.btnG}
           >
               {listButton}
           </ButtonGroup>
       </div>
    );
}