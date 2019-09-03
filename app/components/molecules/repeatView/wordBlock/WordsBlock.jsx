// @flow
import React, { PureComponent } from 'react';

import noop from '@tinkoff/utils/function/noop';

import type { SetData, Language } from 'Stores/SetsStore.flow';
import type { Action } from 'Types/common';

import Chip from '@material-ui/core/Chip';
import LanguageSwitcher from 'Components/atoms/languageSwitcher/LanguageSwitcher.jsx';
import WordsListsBtns from 'Components/atoms/wordsListsBtns/WordsListsBtns.jsx';

import styles from './wordBlock.css';

type Props = {
    wordsRight: SetData[],
    wordsWrong: SetData[],
    language: Language,
    words: SetData[],
    wordIndex: number,
    openWords: Function,
    openWordsRight: Function,
    openWordsWrong: Function,
    toggleLanguage: Action,
};

class WordsBlock extends PureComponent<Props>
{
    static defaultProps = {
        wordsRight: [],
        wordsWrong: [],
        openWords: noop,
        openWordsRight: noop,
        openWordsWrong: noop,
    };

    render()
    {
        const {
            wordsRight,
            wordsWrong,
            language,
            words,
            wordIndex,
            openWords,
            openWordsRight,
            openWordsWrong,
            toggleLanguage,
        } = this.props;

        return <div className={styles.wrapper}>
            <div className={styles.col1}>
                <LanguageSwitcher
                    language={language}
                    onChange={toggleLanguage}
                />
            </div>
            <div className={styles.col2n3}>
                <div className={styles.col2_1}>
                    <WordsListsBtns
                        wordsRight={wordsRight.length}
                        wordsWrong={wordsWrong.length}
                        openWords={openWords}
                        openWordsRight={openWordsRight}
                        openWordsWrong={openWordsWrong}
                    />
                </div>
                <div className={styles.col2_2}>
                    <Chip
                        className={styles.counter}
                        label={`${wordIndex + 1} / ${words.length}`}
                    />
                </div>
            </div>
        </div>;
    }
}

export default WordsBlock;
