import React from 'react'
import './index.css';

const Profile = () => {
    return (
        <div className='col-md-12 profile'>
            <div className='col-md-5'>
                <div >
                    <label>First Name</label>
                    <input class="form-control" type="text" value='First name' disabled></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input class="form-control" type="text" value='Last name' disabled></input>
                </div>
                <div>
                    <label>Address</label>
                    <input class="form-control" type="text" value='Address' disabled></input>
                </div>
            </div>
            <div className='col-md-5'>
                <div>
                    <label>Email</label>
                    <input class="form-control" type="text"  value='Email' disabled></input>
                </div>
                <div >
                    <label>Phone</label>
                    <input class="form-control" type="text" value='Phone' disabled></input>
                </div>
                <div>
                    <label>Date of birth</label>
                    <input class="form-control" value='05-02-1995' type="text" disabled></input>
                </div>
            </div>
        </div>
    )
}
export default Profile