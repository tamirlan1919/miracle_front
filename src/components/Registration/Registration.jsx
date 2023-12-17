import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../../helper';
import { regist } from '../../redux/slice/authSlice';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jwt } = userData();
  const [error, setError] = React.useState(null);
  const [successMessage, setSuccessMessage] = React.useState(null);

  React.useEffect(() => {
    if (jwt) navigate('/');
  }, [jwt]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get('firstName');
    const email = data.get('email');
    const password = data.get('password');

    try {
      const request = await dispatch(regist({ username: name, email: email, password: password }));
  
      if (regist.rejected.match(request)) {
        // Обработка ошибки регистрации
        setError(request.payload);
      } else if (request.payload && request.payload.confirmed === false) {
        // Успешная регистрация, перенаправление на страницу проверки почты
        setSuccessMessage('Регистрация успешна! Пожалуйста, проверьте вашу почту.');
        setError(null);
      } else if (request.payload && request.payload.jwt) {
        // Успешная регистрация
        setSuccessMessage('Регистрация успешна!');
        setError(null);
        navigate('/');
      }
    } catch (error) {
      console.warn('Registration error:', error);
      setError('Произошла ошибка при регистрации');
    }
  };

  return (
    <div className="mb-5">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'black' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="Full Name"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                className="bg-black"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" color="success">
            {successMessage}
          </Typography>
        )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
