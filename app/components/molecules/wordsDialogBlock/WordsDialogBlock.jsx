// @flow
import React, { PureComponent } from 'react';

import type { SetData } from 'Stores/SetsStore.flow';
import type { RefObject, Action } from 'Types/common';

import WordsDialog from 'Components/atoms/wordsDialog/WordsDialog.jsx';

import type { Set, DialogsConfigs } from 'Components/atoms/wordsDialog/wordsDialog.flow';

const CURRENT_SET_DATA: Set = 'currentSetData';
const CURRENT_SET_ITERATION_SET: Set = 'currentIterationSet';
const CURRENT_SET_RIGHT: Set = 'currentSetRight';
const CURRENT_SET_WRONG: Set = 'currentSetWrong';
const DIALOGS_CONFIG: DialogsConfigs = {
    [CURRENT_SET_DATA]: {
        listName: CURRENT_SET_DATA,
        dialogHeader: 'Set list',
        canRevert: false,
    },
    [CURRENT_SET_ITERATION_SET]: {
        listName: CURRENT_SET_ITERATION_SET,
        dialogHeader: 'Current list',
        canRevert: false,
        clickable: true,
    },
    [CURRENT_SET_RIGHT]: {
        listName: CURRENT_SET_RIGHT,
        dialogHeader: 'Remembered list',
        canRevert: true,
    },
    [CURRENT_SET_WRONG]: {
        listName: CURRENT_SET_WRONG,
        dialogHeader: 'Remember later list',
        canRevert: true,
    },
};


const getSetsFromProps = ({ words, wordsIteration, wordsRight, wordsWrong }) => ({
    currentSetData: words,
    currentIterationSet: wordsIteration,
    currentSetRight: wordsRight,
    currentSetWrong: wordsWrong,
});


type Props = {
    index: number,
    words: SetData[],
    wordsIteration: SetData[],
    wordsRight: SetData[],
    wordsWrong: SetData[],
    revertToList: Action,
    goToWord: Action,
};

type State = {
    currentSet: Set,
};

class WordsDialogBlock extends PureComponent<Props, State>
{
    state = {
        currentSet: CURRENT_SET_DATA,
    };

    /**
     * @public
     */
    openWords = () =>
    {
        this.openListPopup(CURRENT_SET_DATA);
    };

    /**
     * @public
     */
    openWordsIteration = () =>
    {
        this.openListPopup(CURRENT_SET_ITERATION_SET);
    };

    /**
     * @public
     */
    openWordsRight = () =>
    {
        this.openListPopup(CURRENT_SET_RIGHT);
    };

    /**
     * @public
     */
    openWordsWrong = () =>
    {
        this.openListPopup(CURRENT_SET_WRONG);
    };

    openListPopup = (listKey: Set) =>
    {
        const {
            listName,
            dialogHeader: header,
            canRevert,
            clickable,
        } = DIALOGS_CONFIG[listKey];
        const sets = getSetsFromProps(this.props);

        this.setState({ currentSet: listName });
        this.wordsDialog.current && this.wordsDialog.current.open({
            wordsList: sets[listName],
            header,
            canRevert,
            revertAction: this.revertAction(listName),
            onClick: clickable ? this.props.goToWord : null,
        });
    };

    revertAction = (wordsList: string) => (index: number) =>
    {
        this.props.revertToList(wordsList, index);
    };

    wordsDialog: RefObject = React.createRef();

    render()
    {
        const sets = getSetsFromProps(this.props);

        return <WordsDialog
            ref={this.wordsDialog}
            wordsList={sets[this.state.currentSet]}
            index={this.props.index}
        />;
    }
}

export default WordsDialogBlock;
