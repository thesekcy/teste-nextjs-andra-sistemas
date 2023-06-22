'use client';
import { useContext, useState } from 'react';
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { AuthContext } from '@/contexts/Auth/AuthContext';
import { loginFormValues, loginSchema } from "@/schemas/loginSchema";
import { Container, Button, Stack, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';


export const metadata = {
  title: 'Login App Next.js',
  description: 'Desc Login App Next.js',
}

export default function LoginPage() {
  const auth = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormValues>({ resolver: zodResolver(loginSchema) })

  function onSubmit(dataForm: loginFormValues) {
    auth.signin(dataForm.email, dataForm.password)
  }

  return (
    <div className='login_page'>
      <div className="background_content">
        <Image src="/images/logobranco.png" height={97} width={368} alt="Logo branca Andra Sistemas" />
      </div>
      <div className='form_content'>
        <Container maxWidth="md">
          <Stack alignItems={'center'} spacing={1} sx={{ mb: 3 }}>
            <Image className="d-lg-none" src="/images/logoazul.png" height={97} width={368} alt="Logo azul Andra Sistemas" />
            <Typography variant="h3"><strong>Olá usuário</strong></Typography>
            <Typography variant="h6">Seja bem vindo!</Typography>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1}>
              <TextField
                fullWidth
                variant='filled'
                label="Digite seu email"
                id="email"
                {...register('email')}
                type="email"
              />
              {errors.email && (
                <Typography color="error" variant="body2">
                  {errors.email.message}
                </Typography>
              )}
              <TextField
                fullWidth
                variant='filled'
                label="Digite sua senha"
                id="password"
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                  <InputAdornment position = "end" >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                  </InputAdornment>
            )
                }}

              />
            {errors.password && (
              <Typography color="error" variant="body2">
                {errors.password.message}
              </Typography>
            )}
          </Stack>

          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            disabled={auth.authLoading}
            style={{backgroundColor: '#279574', boxShadow: 'none'}}
          >
            {auth.authLoading ? 'Entrando...' : 'Entrar na plataforma'}
          </Button>
        </form>
      </Container>
    </div>
    </div >
  )

}
