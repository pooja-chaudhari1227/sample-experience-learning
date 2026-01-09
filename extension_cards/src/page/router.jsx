import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import ViewDetails from './ViewDetails';

const RouterPage = (props) => {
    return (
        <Router basename={props.pageInfo.basePath}>
            <Switch>
                <Route path='/ViewDetails'>
                    <ViewDetails {...props} />
                </Route>
            </Switch>
        </Router>
    );
};

RouterPage.propTypes = {
    pageInfo: PropTypes.object
};

export default RouterPage;