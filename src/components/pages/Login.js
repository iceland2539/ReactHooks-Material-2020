import React, { useState } from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import * as loginAction from "../../actions/login.action";
import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();
  const loginReducer = useSelector(({ loginReducer }) => loginReducer);
  const HanderChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={`${process.env.PUBLIC_URL}/images/authen_header.jpg`}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Login
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(loginAction.login({ ...account, ...props }));
          }}
        >
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            name="username"
            margin="normal"
            value={account.username}
            onChange={HanderChange}
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            name="password"
            type="password"
            value={account.password}
            onChange={HanderChange}
            margin="normal"
            fullWidth
          />
          {loginReducer.error && (
            <Alert severity="error">{loginReducer.result}</Alert>
          )}
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              Login
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                props.history.push("/register");
              }}
              color="primary"
              fullWidth
            >
              Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
