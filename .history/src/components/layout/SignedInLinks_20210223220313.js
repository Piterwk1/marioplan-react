import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const SignedInLinks = (props) => (
  <ul className="right">
    <li>
      <NavLink to="/create">New Project</NavLink>
    </li>
    <li>
      <a onClick={props.signOut} to="/create">
        New Project
      </a>
    </li>
    <li>
      <NavLink to="/" className="btn btn-floating pink lighten-1">
        PK
      </NavLink>
    </li>
  </ul>
);

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut()),
});

export default connect(mapDispatchToProps)(SignedInLinks);

// export default SignedInLinks;
