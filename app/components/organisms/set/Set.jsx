// @flow
import React, { Component } from 'react';

import find from 'Utils/array/find';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconVerifiedUser from '@material-ui/icons/VerifiedUser';
import IconErrorOutline from '@material-ui/icons/ErrorOutline';
import IconCrop from '@material-ui/icons/Crop169';
import IconList from '@material-ui/icons/List';
import IconLoop from '@material-ui/icons/Loop';

import { ATTRIBUTE_PROVED, ATTRIBUTE_RECHECK, WITHOUT_ATTRIBUTES } from 'Constants/attributesConstants';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';
import WordPanelsList from 'Components/molecules/wordPanelsList/WordPanelsList.jsx';

import type { SetData, SetMeta } from 'Stores/SetsStore.flow';
import type { Match } from 'Stores/ApplicationStore.flow';
import type { Action } from 'Stores/store.flow';

import styles from './set.css';

const EMPTY_META: SetMeta = {
    title: '',
    comment: '',
    id: '',
};
const MIN_LOADER_THRESHOLD = 40;

const getSetTitle = (setsMeta: SetMeta[], inId: string): SetMeta =>
    find(({ id }) => id === inId)(setsMeta) || EMPTY_META;

type Props = {
    currentSetData: SetData[],
    match: Match,
    setsMeta: SetMeta[],
    pickedCardsId: string,
    downloadListCards: Action,
    loadingCards: {
        [string]: boolean
    },
};

type State = {
    value: number,
    id: string,
    setsMeta: SetMeta[],
    setMeta: {
        title: string,
        comment: string,
    },
        loading: boolean,
        start: boolean,
}

class Set extends Component<Props, State>
{
    state = {
        value: 0,
        id: '',
        setsMeta: [],
        setMeta: EMPTY_META,
        loading: true,
        start: true,
    };

    static getDerivedStateFromProps({ setsMeta }, { setsMeta: prevSetsMeta, id })
    {
        if (setsMeta !== prevSetsMeta)
        {
            return {
                setsMeta,
                setMeta: getSetTitle(setsMeta, id),
            };
        }

        return null;
    }

    constructor(props: Props)
    {
        super(props);

        const { setsMeta, match: { params: { id } }, currentSetData } = this.props;

        this.state = {
            ...this.state,
            id,
            setsMeta,
            setMeta: getSetTitle(setsMeta, id),
        };

        if (currentSetData.length < MIN_LOADER_THRESHOLD) {
            this.state = {
                ...this.state,
                loading: false,
            };
        }
    }

    componentDidMount() {
        // start loading large content
        setTimeout(() => this.setState({ start: false }));
    }

    componentDidUpdate() {
        const { start, loading } = this.state;

        // remove loader for large content
        !start && loading && setTimeout(() => this.setState({ loading: false }));
    }

    handleChange = (event: SyntheticInputEvent<HTMLInputElement>, value: number) =>
    {
        this.setState({ value });
    };

    downloadCards = () =>
    {
        const { match: { params: { id } }, pickedCardsId, downloadListCards } = this.props;

        downloadListCards(pickedCardsId, id);
    };

    attrCounter = (attr: string) => {
        const { currentSetData } = this.props;
        let counter = 0;

        if (!attr)
        {
            currentSetData.forEach(item => {
                if (item.attrs && !item.attrs.p && !item.attrs.r && !item.attrs.e)
                {
                    counter += 1;
                }
            });

            return counter;
        }

        currentSetData.forEach(item => {
            if (item.attrs && item.attrs[attr])
            {
                counter += 1;
            }
        });

        return counter;
    };

    render()
    {
        const { currentSetData, loadingCards, pickedCardsId } = this.props;
        const { setMeta: { title, comment } = {}, loading, start } = this.state;

        return (
            <Layout
                title={title}
                subtitle={comment}
            >
                <div className={styles.pageSet}>
                    <div className={styles.upperRow}>
                        <div className={styles.btnLoadWrapper}>
                            <Tooltip
                                disableFocusListener title='reload words from Trello'
                                className={styles.btnLoadWrapper}
                            >
                                <Button
                                    className={styles.btnLoad}
                                    variant='contained'
                                    onClick={this.downloadCards}
                                >
                                    <IconLoop />
                                </Button>
                            </Tooltip>
                            {loadingCards[pickedCardsId] && <CircularProgress size={36} className={styles.loader} />}
                        </div>
                        <div className={styles.countersWrapper}>
                            <Tooltip disableTouchListener title='Words without attrs'>
                                <Chip
                                    className={styles.counter}
                                    label={this.attrCounter(WITHOUT_ATTRIBUTES)}
                                    icon={<IconCrop />}
                                />
                            </Tooltip>
                            <Tooltip disableTouchListener title='Words amount with attribute "confirmed translate"'>
                                <Chip
                                    className={styles.counter}
                                    label={this.attrCounter(ATTRIBUTE_PROVED)}
                                    icon={<IconVerifiedUser />}
                                />
                            </Tooltip>
                            <Tooltip disableTouchListener title='Words amount with attribute "need to recheck"'>
                                <Chip
                                    className={styles.counter}
                                    label={this.attrCounter(ATTRIBUTE_RECHECK)}
                                    icon={<IconErrorOutline />}
                                />
                            </Tooltip>
                            <Tooltip disableTouchListener title='Total words amount'>
                                <Chip
                                    className={styles.counter}
                                    label={currentSetData.length}
                                    icon={<IconList />}
                                />
                            </Tooltip>
                        </div>
                    </div>
                    {loading && <CircularProgress
                        className={styles.listLoader} disableShrink
                        size={36}
                    />}
                    {!start && <div className={styles.content}>
                        <WordPanelsList
                            words={currentSetData}
                        />
                    </div>}

                </div>
            </Layout>
        );
    }
}

export default Set;
