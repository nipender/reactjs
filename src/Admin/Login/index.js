import React, { Component } from 'react';
import Layout from '../../Component/Adminlayout';
import { isEmail } from 'validator';
import { Form , FormGroup , Label , Button , Alert, FormFeedback, Input } from 'reactstrap';
import { Link , useHistory } from 'react-router-dom';
import axiosInstance from '../../instance/axiosInstance';


class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : {
                email:'',
                password:''
            },
            success : {},
            errors: {},
            session: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    componentDidMount() {


    }

    handleChange = (e) => {
        this.setState({
            data : {
                ...this.state.data,
                [e.target.name] : e.target.value
            },
            errors : {
                ...this.state.errors,
                [e.target.name] : ''
            }
        });
    }

    validation = () => {
        const {data} = this.state;
        let errors = {};
       
        if(!isEmail(data.email)) errors.email = 'Email must be valid';
        if(data.email === '') errors.email = 'Email can not be blank.';
        if(data.password.length < 6 ) errors.password = "Password should be greater than 6 digits.";
        if(data.password === '') errors.password = 'Password can not be blank.';

        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;
        let errors = this.validation();      

        if(Object.keys(errors).length === 0){
            
            try {
                
                const response = axiosInstance.post('admin/login', data);
                
                response.then((response) => {
                    
                   const {  messages , status , user_id , token } = response.data;
                   
                   if(status === 0){
                        this.setState({
                            errors : {
                                'messages' : messages,
                                'isActive' : true
                            },
                            success:{}
                        });
                    }else{
                        this.setState({
                            success : {
                                'messages' : messages,
                                'isActive' : true
                            },
                            errors:{}
                        });

                        localStorage.setItem('token', token);
                        this.props.history.push({
                            pathname: '/admin/dashboard'
                        });
                    }

                });
                
                return data;
            } catch (error) {
                console.log(error);
            }           
            
        }else{            
            this.setState({errors});
        }        

    }

    
    render() { 
        
        const { data , errors, success } = this.state;

        return (
            <Layout>
            <main className="main-content">
                <div className="section-padding">
                    <div className="container">
                        <div className="middle-content">
                            <Alert color="success" className="text-center" isOpen={success.isActive ? true : false}>{success.messages}</Alert>
                            <Alert color="danger" className="text-center" isOpen={errors.isActive ? true : false}>{errors.messages}</Alert>
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="email">Email</Label>
                                    <Input type='email' name="email" id="email" invalid={errors.email? true : false} className="" value={data.email} onChange={this.handleChange}  placeholder="Email" />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </FormGroup>                                
                                <FormGroup>
                                    <Label htmlFor="password">Password</Label>
                                    <Input type='password' name="password" id="password" invalid={errors.password? true : false} className="" value={data.password} onChange={this.handleChange}  placeholder="Password" />
                                    <FormFeedback>{errors.password}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" className="importCsv btn-primary"  >Login</Button>
                                </FormGroup>
                            </Form>
                        </div>
                    </div>
                </div>
            </main>
            </Layout>
        )
    }
}

export default Login
