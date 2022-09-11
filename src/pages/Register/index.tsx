import Container  from '../../components/container';
import styles from './register.module.scss';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { hash } from "bcryptjs";
import { Input } from '../../components/Form/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useNuiCallback } from "fivem-nui-react-lib";
import { useEffect, useState } from 'react';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const registerFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres'),
  password_confirmation: yup.string().oneOf([
      null, yup.ref('password')
  ], 'As senhas precisam ser iguais'),
})

export default function Register() {
  let navigate = useNavigate()
  const [Register, setRegister] = useState<string>('');
  const [fetchMyMethod] = useNuiCallback("REACTNUI", "register", setRegister);

  const { register, handleSubmit, formState } = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
    mode: "all"
  })
  const { errors } =  formState
  const handleSignIn = async (values: RegisterFormData) => {
    try {
      const senha = await hash(values.password, 8)
      fetchMyMethod({name: values.name, email: values.email, password: senha})     
    } catch (error) {
    }
  }   
  
  useEffect(() => {
    if (Register === "Redirect") {
      navigate("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Register])
  

  return (
    <Container redirects={false}>
      <div className={styles.register}>
        <div className={styles.description}>
          <h1>Policia Militar de dash city</h1>
          <p>Deseja entrar na nossa corporação, então, faça login e espere ate ser liberado no nosso sistema.</p>
          <p className={styles.dash}>DAS<span>H.</span></p>
        </div>
        <div className={styles.divider}></div>
        <form className={styles.formulario} onSubmit={handleSubmit(handleSignIn)} style={(errors.email?.message || errors.password?.message || errors.password_confirmation?.message) ? {border: "1px solid red"} : {}}>
          <Input nome="name" type="name" label="Nome" error={errors.name} {...register('name')}/>
          <Input nome="email" type="email" label="E-mail" error={errors.email} {...register('email')}/>
          <div className={styles.divider_input_label}></div>
          <Input nome="password" type="password" label="Senha" error={errors.password} {...register('password')} />
          <Input nome="password_confirmation" type="password" label="Confirmação de senha" error={errors.password_confirmation} {...register('password_confirmation')} />
          <button type="submit">Entrar</button>
          <Link to="/">Já possui login ?</Link>
        </form>
      </div>
    </Container>
  );
}


