import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
    padding: 0
  },
  error: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.error.light,
    '& .MuiButton-label': {
      color: theme.palette.error.main
    }
  },
  primary: {
    padding: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.light,
    '& .MuiButton-label': {
      color: theme.palette.primary.main
    }
  }
}));

export default function ActionButton(props) {
  const { color, children, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={`${classes.root} ${classes[color]}`} onClick={onClick}>
      {children}
    </Button>
  );
}

ActionButton.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};
