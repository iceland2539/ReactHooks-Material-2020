import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { JsonWebTokenError } from "jsonwebtoken";
import Axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [account, setAccount] = useState({ username: "", password: "" });
  const classes = useStyles();

  const [isError, setisError] = useState(false);
  const [showDialog, setshowDialog] = useState(false);
  const HanderChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  function showForm({
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
  }) {
    return (
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="username"
          variant="outlined"
          name="username"
          margin="normal"
          value={values.username}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          id="password"
          label="password"
          variant="outlined"
          name="password"
          value={values.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        {isError && (
          <Alert severity="error">Error your registertion fail</Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          disabled={isSubmitting}
        >
          Register
        </Button>

        <Button
          onClick={() => {
            props.history.push("/login");
          }}
          color="primary"
          fullWidth
        >
          Cancle
        </Button>
      </form>
    );
  }

  return (
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Register
          </Typography>
          <Formik
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              Axios.post("http://localhost:8085/api/v2/authen/register", values)
                .then((result) => {
                  setSubmitting(false);
                  // alert(JSON.stringify(result.data));
                  const { data } = result;
                  if (data.result == "ok") {
                    setshowDialog(true);
                  } else {
                    setisError(true);
                  }
                })
                .catch((error) => {
                  alert(JSON.stringify(error));
                });
            }}
            initialValues={{ username: "", password: "" }}
          >
            {(props) => showForm(props)}
          </Formik>
        </CardContent>
      </Card>
      <Dialog
        open={showDialog}
        keepMounted
        onClose={() => {}}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Register Account !!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Register Success !!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.history.push("/login");
            }}
            color="primary"
          >
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
