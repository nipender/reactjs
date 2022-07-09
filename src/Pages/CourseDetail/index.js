import React, { Component } from 'react';
import Layout from '../../Component/Layout';
import { Link , useHistory } from 'react-router-dom';
import axiosInstance from '../../instance/axiosInstance';
import Book from './../../assets/images/book.png'
import ArtPhoto from './../../assets/images/art-photo.png'

class CourseDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            bookDetail : {},
            success : false,
            error: false,
            messages: ''
        }
        
    }
    
    componentDidMount() {
            
        const { match  } = this.props;
        const getBookBySlug =  axiosInstance.post('getBookBySlug',{'book_slug':match.params.slug});
        
        getBookBySlug.then((response) => {

            const { bookDetail , messages, status } = response.data;
            if(status === 1){
                this.setState({ 
                    bookDetail : bookDetail, 
                    messages:messages ,
                    success : true                 
                });
            }else{
                this.setState({ 
                    error : true,
                    messages:messages 
                });
            }
            
        });

    }
    
    render() { 
        
        const { bookDetail , success  } = this.state;
        

        return (
            <Layout>
                <main className="main-content">
                    <div className="section-padding">
                         <div className="container">
                              <div className="middle-content">
                                   <p>Speechify has one of the largest online databases of free audiobooks from the public domain. Choose from thousands of the most popular books. If you are looking for a free audiobook for {bookDetail?.book_title},then you’ve come to the right place! </p>
                                   {success === true && bookDetail?.book_link &&
                                    <div className="text-center mt-5">
                                        <Link to={{ pathname : bookDetail.book_link}} target="_blank" className="btn px-5 btn-primary">Listen Now for Free</Link>
                                    </div>
                                   }
                              </div>
                         </div>
                    </div>
                    {success === true && bookDetail?.book_link &&
                    <div className="section-padding">
                         <div className="container">
                              <div className="box-colored">
                                   <div className="row align-items-center">
                                        <div className="col-12 col-md-3">
                                             <div className="book-media">
                                                  <img src={Book} alt="Book"/>
                                             </div>
                                        </div>
                                        <div className="col-12 col-md-9">
                                             <div className="book-info">
                                                  <ul>
                                                       <li><span>Title </span>{bookDetail?.book_title}</li>
                                                       <li><span>Author </span>{bookDetail?.book_authors}</li>
                                                       <li><span>Rating </span>
                                                       <div className="star-rating">
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                            <i className="fa fa-star"></i>
                                                       </div>
                                                       </li>
                                                       <li><span>Language </span>{bookDetail?.book_language}</li>
                                                       <li><span>Subject </span>{bookDetail?.book_subjects}</li>
                                                       <li><span>Library of Congress <br/> Classification (LoCC)</span> {bookDetail?.book_loc_class}</li>
                                                       
                                                       <li><span>ISBN </span>Various</li>
                                                  </ul>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
                    }
                    {success === true && bookDetail?.book_about &&
                    <div className="section-padding">
                         <div className="container">
                              <h2 className="mb-4">About the book</h2>
                              <p>{bookDetail?.book_about}</p>
                         </div>
                    </div>
                    }
                    <div className="section-padding">
                         <div className="container">
                              <div className="box-colored">
                                   <h5 className="mb-4">What is Speechify? </h5>
                                   <p>At Speechify, we pride ourselves in helping people around the world to improve their reading skills. With the Speechify app, you can create an audio book or ebook in seconds. In this case, we've already done it for you, but for any other book, magazine, online article you can create an audiobook by using our in app OCR tool. We specialize in providing high quality text to speech for all physical, printed, or even digital content. Want to try it?</p>
                                   <div className="text-center mt-4">
                                        {success === true && bookDetail?.book_link &&
                                        <div className="text-center mt-5">
                                             <Link to={{ pathname : bookDetail.book_link}} target="_blank" className="btn px-5 btn-primary">Listen Now for Free</Link>
                                        </div>
                                        }
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="section-padding">
                         <div className="container">
                              <div className="middle-content">
                                   <h2 className="mb-4">Why is this audiobook free?</h2>
                                   <p>{bookDetail?.book_title} is a book that is considered as part of the public domain. gublic domain books are titles or literary works which are not protected by a patent or copyright. jhus, they are available to the public for free and without cost or charges. We've taken the book and turned it into an audioHle for you to enYoy.</p>
                              </div>
                         </div>
                    </div>
                    <div className="section-padding">
                         <div className="container">
                              <div className="box-colored">
                                   <h5 className="mb-4">Is Speechify free?</h5>
                                   <p>Speechify does have a free trial. However, Speechify is a subscription based service. You are welcome to listen to this audiobook for free during your trial period.</p>
                                   <div className="text-center mt-4">
                                        {success === true && bookDetail?.book_link &&
                                        <div className="text-center mt-5">
                                             <Link to={{ pathname : bookDetail.book_link}} target="_blank" className="btn px-5 btn-primary">Listen Now for Free</Link>
                                        </div>
                                        }
                                   </div>
                              </div>
                         </div>
                    </div>
                    <div className="section-padding final-art-sec">
                         <div className="container">
                              <div className="row">
                                   <div className="col-12 col-md-7">
                                        <div className="listing-card-data">
                                             <h2>How does it work?</h2>
                                             <p>Listening to {bookDetail?.book_title} is as easy as 1-2-3! </p>
                                             <p>Step 1:</p>
                                             <ul>
                                                  <li>Click the link above “Listen Now for Free”</li>
                                             </ul>
                                             <p>Step 2:</p>
                                             <ul>
                                                  <li>Create your account</li>
                                             </ul>
                                             <p>Step 3:</p>
                                             <ul>
                                                  <li>Start listening to your audiobook</li>
                                             </ul>
                                        </div>
                                   </div>
                                   <div className="col-12 col-md-5">
                                        <div className="art-photo">
                                             <img src={ArtPhoto} alt="Art"/>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="container">
                              <div className="row">
                                   <div className="col-12">
                                        <div className="bottom-content">
                                             <p>Speechify is a powerful text to speech tool. It's ereader is used by people worldwide for a variety of reasons, whether in education or as a student, there are many benefits to using Speechify to study. Speechify's features empower you to take control of your learning no matter where you are. Create an ebook or audio book from literally any physical textbook or digital version.</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </main>
            </Layout>
        )
    }
}

export default CourseDetail
