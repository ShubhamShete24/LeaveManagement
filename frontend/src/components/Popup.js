import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from './controls/ActionButtoon';

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: 'absolute',
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: '0px'
  }
}));

export default function Popup(props) {
  const { title, fullWidth, maxWidth, children, openPopup, setOpenPopup } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      fullWidth={fullWidth || true}
      maxWidth={maxWidth || 'sm'}
      classes={{ paper: classes.dialogWrapper }}
    >
      <DialogTitle className={classes.dialogTitle}>
        <div style={{ display: 'flex' }}>
          <Typography component="div" style={{ flexGrow: 1, fontSize: 22 }}>
            {title}
          </Typography>
          <ActionButton
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon style={{ color: 'red' }} />
          </ActionButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}

Popup.propTypes = {
  title: PropTypes.string,
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.string,
  openPopup: PropTypes.bool,
  setOpenPopup: PropTypes.func,
  children: PropTypes.node
};
