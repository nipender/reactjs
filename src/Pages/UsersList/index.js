import React, { useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import Layout from '../../Component/Layout';
import { Link , useHistory  } from 'react-router-dom';
import axiosInstance from '../../instance/axiosInstance';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Moment from 'moment';

const UsersList = () => {

    let history = useHistory();
    let token = localStorage.getItem('token');

    if(token === null){
        history.push({
            pathname: '/admin/login'
        });
    }

    const [users, setUsers ] = useState([]);

    useEffect(() => {
        const runAsync = async () => {
            const response = await axiosInstance.get('user/list',{
                headers: {
                    'Authorization': 'Bearer '+token,
                }
            });
            const {users , status} = response.data;
           
            if (status === 1) {
                setUsers(users);
            }        

        }
        runAsync();
    }, [token]);
        
    
    const columns = [
        {
            name: 'First Name',
            selector: 'firstName',
            sortable: true,
        },
        {
            name: 'Last Name',
            selector: 'lastName',
            sortable: true,
        },
        {
            width:'200px',
            name: 'Email',
            selector: 'email',
            sortable: true,
        },
        {
            name: 'Contact Number',
            selector: 'mobile_number',
            sortable: true,
        },
        {
            name: 'Status',
            cell: (row) => (
                <>
                    {row.status == 1 ? "Active" : "Inactive"}
                </>
            )
        },
        {
            name: 'Date',
            cell: (row) => {
                const today = Date.now(row.created_at);
                console.log('today',today);
                console.log('aaaaaaaaaa',Moment(today).format('DD MMM YYYY'));
                <button>
                    sadasdsd
                </button>
            }
        },
        {
            width:'200px',
          cell: (row) => (
            <>
            <Link size='sm' to={'/admin/user/edit/' + row._id } className="btn btn-info right-margin" >
                <i class="fa fa-edit"></i>
            </Link>
            <button size='sm' onClick={() => handleDelete(row._id)} className="btn btn-danger" >
                <i class="fa fa-trash"></i>
            </button>
            </> 
          ),
        }
    ];

    const deleteCheck = async (user_id) => {

        const response = await axiosInstance.post('user/delete',{user_id});
        const {users , status} = response.data;
        if (status === 1) {
            setUsers(users);
        }
    }

    const handleDelete =  (user_id) => {

        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteCheck(user_id)
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
                        title="User List"
                        columns={columns}
                        data={users}
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

export default UsersList;
