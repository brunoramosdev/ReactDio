
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import '../../styles/app.css';
import { Container, Title, Column, TitleLogin, SubtitleLogin, Wrapper } from './styles';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from "react-hook-form";
//import { useNavigate  } from "react-router-dom";
import { MdEmail, MdLock } from 'react-icons/md';
import { FaUser } from 'react-icons/fa'

const schema = yup.object({
  email: yup.string().email('e-mail inválido ex: usuario@mail.com').required('Campo Obrigatório'),
  nome: yup.string().required('Campo Obrigatório'),
  password: yup.string().min(6, 'No minimo 6 caracteres')//.required('Campo Obrigatório'),
}).required();

const Cadastro = () => {

    //const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
      resolver: yupResolver(schema),
      mode: 'onSubmit'
  });

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


  const onSubmit = (formData) => {
    var lista = [];
    fetch("http://localhost:8001/users", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      for(var i = 0; i < data.length; i++){
        lista.push(data[i].email)
      }
      formData = {
        "id": String(data.length + 1),
        "nome": formData.nome,
        "email": formData.email,
        "senha": formData.password
      }
      if(!lista.includes(formData.email)){
        fetch('http://localhost:8001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
        },
          body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
          displayAlert('Usuário criado com sucesso', 'success');
          // Atualizar UI ou realizar outras ações
        })
        .catch((error) => {
          displayAlert('Erro ao criar usuário', 'danger');
        });
      }else{
        displayAlert('Email ja cadastrado', 'danger');
      }
    })
    .catch((error) => console.log(error));

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
                  <div className="alerta"></div>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input placeholder="Nome Completo" errorMessage={errors?.nome?.message} leftIcon={<FaUser />} name="nome"  control={control} />
                    <Input placeholder="E-mail" errorMessage={errors?.email?.message} leftIcon={<MdEmail />} name="email"  control={control} />
                    <Input type="password" placeholder="Senha" errorMessage={errors?.password?.message} leftIcon={<MdLock />}  name="senha" control={control} />
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                </Wrapper>
            </Column>
        </Container>
    </>)
}

export { Cadastro }