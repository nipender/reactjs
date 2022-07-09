import React, { Component } from 'react';
import Layout from '../../Component/Layout';
import { isEmail } from 'validator';
import { Form , FormGroup , Label , Button , Alert, FormFeedback, Input } from 'reactstrap';
import axiosInstance from '../../instance/axiosInstance';


class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : {
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                con_password:''
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
        
        if(data.firstName === '') errors.firstName = 'First name can not be blank.';
        if(data.lastName === '') errors.lastName = 'Last name can not be blank.';
        if(!isEmail(data.email)) errors.email = 'Email must be valid';
        if(data.email === '') errors.email = 'Email can not be blank.';
        if(data.password.length < 6) errors.password = "Password should be greater than 6 digits.";
        if(data.password === '') errors.password = 'Password can not be blank.';
        if(data.con_password !== data.password) errors.con_password = "Password and Confirm Password should be same.";
        if(data.con_password === '') errors.con_password = 'Confirm Password can not be blank.';
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;
        let errors = this.validation();     

        if(Object.keys(errors).length === 0){
            
            try {
                
                const response = axiosInstance.post('register', data);
                
                response.then((response) => {
                    
                    const {  messages , status } = response.data;
                    
                    if(status === 1){
                        this.setState({
                            success : {
                               'messages' : messages,
                               'isActive' : true
                            },
                            errors : {},
                            data : {
                                firstName:'',
                                lastName:'',
                                email:'',
                                password:'',
                                con_password:''
                            }
                       });
                    }else{
                        this.setState({
                            errors : {
                               'messages' : messages,
                               'isActive' : true
                            },
                            success : {}
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
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input type='text' name="firstName" id="firstName" invalid={errors.firstName? true : false} className="" value={data.firstName} onChange={this.handleChange}  placeholder="First Name" />
                                    <FormFeedback>{errors.firstName}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input type='text' name="lastName" id="lastName" invalid={errors.lastName? true : false} className="" value={data.lastName} onChange={this.handleChange}  placeholder="Last Name" />
                                    <FormFeedback>{errors.lastName}</FormFeedback>
                                </FormGroup>
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
                                    <Label htmlFor="con_password">Confirm Password</Label>
                                    <Input type='password' name="con_password" id="con_password" invalid={errors.con_password? true : false} className="" value={data.con_password} onChange={this.handleChange}  placeholder="Confirm Password" />
                                    <FormFeedback>{errors.con_password}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit" className="importCsv btn-primary"  >Register</Button>
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

export default Register
