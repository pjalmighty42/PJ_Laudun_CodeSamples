import React, {useEffect, Fragment} from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../redux';

import '../styles/table.css';

const mapStateToProps = (state) => {
    return{
        userData: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => dispatch(fetchUsers())
    };
};

const UserContainer = ({userData, fetchUsers}) =>{
    useEffect(()=> {
        fetchUsers()
    }, []);

    const UserTableData = () => {
        return userData.loading ? (
            <h3>Loading...</h3>
        ) : userData.error ? (
            <h3>{userData.error}</h3>
        ) : (
            <Fragment>
                { 
                    userData.users.map((user, idx) => {
                        return (
                            <Fragment key={user.id}>
                                <tr>
                                    <td>
                                        {idx}
                                    </td>
                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                </tr>
                            </Fragment>
                        )
                    }) 
                }
            </Fragment>
        )
    }
    
    return(
        <div className="user-table-cont">
            <h2>Total List of Users: {userData.users.length}</h2>
            <div className="table-cont-main">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserTableData />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserContainer);