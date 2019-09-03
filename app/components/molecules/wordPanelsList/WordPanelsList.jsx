// @flow
import React, { Component } from 'react';

import md5 from 'js-md5';

import Typography from '@material-ui/core/Typography';

import getPaginationListParams from 'Components/atoms/pagination/getPaginationListParams';

import type { SetData } from 'Stores/SetsStore.flow';

import TranslateExternal from 'Components/molecules/translateExternal/TranslateExternal.jsx';
import Pagination from 'Components/atoms/pagination/Pagination.jsx';
import WordPanel from './wordWithExpansionPanel/WordWithExpansionPanel.jsx';

import styles from './wordPanelsList.css';

const WORDS_PER_PAGE = 50;

type Props = {
    words: SetData[],
};

type State = {
    expanded: boolean | string,
    definePage: {
        startList: number,
        endList: number,
        selected: number,
    },
}

const wordsFilter = (() => {
    const cache = {};

    return (words, startList, endList) => {
        const cacheItem = md5(JSON.stringify({
            words,
            startList,
            endList,
        }));

        if (cache[cacheItem]) { return cache[cacheItem]; }

        const result = words.filter((item, idx) => (idx >= startList && idx < endList));

        cache[cacheItem] = result;

        return result;
    };
})();

class WordPanelsList extends Component<Props, State>
{
    state = {
        expanded: false,
        currentPageState: {
            startList: 0,
            endList: WORDS_PER_PAGE,
            selected: 0,
        },
    };

    refTranslateBlock = React.createRef();

    handleOpenTranslate = (word: string) => event => {
        event.preventDefault();
        this.refTranslateBlock.current.open({ word });
    };

    handlePanelStateChange = panel => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    handlePageClick = data => {
        const currentPageState = getPaginationListParams(data, WORDS_PER_PAGE);

        this.setState({ currentPageState });
    };

    renderPagination = () => {
        const { words } = this.props;
        const { selected } = this.state.currentPageState;
        const isPaginationNeeded = words.length >= 50;

        if (isPaginationNeeded) {
            return (
                <Pagination
                    wordsLength={words.length}
                    wordsPerPage={50}
                    activePage={selected}
                    onHandlePageClick={this.handlePageClick}
                />
            );
        }

        return null;
    };

    render()
    {
        const { words } = this.props;
        const { expanded } = this.state;
        const { startList, endList } = this.state.currentPageState;
        const pageWords = wordsFilter(words, startList, endList);

        return (
            <div className={styles.pageContent}>
                {this.renderPagination()}
                <Typography component='div'>
                    {pageWords.map((item, idx) =>
                        <WordPanel
                            key={item.id}
                            index={idx + startList}
                            word={item}
                            expanded={expanded}
                            onHandleChange={this.handlePanelStateChange}
                            onHandleOpenTranslate={this.handleOpenTranslate}
                        />
                    )}
                    <TranslateExternal ref={this.refTranslateBlock} />
                </Typography>
                {this.renderPagination()}
            </div>
        );
    }
}

export default React.forwardRef((props, ref) => <WordPanelsList {...props} forwardedRef={ref} />);

