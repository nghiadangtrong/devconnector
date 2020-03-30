import React from 'react';
import {Link} from 'react-router-dom';

const ProfileActions = () => {

  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fa fa-user-circle text-info mr-1" /> 
        Edit profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fa fa-back-tie text-info mr-1" />
        Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fa fa-graduation-cap text-info" />
        Add Education
      </Link>
    </div>
  )
}


export default ProfileActions;