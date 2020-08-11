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
          }}
          initialValues={{ username: "", password: "" }}
        >
          {(props) => showForm(props)}
        </Formik>
      </CardContent>
    </Card>
  );
}
