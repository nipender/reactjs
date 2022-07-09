import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import Layout from '../../Component/Layout';
import { Link , useHistory  } from 'react-router-dom';
import axiosInstance from '../../instance/axiosInstance';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Courses = () => {
    let history = useHistory();
    let token = localStorage.getItem('token');

    if(token === null){
        history.push({
            pathname: '/login'
        });
    }

    const [books, setBooks ] = useState([]);

    useEffect(() => {
        const runAsync = async () => {
            const response = await axiosInstance.get('book/list',{
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            });
            const {books , status} = response.data;
           
            if (status === 1) {
                setBooks(books);
            }        

        }
        runAsync();
    }, [token]);
        
    
    const columns = [
        {
            width:'100px',
            name: 'Book No.',
            selector: 'book_number',
            sortable: true,
        },
        {
            name: 'Book Title',
            selector: 'book_title',
            sortable: true,
        },
        {
            width:'150px',
            name: 'Book Language',
            selector: 'book_language',
            sortable: true,
        },
        {
            width:'200px',
            name: 'Book Author',
            selector: 'book_authors',
            sortable: true,
        },
        {
            width:'200px',
          cell: (row) => (
            <>
            <Link size='sm' to={'/books/' + row.book_slug } className="btn btn-primary right-margin" >
                <i class="fa fa-eye"></i>
            </Link>
            <Link size='sm' to={'/edit/' + row.book_slug } className="btn btn-info right-margin" >
                <i class="fa fa-edit"></i>
            </Link>
            <button size='sm' onClick={() => handleDelete(row.book_slug)} className="btn btn-danger" >
                <i class="fa fa-trash"></i>
            </button>
            </> 
          ),
        }
    ];

    const deleteCheck = async (book_slug) => {

        const response = await axiosInstance.post('book/deleteBookBySlug',{book_slug});
        const {books , status} = response.data;
        if (status === 1) {
            setBooks(books);
        }

    }

    const handleDelete =  (book_slug) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteCheck(book_slug)
              },
              {
                label: 'No',
                onClick: () => true
              }
            ]
        });
        
    };
    
    return (
        <Layout>
        <main className="main-content">
            <div className="section-padding">
                <div className="container">
                    
                    <DataTable
                        title="Book List"
                        columns={columns}
                        data={books}
                        defaultSortAsc={false}
                        selectableRows={false}
                        defaultSortField="_id"
                        highlightOnHover
                        selectableRowsComponentProps={{ inkDisabled: true }}                    
                        pagination
                    /> 
                    
                </div>
            </div>                    
        </main>
        </Layout>
    )
    
}

export default Courses;
