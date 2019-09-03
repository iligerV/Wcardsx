// @flow
import * as React from 'react';

import noop from '@tinkoff/utils/function/noop';


import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import IconDone from '@material-ui/icons/Done';
import IconList from '@material-ui/icons/List';
import IconHistory from '@material-ui/icons/History';

import styles from './wordsListsBtns.css';
const WORDS_WRONG = 'wordsWrong';
const WORDS_RIGHT = 'wordsRight';

const withBadge = (children: React.Node) => (num: number, color) => num ?
    <Badge className={styles[color]} badgeContent={num}>
        {children}
    </Badge> : children;

type Props = {
    wordsRight: number,
    wordsWrong: number,
    openWords: Function,
    openWordsRight: Function,
    openWordsWrong: Function,
};

class WordsListsBtns extends React.PureComponent<Props>
{
    static defaultProps = {
        wordsRight: 0,
        wordsWrong: 0,
        openWords: noop,
        openWordsRight: noop,
        openWordsWrong: noop,
    };


    render()
    {
        const {
            wordsRight,
            wordsWrong,
            openWords,
            openWordsRight,
            openWordsWrong,
        } = this.props;

        return <div className={styles.wrapper}>
            <div className={styles.btn}>
                <Tooltip title='All words'>
                    <Button
                        variant='contained'
                        onClick={openWords}
                    >
                        <IconList>words</IconList>
                    </Button>
                </Tooltip>
            </div>
            <div className={styles.btn}>
                {withBadge(<Tooltip title='Remembered words'>
                    <Button
                        variant='contained'
                        onClick={openWordsRight}
                    >
                        <IconDone>remembered</IconDone>
                    </Button>
                </Tooltip>)(wordsRight, WORDS_RIGHT)}
            </div>
            <div className={styles.btn}>
                {withBadge(<Tooltip title='Learn later'>
                    <Button
                        variant='contained'
                        onClick={openWordsWrong}
                    >
                        <IconHistory>later</IconHistory>
                    </Button>
                </Tooltip>)(wordsWrong, WORDS_WRONG)}
            </div>
        </div>;
    }
}

export default WordsListsBtns;
