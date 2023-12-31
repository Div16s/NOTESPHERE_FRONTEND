import React, { useEffect } from 'react'
import { useState } from 'react';
import MainScreen from '../../Components/MainScreen'
import { Link } from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap';
import './LoginPage.css';
import axios from 'axios';
import Loading from '../../Components/Loading';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { initializeUseSelector } from 'react-redux/es/hooks/useSelector';
import { login } from '../../actions/userActions';

const LoginPage = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const {loading,error,userInfo} = userLogin;
    

    useEffect(() => {
        if(userInfo){
            navigate("/myNotes");
        }
    }, [navigate,userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email,password));
        // try {
        //     const config = {
        //         "Content-type":"application/json"
        //     }

        //     setLoading(true);

        //     const {data} = await axios.post(
        //         "http://localhost:8000/user/login",
        //         {
        //             email,
        //             password,
        //         },
        //         config
        //     )
        //     console.log(data);
        //     localStorage.setItem('userInfo',JSON.stringify(data));
        //     setLoading(false);

        // } catch (error) {
        //     setError(error.response.data.message);
        //     setLoading(false);
        // }
    }

    return (
        <MainScreen title='LOGIN'>
            <div className='loginContainer'>
                {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
                {loading && <Loading/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                         type="email" 
                         value={email}
                         placeholder="Enter email" 
                         onChange={(e) => setEmail(e.target.value)}
                         />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                         type="password" 
                         value={password}
                         placeholder="Password"
                         onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
            
                    <Button type="submit" className='btn btn-dark'>
                        Submit
                    </Button>
                </Form>
                <Row className='py-3'>
                    <Col>
                        New User ? <Link to='/register'>Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default LoginPage