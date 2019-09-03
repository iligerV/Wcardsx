// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import type { Action } from 'App/flowTypes/common';

import BottomBlock from './BottomBlock.jsx';

export type ShuffleProps = {
    // setAutoShuffle: Action
};

export type BottomButtonProps = {
    isLast: boolean,
    loadRememberLater: Action,
    initSetArrays: Action,
} & ShuffleProps;

class BottomButtonContainer extends Component<BottomButtonProps> {
    render() {
        return (
            <BottomBlock
                {...this.props}
            />
        );
    }
}

BottomButtonContainer.propTypes = {
    isLast: PropTypes.bool,
    loadRememberLater: PropTypes.func,
    initSetArrays: PropTypes.func,
};

export default connect(
    ({ SetsStore }) => ({
        currentWords: SetsStore.currentIterationSet,
        currentWordIndex: SetsStore.currentIterationSetIndex,
    }),
    dispatch => ({
        ...bindActionCreators(
            {
                // setAutoShuffle,
            },
            dispatch
        ),
    })
)(BottomButtonContainer);
