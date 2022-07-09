import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';
import Layout from '../../Component/Layout';
import {Form , FormGroup , Label , Button , Alert } from 'reactstrap';
import axiosInstance from '../../instance/axiosInstance';
const buttonRef = React.createRef();

class ExportXml extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            errors : {},
            session : {},
            success : {},
            data : {}
        }
        
  }

  componentDidMount() {

    let token = localStorage.getItem('token');
    if(token === null){
      this.props.history.push({
        pathname: '/login'
      });
    }
  }
	
  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = (data) => {
    
    if(data){
        this.setState({data});
    }else{
        this.setState({
            ...this.state.errors,
            errors : {
                isActive:true,
                messages:'Please accept valid format.'
            }
        });
    }
     
  };

  handleOnError = (err, file, inputElem, reason) => {    
    //console.log(err);
  };

  handleOnRemoveFile = (data) => {   
    //console.log(data);
  };
  
  handleRemoveFile = (e) => {
    const { data } = this.state;

    let errors = this.validation();
    
    if(Object.keys(errors).length === 0){
        
        try {
            
            const response = axiosInstance.post('importBook', {data});
            
            response.then((response) => {
                
              const {  messages , status } = response.data;
              
              if(status === false){
                this.setState({
                    errors : {
                        'messages' : messages,
                        'isActive' : true
                    },
                    success:{}
                });
                buttonRef.current.removeFile(e);
              }else if(status === true){
                this.setState({
                    success : {
                        'messages' : messages,
                        'isActive' : true
                    },
                    data:{},
                    errors:{}
                });
                buttonRef.current.removeFile(e);
              }                    

            });
            
            return data;
        } catch (error) {
            console.log(error);
        }
       
        
    }else{        
      this.setState({errors});
    }   

  };

  validation = () => {
    const {data} = this.state;
    let errors = {};
    
    if(data === '' || data === undefined) errors.uploadCsv = 'Upload Csv can not be blank.';

    return errors;
}



render() {

    const {errors  , success  } = this.state;
    
    return (
      <>
        <Layout>
            <main className="main-content">
                <div className="section-padding">
                    <div className="container">
                        <div className="middle-content">
                        <Alert color="success" isOpen={success.isActive ? true : false}>{success.messages}</Alert>
                        <Alert color="danger" isOpen={errors.isActive ? true : false}>{errors.messages}</Alert>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="import">Import Csv</Label>
                                <CSVReader    
                                ref={buttonRef}                        
                                inputId="uploadCsv"
                                inputName="uploadCsv"                                 
                                onFileLoad={this.handleOnFileLoad}
                                onError={this.handleOnError}
                                onRemoveFile={this.handleOnRemoveFile}
                                >
                                  <span style={{'padding':'40px'}}>Click or Drag to upload.</span>
                                </CSVReader>
                                <div className="invalid-feedback" style={{'display':errors.uploadCsv?'block':'none'}}>{errors.uploadCsv}</div>
                            </FormGroup>
                            <FormGroup>
                                <Button type="button" className="importCsv btn-primary" onClick={this.handleRemoveFile} >Import Csv</Button>
                            </FormGroup>
                        </Form> 
                        </div>
                    </div>
                </div>
                
            </main>
        </Layout>
      </>
    );
  }
}

export default ExportXml