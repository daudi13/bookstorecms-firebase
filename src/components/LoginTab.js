import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { TextField, Button } from '@mui/material';
import { Box } from '@mui/system';
import { signInWithEmailAndPassword } from 'firebase/auth';
import firebaseEngine from '../firebase';
import { BookstoreState } from '../BookstoreContex';
import { useNavigate } from 'react-router';

const LoginTab = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setAlert } = BookstoreState();
  const navigate = useNavigate();
  const { auth } = firebaseEngine;

  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const user = userCreds.user
        setAlert({
          open: true,
          message: `You have successfully Logged in with ${user.email}`,
          type: "success"
        })
        navigate("/homepage")
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: `${error.message}`,
          type: "error"
        })
    })
  }

  const useStyle = makeStyles()((theme) => ({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 20,
      alignItems: "center",
      minWidth: "450px",
      [theme.breakpoints.down("sm")]: {
        width: "300px"
      }
    },
    input: {
      width: "100%",
    [theme.breakpoints.down("sm")]: {
        width: "300px"
      }
    },
    button: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "65%"
      }
    }
  }))

  const { classes } = useStyle();

  return (
    <Box p={3} className={classes.wrapper}>
      <TextField
      variant='outlined'
      type="email"
      label="Enter email"
      value={email}
      className={classes.input}
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      
      />
      <TextField
      variant='outlined'
      type="password"
      value={password}
      label="Enter password"
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      className={classes.input}
      />
      <Button
        variant="contained"
        type="submit"
        size="large"
        onClick={handleSubmit}
        className={classes.button}
      >
        login
      </Button>
    </Box>
  )
}

export default LoginTab