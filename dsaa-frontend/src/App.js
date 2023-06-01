import React from 'react';
import Apptabs from './Apptabs';
import { makeStyles } from '@material-ui/core/styles';
import Battery from './Battery';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h2 style={{ textAlign: 'center' }}>
         <Battery />
         CRISP
         <Battery />
      </h2>
      <h2 style={{ textAlign: 'center' }}>Comprehensive Regression for Impedance Spectroscopy Prediction over ELF Regions using AI</h2>
      <Apptabs />
    </div>
  );
}

export default App;
