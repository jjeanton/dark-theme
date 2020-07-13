import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import logo from "../../../assets/img/brand/antares-logo-w.png";
import powered from '../../../assets/img/brand/PROWER_BY_ANTARES.png';
import AuthContext from '../../../context/auth/authContext';
import ToastContext from '../../../context/toaster/toastContext';

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const { auth, msg, login } = authContext;
  const toastContext = useContext(ToastContext);
  const {showToaster} = toastContext
  const [logindata, setLogin] = useState({
    Username: '',
    Password: ''
  });
  const [verified, setVerified] = useState(false);
  const {Username, Password} = logindata;
  
  useEffect(() => {
    if(auth) {
      props.history.push('/dashboard');
    }
    if(msg) {
      showToaster(msg)
    }
  },[auth, msg])

  const onChangeForm = e => {
    setLogin({
      ...logindata,
      [e.target.name]: e.target.value
    })
  }

  const submitHandler = event => {
    event.preventDefault();
    if (Username.trim().length === '' || Password.trim().length === '') {
      showToaster({msg:'Son necesario todos los campos', type:'error'})
      return ;
    }
    login(logindata);
  };

  const onVerify = (e) => {
    setVerified(true)
    
  }
    return (
      <div className="app flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="4">
            <CardGroup>
              <Card className="p-4">
                {/* <div className="mr-0">
                  <img src={powered} alt="antares" style={{width: '30%'}} className="float-right rounded d-block" />
                </div> */}
                <CardBody>
                  <Form onSubmit={submitHandler}>
                    <img src={powered} alt="Logo" style={{width: '80%'}} className="rounded mx-auto d-block" />
                    <InputGroup className="mb-3 mt-2">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="Username" type="email" placeholder="Email" autoComplete="Username" name="Username" value={Username} onChange={onChangeForm} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input id="Password" type="password" placeholder="Password" autoComplete="current-password" name='Password' value={Password} onChange={onChangeForm} />
                    </InputGroup>
                    {/* <Row style={{marginLeft: -22}}>
                      <Reaptcha sitekey="6LcJ9qUZAAAAAHuu0bFVGvtncI7tMb8-UVm8L6An" onVerify={e => onVerify(e)} />
                    </Row> */}
                    <Row className="mt-2">
                      <Col xs="12">
                        <Button color="#064ca1" style={{"width":"100%"}} className="px-4 btn btn-primary bg-primary" disabled={!verified} type="submit">Iniciar Sesión</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
    );
}

export default Login;
