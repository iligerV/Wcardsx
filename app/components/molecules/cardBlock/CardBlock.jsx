// @flow
import React, { Component } from 'react';
import Swipe from 'react-swipe-component';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, bindKeyboard } from 'react-swipeable-views-utils/lib';
import classnames from 'classnames';
import isEqual from '@tinkoff/utils/is/equal';

import type { ComponentType } from 'react';

import type { SetData, Language } from 'Stores/SetsStore.flow';
import type { Action } from 'Types/common';
import type { CardProps } from 'Components/atoms/card/card.flow';

import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import styles from './cardBlock.css';

const VirtualizedSwipeableViews = bindKeyboard(virtualize(SwipeableViews));

type CardPropsFull = CardProps & {
    language: Language,
};

type Props = {
    words: SetData[],
    card: ComponentType<CardPropsFull>,
    index: number,
    language: Language,
    currListHash: string,
    noRememberLater: boolean,
    onWordsListClick: Function,
    goNextWord: Action,
    goPrevWord: Action,
    onRememberLaterClick: Action,
};

type State = {
    isSwipedUp: boolean,
}

class CardBlock extends Component<Props, State>
{
    state = {
        isSwipedUp: false,
    };

    _isTransitionStarted: boolean = false;

    shouldComponentUpdate(nextProps: Props, nextState: State)
    {
        const {
            words,
            index,
            language,
        } = this.props;

        // TODO: разобратся почему после монтирования и первого обновления, когда мы полчаем необходимый массив, при обновлении ссылка на массив меняется
        return !isEqual(words, nextProps.words)
            || index !== nextProps.index
            || language !== nextProps.language
            || this.state.isSwipedUp !== nextState.isSwipedUp;
    }

    // need to fix first and last elements swipe bug [task #31]
    getNumOfSlides = (beforeOrAfter: string) => {
        const { words, index } = this.props;

        switch (beforeOrAfter) {
            case 'before':
                return index < 3 ? index : 3;
            case 'after' :
                return index > words.length - 1 ? 0 : 2;
        }
    };

    handleChangeIndex = (nextIndex: number) =>
    {
        const { index, goNextWord, goPrevWord } = this.props;

        if (nextIndex > index)
        {
            goNextWord();
        }
        else
        {
            goPrevWord();
        }
    };

    handleSwipeUp = () =>
    {
        if (this.props.noRememberLater)
        {
            return;
        }

        this.setState({ isSwipedUp: true });
        this._isTransitionStarted = true;
    };

    handleTransitionEnd = () =>
    {
        if (this._isTransitionStarted)
        {
            this.props.onRememberLaterClick();
            this.setState({ isSwipedUp: false });
            this._isTransitionStarted = false;
        }
    };

    slideRenderer = ({ index, key }: { index: number, key: number }) =>
    {
        const {
            card: Card,
            words,
            language,
            noRememberLater,
            onWordsListClick,
            onRememberLaterClick,
        } = this.props;
        const idx = this.props.index;
        const word: SetData = words[index];

        return (
            <Card
                key={key}
                index={idx}
                word={word}
                language={language}
                openCurrentIterationSet={onWordsListClick}
                rememberLater={onRememberLaterClick}
                noRememberLater={noRememberLater}
            />
        );
    };

    render()
    {
        const {
            index,
            goNextWord,
            goPrevWord,
            currListHash,
            words,
        } = this.props;
        const { isSwipedUp } = this.state;

        return <div className={styles.wrapper}>
            <div className={styles.row}>
                <div className={classnames(styles.nextPrevWrapper, styles.prevWrapper)}>
                    <IconButton
                        className={classnames(styles.nextPrevBtn, styles.prevBtn)}
                        onClick={goPrevWord}
                        disabled={index === 0}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <div
                    className={classnames(styles.card, { [styles.activeCard]: isSwipedUp })}
                    onTransitionEnd={this.handleTransitionEnd}
                >
                    <Swipe
                        nodeName='div'
                        mouseSwipe
                        onSwipedUp={this.handleSwipeUp}
                    >
                        <VirtualizedSwipeableViews
                            index={index}
                            overscanSlideBefore={this.getNumOfSlides('before')}
                            overscanSlideAfter={this.getNumOfSlides('after')}
                            axis='x'
                            onChangeIndex={this.handleChangeIndex}
                            slideRenderer={this.slideRenderer}
                            slideClassName={currListHash} // necessary for rerender, after changing randomization
                        />
                    </Swipe>
                </div>
                <div className={classnames(styles.nextPrevWrapper, styles.nextWrapper)}>
                    <IconButton
                        className={classnames(styles.nextPrevBtn, styles.nextBtn)}
                        onClick={goNextWord}
                        disabled={index === words.length - 1}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </div>
            </div>
        </div>;
    }
}

export default CardBlock;
