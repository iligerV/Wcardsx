// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import type { Action } from 'App/flowTypes/common';
import type { Language, SetData, SetMeta } from 'Stores/SetsStore.flow';
import type { Match } from 'Stores/ApplicationStore.flow';

import initLearnSetArraysAction from 'Actions/sets/initLearnSetArrays';
import initRepeatSetArraysAction from 'Actions/sets/initRepeatSetArrays';
import toggleLanguageAction from 'Actions/sets/toggleLanguage';
import goNextWordAction from 'Actions/sets/goNextWord';
import goPrevWordAction from 'Actions/sets/goPrevWord';
import rememberLaterAction from 'Actions/sets/rememberLater';
import loadRememberLaterAction from 'Actions/sets/loadRememberLater';
import revertToListAction from 'Actions/sets/revertToList';
import shuffleAction from 'Actions/sets/shuffle';
import goToWordAction from 'Actions/sets/goToWord';

import LearnSet from '../components/organisms/learnSet/LearnSet.jsx';
import RepeatSet from '../components/organisms/repeatSet/RepeatSet.jsx';

export const MODE_LEARN = 'learn';

export type RepeatSetProps = {
    toggleLanguage: Action,
    shuffle: Action,

}
export type PageSetProps = {
    language: Language,
    routeMatch: Match,
    currentSetData: SetData[],
    currentIterationSet: SetData[],
    currentIterationSetHash: string,
    currentIterationSetIndex: number,
    currentSetRight: SetData[],
    currentSetWrong: SetData[],
    setsMeta: SetMeta[],
    goNextWord: Action,
    goPrevWord: Action,
    rememberLater: Action,
    loadRememberLater: Action,
    revertToList: Action,
    goToWord: Action,
    initLearnSetArrays: Action,
    initRepeatSetArrays: Action,
};
type Props = {
    match: Object,
    routeProps: {
        mode: string
    }
} & PageSetProps

// eslint-disable-next-line react/require-optimization
class PageLearnRepeatSetsContainer extends Component<Props>
{
    constructor(props)
    {
        super(props);

        const { match: { params: { id } }, routeProps: { mode } = {}, initLearnSetArrays, initRepeatSetArrays } = props;

        mode === MODE_LEARN ? initLearnSetArrays(id) : initRepeatSetArrays(id);
    }

    render()
    {
        const { routeProps: { mode } = {} } = this.props;
        const ModeComponent = mode === MODE_LEARN ? LearnSet : RepeatSet;

        // $FlowFixMe
        return <ModeComponent {...this.props} />;
    }
}

function mapStateToProps({
    SetsStore: {
        language,
        currentSetData,
        currentIterationSet,
        currentIterationSetHash,
        currentIterationSetIndex,
        currentSetRight,
        currentSetWrong,
        setsMeta,
    },
    ApplicationStore: {
        routeMatch,
    },
    UserStore: {
        isMobile,
    },
})
{
    return {
        routeMatch,
        language,
        currentSetData,
        currentIterationSet,
        currentIterationSetHash,
        currentIterationSetIndex,
        currentSetRight,
        currentSetWrong,
        setsMeta,
        isMobile,
    };
}

function mapActionsToProps(dispatch)
{
    return bindActionCreators({
        initLearnSetArrays: initLearnSetArraysAction,
        initRepeatSetArrays: initRepeatSetArraysAction,
        toggleLanguage: toggleLanguageAction,
        goNextWord: goNextWordAction,
        goPrevWord: goPrevWordAction,
        rememberLater: rememberLaterAction,
        loadRememberLater: loadRememberLaterAction,
        revertToList: revertToListAction,
        shuffle: shuffleAction,
        goToWord: goToWordAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapActionsToProps)(PageLearnRepeatSetsContainer);
