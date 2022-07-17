import React from 'react';

const UsersList = ({ users, deleteUser, selectUser }) => {
    return (
        <div className='users-container'>
            <div className='users-child'>
                {users?.map(user => (
                    <div key={user.id} className="user-card" >
                        <div>
                            <h3 className='marginless'>{user.first_name} {user.last_name}</h3>
                            <p className='margin-y-1'><b>Email: </b>{user.email}</p>
                            <p className='marginless'><b>Birthday: </b>{user.birthday}</p>
                        </div>

                        <div>
                            <button
                                onClick={() => deleteUser(user.id)}
                                className='delete-btn'
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                            <button
                                onClick={() => selectUser(user)}
                                className='edit-btn'
                            >
                                <i className="fa-solid fa-pen"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UsersList;