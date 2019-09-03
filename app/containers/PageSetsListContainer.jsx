// @flow
import React from 'react';
import { connect } from 'react-redux';

import SetsList from 'Components/organisms/setsList/SetsList.jsx';

const PageSetsListContainer = props => (
    <SetsList {...props} />
);

function mapStateToProps({ SetsStore: { setsMeta } })
{
    return {
        setsMeta,
    };
}

export default connect(mapStateToProps)(PageSetsListContainer);
