import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { MdEmail, MdLock } from 'react-icons/md';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input'; 
import { api } from '../../services/api';
import '../../styles/app.css';

import { 
  Container, 
  Wrapper, 
  Row, 
  Column, 
  Title, 
  TitleLogin, 
  SubtitleLogin, 
  EsqueciText, 
  CriarText
} from './styles';

const schema = yup.object({
    email: yup.string().email('e-mail inválido ex: usuario@mail.com').required('Campo Obrigatório'),
    password: yup.string().min(6, 'No minimo 6 caracteres').required('Campo Obrigatório'),
  }).required();

const Login = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    const onHandleCriarConta = () => {
        navigate('/cadastro') 
    }
    
    function displayAlert(text, action){
        var alert = document.querySelector('.alerta')	
        alert.textContent = text;
        alert.classList.add(`alerta-${action}`);
    
        // remove alert
    
        setTimeout(function() {
            alert.textContent = "";
            alert.classList.remove(`alerta-${action}`);
        }, 2000);
    }

    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            displayAlert('Usuário ou senha inválido', 'danger')
        }catch(e){
            //TODO: HOUVE UM ERRO
        }
    };

    console.log('errors', errors);

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
                <Wrapper>
                <div className='alerta'></div>
                <TitleLogin>Fazer Login</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Input name="email" control={control} errorMessage={errors?.email?.message} placeholder="E-mail" leftIcon={<MdEmail />} />
                <Input name="password" control={control} errorMessage={errors?.password?.message} placeholder="Senha" type="password" leftIcon={<MdLock />} />
                <Button title="Entrar" variant="secondary" type="submit" />
              </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <CriarText href="" onClick={onHandleCriarConta}>Criar Conta</CriarText>
                </Row>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Login }