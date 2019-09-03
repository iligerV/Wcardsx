// @flow
import React, { Component } from 'react';

import find from '@tinkoff/utils/array/find';
import path from '@tinkoff/utils/object/path';

import type { RefObject } from 'Types/common';
import type { PageSetProps } from 'Containers/PageLearnRepeatSetsContainer.jsx';

import { withStyles } from '@material-ui/core/styles';
import WordsDialogBlock from 'Components/molecules/wordsDialogBlock/WordsDialogBlock.jsx';
import WordsBlock from 'Components/molecules/learnView/wordBlock/WordsBlock.jsx';
import CardBlock from 'Components/molecules/cardBlock/CardBlock.jsx';
import BottomBlock from 'Components/molecules/learnView/bottomBlock';
import CardBothSides from 'Components/atoms/card/CardBothSides/CardBothSides.jsx';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import styles from './learnSet.css';

const stylesJS = {};

class LearnSet extends Component<PageSetProps>
{
    wordsDialog: RefObject = React.createRef();

    initSetArrays = () =>
    {
        const { initLearnSetArrays, routeMatch: { params: { id } } } = this.props;

        initLearnSetArrays(id);
    };

    render()
    {
        const {
            language,
            currentSetData,
            currentIterationSet,
            currentIterationSetHash,
            currentIterationSetIndex,
            currentSetRight,
            currentSetWrong,
            setsMeta,
            goNextWord,
            goPrevWord,
            rememberLater,
            loadRememberLater,
            goToWord,
            revertToList,
            isMobile,
            routeMatch,
            routeMatch: { params: { id } },
        } = this.props;

        return <Layout
            title={find(item => item.id === id)(setsMeta).title}
            isLearnMode
            routeMatch={routeMatch}
        >
            <div className={styles.wrapper}>
                <WordsDialogBlock
                    ref={this.wordsDialog}
                    index={currentIterationSetIndex}
                    words={currentSetData}
                    wordsIteration={currentIterationSet}
                    wordsRight={currentSetRight}
                    wordsWrong={currentSetWrong}
                    revertToList={revertToList}
                    goToWord={goToWord}
                />
                <WordsBlock
                    words={currentIterationSet}
                    wordIndex={currentIterationSetIndex}
                    wordsRight={currentSetRight}
                    wordsWrong={currentSetWrong}
                    openWords={path(['current', 'openWords'], this.wordsDialog)}
                    openWordsRight={path(['current', 'openWordsRight'], this.wordsDialog)}
                    openWordsWrong={path(['current', 'openWordsWrong'], this.wordsDialog)}
                />
                <CardBlock
                    card={CardBothSides}
                    wordsList={this.wordsDialog.current}
                    words={currentIterationSet}
                    currListHash={currentIterationSetHash}
                    index={currentIterationSetIndex}
                    language={language}
                    goNextWord={goNextWord}
                    goPrevWord={goPrevWord}
                    isLast={currentIterationSet.length - 1 === currentIterationSetIndex}
                    noRememberLater={currentIterationSet.length < 2}
                    onWordsListClick={path(['current', 'openWordsIteration'], this.wordsDialog)}
                    onRememberLaterClick={rememberLater}
                />
                <BottomBlock
                    isLast={currentIterationSet.length - 1 === currentIterationSetIndex}
                    loadRememberLater={loadRememberLater}
                    initSetArrays={this.initSetArrays}
                    repeatLaterList={currentSetWrong}
                    isMobile={isMobile}
                />
            </div>
        </Layout>;
    }
}

export default withStyles(stylesJS)(LearnSet);
