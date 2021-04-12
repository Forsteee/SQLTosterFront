import React from 'react';
import className from 'classnames';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paginationWrapper:{
        padding: '2rem 0',
        display: 'flex',
        justifyContent: 'center',
        },

        separator: {
        width: '1rem',
        margin: '0 0.25rem',
        },

        pageItem:{
            backgroundColor: 'transparent',
            border: 'none',
            height: '2rem',
            width: '2rem',
            margin: '0 0.25rem',
            borderRadius: '50%',
            fontWeight: 'bold',
            color: 'primary',

            '&:hover': {
                textDecoration: 'underline',
             },
            '&:focus': {
                outline: '0',
            },
        },

        active: {
            backgroundColor: 'primary',
            color: 'black',
        },

        sides: {
            boxShadow: 'transparent 0px 0px 0px 1px transparent 0px 0px 0px 4px rgba(0, 0, 0, 0.18) 0px 2px 4px',
        '&:hover': {
            textDecoration: 'none',
            boxShadow: 'transparent 0px 0px 0px 1px transparent 0px 0px 0px 4px rgba(0, 0, 0, 0.12) 0px 6px 16px',
         },
        },

    }),
);

export interface Props {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
}
export const PaginationComponent: React.FC<Props> = ({
  page,
  totalPages,
  handlePagination,}) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.paginationWrapper}>
                {page !== 1 && (
                    <button
                        onClick={() => handlePagination(page - 1)}
                        type="button"
                        className={className([classes.pageItem, classes.sides].join(' '))}
                    >
                        &lt;
                    </button>
                )}
                <button
                    onClick={() => handlePagination(1)}
                    type="button"
                    className={className(classes.pageItem, {
                        [classes.active]: page === 1,
                    })}
                >
                    {1}
                </button>
                {page > 3 && <div className={classes.separator}>...</div>}
                {page === totalPages && totalPages > 3 && (
                    <button
                        onClick={() => handlePagination(page - 2)}
                        type="button"
                        className={classes.pageItem}
                    >
                        {page - 2}
                    </button>
                )}
                {page > 2 && (
                    <button
                        onClick={() => handlePagination(page - 1)}
                        type="button"
                        className={classes.pageItem}
                    >
                        {page - 1}
                    </button>
                )}
                {page !== 1 && page !== totalPages && (
                    <button
                        onClick={() => handlePagination(page)}
                        type="button"
                        className={[classes.pageItem, classes.active].join(' ')}
                    >
                        {page}
                    </button>
                )}
                {page < totalPages - 1 && (
                    <button
                        onClick={() => handlePagination(page + 1)}
                        type="button"
                        className={classes.pageItem}
                    >
                        {page + 1}
                    </button>
                )}
                {page === 1 && totalPages > 3 && (
                    <button
                        onClick={() => handlePagination(page + 2)}
                        type="button"
                        className={classes.pageItem}
                    >
                        {page + 2}
                    </button>
                )}
                {page < totalPages - 2 && <div className={classes.separator}>...</div>}
                <button
                    onClick={() => handlePagination(totalPages)}
                    type="button"
                    className={className(classes.pageItem, {
                        [classes.active]: page === totalPages,
                    })}
                >
                    {totalPages}
                </button>
                {page !== totalPages && (
                    <button
                        onClick={() => handlePagination(page + 1)}
                        type="button"
                        className={[classes.pageItem, classes.sides].join(' ')}
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
};
export const Pagination = PaginationComponent;
