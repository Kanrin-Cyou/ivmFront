import React from 'react';
import {Avatar,Button,CssBaseline,TextField,FormControlLabel,Checkbox,Link,Grid,Box,Typography,makeStyles,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit">
            Globallan Ltd.
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
const useStyles = makeStyles((theme) => ({
paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
},
avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
},
form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
},
submit: {
    margin: theme.spacing(3, 0, 2),
},
}));
  
function SignIn(props) {
const classes = useStyles();

return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        <form className={classes.form} noValidate>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={props.onEmailChange}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={props.onPasswordChange}
        />
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
        />
        <Button
            onClick={props.onSubmitSignIn}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Sign In
        </Button>
        <Grid container>
            <Grid item xs>
            <Link href="#" variant="body2">
                Forgot password?
            </Link>
            </Grid>
            <Grid item>
            <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            </Grid>
        </Grid>
        </form>
    </div>
    <Box mt={8}>
        <Copyright />
    </Box>
    </Container>
);
}

class Signin extends React.Component{
    
    constructor(){
        super();
        this.state = {
            signInEmail:'',
            signInPassword:''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        }).then(response => response.json()).then(user => {
            if (user.id) {
                console.log(user)
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            } 
        })
    }

    render(){
        return(
            <SignIn 
            className={"SignIn"}
            onEmailChange={this.onEmailChange}
            onPasswordChange={this.onPasswordChange}
            onSubmitSignIn={this.onSubmitSignIn}/>
        )}
        } 

export default Signin;