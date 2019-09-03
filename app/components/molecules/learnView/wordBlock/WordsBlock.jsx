// @flow
import React, { PureComponent } from 'react';

import noop from '@tinkoff/utils/function/noop';

import type { SetData } from 'Stores/SetsStore.flow';

import Chip from '@material-ui/core/Chip';
import WordsListsBtns from 'Components/atoms/wordsListsBtns/WordsListsBtns.jsx';

import styles from './wordBlock.css';

type Props = {
    wordsRight: SetData[],
    wordsWrong: SetData[],
    words: SetData[],
    wordIndex: number,
    openWords: Function,
    openWordsRight: Function,
    openWordsWrong: Function,
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
            words,
            wordIndex,
            wordsRight,
            wordsWrong,
            openWords,
            openWordsRight,
            openWordsWrong,
        } = this.props;

        return (
            <React.Fragment>
                <div className={styles.wrapper}>
                    <WordsListsBtns
                        wordsRight={wordsRight.length}
                        wordsWrong={wordsWrong.length}
                        openWords={openWords}
                        openWordsRight={openWordsRight}
                        openWordsWrong={openWordsWrong}
                    />
                </div>
                <div>
                    <Chip
                        className={styles.counter}
                        label={`${wordIndex + 1} / ${words.length}`}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default WordsBlock;
