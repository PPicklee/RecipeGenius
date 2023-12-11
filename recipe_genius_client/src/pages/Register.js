import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";


const Register = () => {

    //=============VARIABLES=============
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    //=============FUNCTIONS=============
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        try{
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            console.log(response)
        } catch (err){
            console.error(err);
        }
    }

    //=============HTML=============
    return(
        <div>
            <h1>Register</h1>
            <form onSubmit={handleFormSubmit} method="post" className="register-form">
                <Row>
                    <Col><label htmlFor="email">Email:</label></Col>
                    <Col><input type="email" id="email" name="email" required value={formData.email} onChange={handleChange}/></Col>
                </Row>
                <br/>
                <Row>
                    <Col><label htmlFor="password">Password:</label></Col>
                    <Col><input type="password" id="password" name="password" required value={formData.password} onChange={handleChange}/></Col>
                </Row>
                <br/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;