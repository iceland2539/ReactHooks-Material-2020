import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

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
  const classes = useStyles();

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
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="username"
            variant="outlined"
            name="username"
            margin="normal"
            fullWidth
          />
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            name="password"
            margin="normal"
            fullWidth
          />
        </form>
      </CardContent>
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
    </Card>
  );
}
