import React from 'react';
import { Button } from '../Button';
import logo from '../../pages/assets/logo.svg';
import { useNavigate  } from "react-router-dom";

import { 
    Container, 
    Row, 
    Wrapper,
    BuscarInputContainer,
    Menu,
    Input,
    UserPicture,
    Image
} from './styles';

const Header = ({autenticado}) => {
    const navigate = useNavigate()
  
    const onHandleEntrar = () => {
        navigate('/login')
    }

    const onHandleCadastrar = () => {
        navigate('/cadastro')
    }

    const onHandleHome = () => {
        navigate('/')
    }

  return (
    <Wrapper>
        <Container>
            <Row>
                <Image src={logo} alt="Logo da DIO" id="imagem" onClick={onHandleHome}/>
                {autenticado ? (
                    <>
                        <BuscarInputContainer>
                        <Input placeholder='Buscar...' />
                        </BuscarInputContainer>
                        <Menu>Live Code</Menu>
                        <Menu>Global</Menu>
                    </>
                ) : null }
                
            </Row>
            <Row>
                {autenticado ? (
                    <>
                        <UserPicture src="https://avatars.githubusercontent.com/u/62252075?v=4" />
                    </>
                ) : (
                    <>
                        <Button onClick={onHandleEntrar} title="Entrar"/>
                        <Button onClick={onHandleCadastrar} title="Cadastrar"/>
                    </>
                )}
            </Row>
        </Container>
    </Wrapper>
  )
}

export { Header }