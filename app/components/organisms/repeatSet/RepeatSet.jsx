// @flow
import React, { Component } from 'react';

import find from '@tinkoff/utils/array/find';
import path from '@tinkoff/utils/object/path';

import type { RefObject } from 'Types/common';
import type { PageSetProps, RepeatSetProps } from 'Containers/PageLearnRepeatSetsContainer.jsx';

import WordsDialogBlock from 'Components/molecules/wordsDialogBlock/WordsDialogBlock.jsx';
import WordsBlock from 'Components/molecules/repeatView/wordBlock/WordsBlock.jsx';
import CardBlock from 'Components/molecules/cardBlock/CardBlock.jsx';
import BottomBlock from 'Components/molecules/repeatView/bottomBlock/index.jsx';
import SimpleCard from 'Components/atoms/card/SimpleCard/SimpleCard.jsx';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import styles from './repeatSet.css';

type Props = PageSetProps & RepeatSetProps;

class RepeatSet extends Component<Props>
{
    wordsDialog: RefObject = React.createRef();

    initSetArrays = () =>
    {
        const { initRepeatSetArrays, routeMatch: { params: { id } } } = this.props;

        initRepeatSetArrays(id);
    };

    goToBeginning = () => this.props.goToWord(0);

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
            toggleLanguage,
            goNextWord,
            goPrevWord,
            rememberLater,
            loadRememberLater,
            revertToList,
            shuffle,
            goToWord,
            isMobile,
            routeMatch,
            routeMatch: { params: { id } },
        } = this.props;

        return <Layout
            title={find(item => item.id === id)(setsMeta).title}
            isRepeatMode
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
                    language={language}
                    toggleLanguage={toggleLanguage}
                    openWords={path(['current', 'openWords'], this.wordsDialog)}
                    openWordsRight={path(['current', 'openWordsRight'], this.wordsDialog)}
                    openWordsWrong={path(['current', 'openWordsWrong'], this.wordsDialog)}
                />
                <CardBlock
                    card={SimpleCard}
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
                    shuffle={shuffle}
                    goToBeginning={this.goToBeginning}
                    initSetArrays={this.initSetArrays}
                    repeatLaterList={currentSetWrong}
                    isMobile={isMobile}
                />
            </div>
        </Layout>;
    }
}

export default RepeatSet;
