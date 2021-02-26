/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';
import ProjectList from '../projects/ProjectList';
import Notifications from './Notifications';

class Dashboard extends Component {
  render() {
    // console.log(this.props);
    const { projects, auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  projects: PropTypes.array,
};

const mapStateToProps = (state) =>
  // console.log(state);
  ({
    projects: state.firestore.ordered.projects,
    // projects: state.project.projects, connection to dummy data
    auth: state.firebase.auth,
  });
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: 'projects', orderBy: ['createdAt', 'desc'] }])
)(Dashboard);
