import Container  from '../../components/container';
import { Input } from '../../components/Form/Input';
import styles from "./login.module.scss";
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom';
import { compare } from 'bcryptjs';
import { useNuiCallback, useNuiRequest } from 'fivem-nui-react-lib';
import { useEffect, useState } from 'react';

type LoginFormData = {
  email: string;
  password: string;
}
  
const LoginFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'Mínimo de 6 caracteres')
})
  

export default function Login() {
  const { send } = useNuiRequest()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState<string>('');
  const [senhaAgora, setSenhaAgora] = useState<string>('');
  const [fetchMyMethod] = useNuiCallback("REACTNUI", "login", setNewPassword);
  
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema),
    mode: "all"
  })
  const { errors } =  formState

  const handleLogIn = async (values: LoginFormData) => {
    try {
      setSenhaAgora(values.password)
      fetchMyMethod({email: values.email})
    } catch (error) {}  
  }

  const handlenow = async (senhaAgora: string,newPassword: string) => {
    const isSenhaCorrect = await compare(senhaAgora,newPassword)
    if (isSenhaCorrect === true) {
      send("mensagem",{ message: "Logado com sucesso",code: "sucesso"})
      navigate('/dashboard')
    }
  }

  useEffect(() => {
    if (senhaAgora !== '') {
      handlenow(senhaAgora,newPassword)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senhaAgora,newPassword])
  

  return (
    <Container redirects={false}>
        <div className={styles.login_wrap}>
            <div className={styles.login_title}>
                <img src="https://cdn.discordapp.com/attachments/593999593386278912/1009162577860890709/user.png" alt="Profile" />
                <h1>Departamento de policia de dash city</h1>
            </div>
            <form className={styles.form_login} onSubmit={handleSubmit(handleLogIn)}>
                <Input nome="email" type="email" label="E-mail" error={errors.email} {...register('email')}/>
                <Input nome="password" type="password" label="Senha" error={errors.password} {...register('password')}/>
                <Link to="/register">Não possui uma conta?</Link>
                <button type="submit">Entrar</button>
            </form>
        </div>
    </Container>
  );
}


