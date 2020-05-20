import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

    const Toasters = ({props}) => {
    const [toast, setToast] = useState(false);

    const handleClose = ({ props }) => {
       setToast(false);
      }

    return (
        <Snackbar open={toast}
          autoHideDuration={5000}
          onClose={handleClose()}
          message={props.msgs}
          anchorOrigin={{vertical:'top',horizontal:'right'}}
          action={[
            <IconButton 
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={()=>this.handleClose()}
            >
              x
            </IconButton>
          ]}
          />
    );
}

export default Toasters;
