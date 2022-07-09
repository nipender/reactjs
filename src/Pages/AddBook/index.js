import React, { Component } from 'react';
import Layout from '../../Component/Layout';
import { Form , FormGroup , Label , Button , Alert, FormFeedback, Input  } from 'reactstrap';
import axiosInstance from '../../instance/axiosInstance';


class AddBook extends Component {

    constructor(props){
        super(props);
        this.state = {
            data : {
                book_number:'',
                book_type:'',
                book_title:'',
                book_slug:'',
                book_language:'',
                book_subjects:'',
                book_loc_class:'',
                book_shelves:'',
                book_subtitle:'',
                book_notes:'',
                book_source:'',
                book_link:'',
                book_about:'',
            },
            success : {},
            errors: {},
            session: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
        
        if(data.book_number === '' || data.book_number === undefined) errors.book_number = 'Book Number can not be blank.';
        if(data.book_type === '' || data.book_type === undefined) errors.book_type = 'Book Type can not be blank.';
        if(data.book_title === '' || data.book_title === undefined) errors.book_title = 'Book Title can not be blank.';
        if(data.book_language === '' || data.book_language === undefined) errors.book_language = 'Book Language can not be blank.';
        if(data.book_authors === '' || data.book_authors === undefined) errors.book_authors = "Authors can not be blank.";
        if(data.book_subjects === '' || data.book_subjects === undefined) errors.book_subjects = 'Book Subjects can not be blank.';
        if(data.book_loc_class === '' || data.book_loc_class === undefined) errors.book_loc_class = 'Book Loc can not be blank.';
        if(data.book_shelves === '' || data.book_shelves === undefined) errors.book_shelves = 'Book Shelves can not be blank.';
        if(data.book_subtitle === '' || data.book_subtitle === undefined) errors.book_subtitle = 'Book Subtitle can not be blank.';
        // if(data.book_notes === '' || data.book_notes === undefined) errors.book_notes = 'Book Note can not be blank.';
        if(data.book_source === '' || data.book_source === undefined) errors.book_source = 'Book Source can not be blank.';
        if(data.book_link === '' || data.book_link === undefined) errors.book_link = 'Book Link can not be blank.';
        // if(data.book_about === '' || data.book_about === undefined) errors.book_about = 'Book About can not be blank.';
        return errors;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;
        let errors = this.validation();

        console.log('errors',errors);

        if(Object.keys(errors).length === 0){

            console.log('data',data);
            
            try {
                
                const response = axiosInstance.post('book/addNewBook', data);
                
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
                                book_number:'',
                                book_type:'',
                                book_title:'',
                                book_slug:'',
                                book_language:'',
                                book_subjects:'',
                                book_loc_class:'',
                                book_shelves:'',
                                book_subtitle:'',
                                book_notes:'',
                                book_source:'',
                                book_link:'',
                                book_about:'',
                            },
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
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label htmlFor="book_number">Book Number</Label>
                                    <Input type='text' name="book_number" id="book_number" invalid={errors.book_number? true : false} className="" value={data.book_number} onChange={this.handleChange}  placeholder="Book Number" />
                                    <FormFeedback>{errors.book_number}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="book_type">Book Type</Label>
                                    <Input type='text' name="book_type" id="book_type" invalid={errors.book_type? true : false} className="" value={data.book_type} onChange={this.handleChange}  placeholder="Book Type" />
                                    <FormFeedback>{errors.book_type}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="book_title">Book Title</Label>
                                    <Input type='text' name="book_title" id="book_title" invalid={errors.book_title? true : false} className="" value={data.book_title} onChange={this.handleChange}  placeholder="Book Title" />
                                    <FormFeedback>{errors.book_title}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="book_language">Book Language</Label>
                                    <Input type='text' name="book_language" id="book_language" invalid={errors.book_language? true : false} className="" value={data.book_language} onChange={this.handleChange}  placeholder="Book Language" />
                                    <FormFeedback>{errors.book_language}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="book_authors">Book Authors</Label>
                                    <Input type='text' name="book_authors" id="book_authors" invalid={errors.book_authors? true : false} className="" value={data.book_authors} onChange={this.handleChange}  placeholder="Book Authors" />
                                    <FormFeedback>{errors.book_authors}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="Book Subjects">Book Subjects</Label>
                                    <Input type='text' name="book_subjects" id="book_subjects" invalid={errors.book_subjects? true : false} className="" value={data.book_subjects} onChange={this.handleChange}  placeholder="Book Subjects" />
                                    <FormFeedback>{errors.book_subjects}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="Library of Congress Classification (LoCC)">Library of Congress Classification (LoCC)</Label>
                                    <Input type='text' name="book_loc_class" id="book_loc_class" invalid={errors.book_loc_class? true : false} className="" value={data.book_loc_class} onChange={this.handleChange}  placeholder="Library of Congress Classification (LoCC)" />
                                    <FormFeedback>{errors.book_loc_class}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="Book Shelves">Book Shelves</Label>
                                    <Input type='text' name="book_shelves" id="book_shelves" invalid={errors.book_shelves? true : false} className="" value={data.book_shelves} onChange={this.handleChange}  placeholder="Book Shelves" />
                                    <FormFeedback>{errors.book_shelves}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="Book SubTitle">Book SubTitle</Label>
                                    <Input type='text' name="book_subtitle" id="book_subtitle" invalid={errors.book_subtitle? true : false} className="" value={data.book_subtitle} onChange={this.handleChange}  placeholder="Book SubTitle" />
                                    <FormFeedback>{errors.book_subtitle}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="Book Notes">Book Notes</Label>
                                    <Input type="textarea" name="book_notes" id="book_notes" invalid={errors.book_notes? true : false} className="form-control" onChange={this.handleChange}  placeholder="Book Notes" value={data.book_notes} />
                                    <FormFeedback>{errors.book_notes}</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="Book Sourse">Book Sourse</Label>
                                    <Input type='text' name="book_source" id="book_source" invalid={errors.book_source? true : false} className="form-control" onChange={this.handleChange} value={data.book_source} placeholder="Book Sourse" />
                                    <FormFeedback>{errors.book_source}</FormFeedback>
                                </FormGroup>
                                
                                <FormGroup>
                                    <Label htmlFor="Book Url">Book Url</Label>
                                    <Input type='url' name="book_link" id="book_link" invalid={errors.book_link? true : false} className="form-control" onChange={this.handleChange} value={data.book_link} placeholder="Book Url" />
                                    <FormFeedback>{errors.book_link}</FormFeedback>
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="Book About">Book About</Label>
                                    <Input type="textarea" name="book_about" id="book_about" invalid={errors.book_about? true : false} className="form-control" onChange={this.handleChange}  placeholder="Book About" value={data.book_about} />
                                    <FormFeedback>{errors.book_about}</FormFeedback>
                                </FormGroup>

                                <FormGroup>
                                    <Button type="submit" className="importCsv btn-primary"  >Add New</Button>
                                </FormGroup>
                            </Form>
                            
                            <Alert color="success" className="text-center" isOpen={success.isActive ? true : false}>{success.messages}</Alert>
                            <Alert color="danger" className="text-center" isOpen={errors.isActive ? true : false}>{errors.messages}</Alert>
                        </div>
                    </div>
                </div>
            </main>
            </Layout>
        )
    }
}

export default AddBook;
