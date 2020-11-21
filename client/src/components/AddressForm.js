import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SelecltDate from './Date';
export default function AddressForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Check IN-OUT
      </Typography>

      <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <SelecltDate Lableing={"체그인"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelecltDate Lableing={"체그인"}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Adult"
                label="Adult"
                type="Adult"
                id="Adult"
                autoComplete="current-password"
                onChange={(e) => {
                    //setAdult(e.target.value);
              }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Kid"
                variant="outlined"
                required
                fullWidth
                id="Kid"
                label="Kid"
                autoFocus
                onChange={(e) => {
                    //setKid(e.target.value);
              }}
              />
            </Grid>
        </Grid>
    </React.Fragment>
  );
}