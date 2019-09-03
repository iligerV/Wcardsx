// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import setAutoShuffle from 'Actions/setAutoShuffle';

// Components
import BottomBlock from 'Components/molecules/repeatView/bottomBlock/BottomBlock.jsx';

import type { Action } from 'App/flowTypes/common';
import type { SetData } from 'Stores/SetsStore.flow';

export type ShuffleProps = {
    autoShuffle: boolean,
    setAutoShuffle: Action
};

export type BottomButtonProps = {
    currentWords: SetData[],
    currentWordIndex: number,
    isLast: boolean,
    loadRememberLater: Action,
    shuffle: Action,
    goToBeginning: Action,
    initSetArrays: Action,
} & ShuffleProps

class BottomButtonContainer extends Component<BottomButtonProps>
{
    setAutoShuffle = (event: SyntheticInputEvent<HTMLInputElement>, flag: boolean) =>
    {
        event.isPropagationStopped();

        return this.props.setAutoShuffle(flag);
    };

    render()
    {
        return (
            <BottomBlock
                {...this.props}
                autoShuffle={this.props.autoShuffle}
                setAutoShuffle={this.setAutoShuffle}
            />
        );
    }
}

BottomButtonContainer.propTypes = {
    isLast: PropTypes.bool.isRequired,
    loadRememberLater: PropTypes.func.isRequired,
    shuffle: PropTypes.func.isRequired,
    goToBeginning: PropTypes.func.isRequired,
    initSetArrays: PropTypes.func.isRequired,
    autoShuffle: PropTypes.bool.isRequired,
    setAutoShuffle: PropTypes.func.isRequired,
};

export default connect(
    ({ SetsStore }) => ({
        autoShuffle: SetsStore.autoShuffle,
        currentWords: SetsStore.currentIterationSet,
        currentWordIndex: SetsStore.currentIterationSetIndex,
    }),
    dispatch => ({
        ...bindActionCreators({
            setAutoShuffle,
        }, dispatch),
    })
)(BottomButtonContainer);
