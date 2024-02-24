import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #8e9eab, #eef2f3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    width: '20%', // Adjusted width for a narrower box
    borderRadius: '10px',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    background: 'white',
  },
  input: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  header: {
    marginBottom: theme.spacing(3),
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [invalid, setInvalid] = useState(false)
  const handleSignIn = (data) => {
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    if (data.email === email && data.password === password) {
      localStorage.setItem("password", data.newpassword)
      alert("Password Reset successful")
    }
    else {
      setInvalid(true)
    }
    handleSubmit()
  };

  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.form}>
        <Typography variant="h4" className={classes.header}>
          Reset Password        </Typography>
        {invalid && <div style={{ color: "red", margin: "8px" }}>
          Email or Password is Invalid
        </div>}
        <form onSubmit={handleSubmit(handleSignIn)}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            className={classes.input}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && (
            <Typography variant="caption" color="error">
              {errors.email.message}
            </Typography>
          )}
          <TextField
            type="password"
            label="Old Password"
            variant="outlined"
            fullWidth
            className={classes.input}
            {...register('password', { required: 'Old Password is required' })}
          />
          {errors.password && (
            <Typography variant="caption" color="error">
              {errors.password.message}
            </Typography>
          )}
          <TextField
            type="newpassword"
            label="New Password"
            variant="outlined"
            fullWidth
            className={classes.input}
            {...register('newpassword', { required: 'New Password is required' })}
          />
          {errors.newpassword && (
            <Typography variant="caption" color="error">
              {errors.newpassword.message}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.button}
            type="submit"
          >
            Reset
          </Button>
        </form>
        <Typography variant="subtitle1">
          Go to  <Link href="/signin">SignIn</Link>
        </Typography>

      </Paper>
    </div>
  );
};

export default ResetPassword;
