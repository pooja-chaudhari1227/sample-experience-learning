import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import { spacing40 } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography } from '@ellucian/react-design-system/core';

const styles = () => ({
    page: {
        marginTop: 0,
        marginRight: spacing40,
        marginBottom: 0,
        marginLeft: spacing40
    }
});

const ViewDetails = (props) => {
    const { classes } = props;

    return (
        <div className={classes.page}>
            <Typography variant="h2" gutterBottom>
                Hello, this is View Details page
            </Typography>
        </div>
    );
};

ViewDetails.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewDetails);