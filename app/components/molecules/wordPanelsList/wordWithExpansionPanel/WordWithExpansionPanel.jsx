// @flow
import React, { Component } from 'react';
import cn from 'classnames';

import path from '@tinkoff/utils/object/path';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconVerifiedUser from '@material-ui/icons/VerifiedUser';
import IconErrorOutline from '@material-ui/icons/ErrorOutline';
import IconLibraryBooksOutlined from '@material-ui/icons/LibraryBooksOutlined';
import IconBrightnessAutoOutlined from '@material-ui/icons/BrightnessAutoOutlined';
import IconTranslate from '@material-ui/icons/Translate';

import { ATTRIBUTE_PROVED, ATTRIBUTE_RECHECK, ATTRIBUTE_EXAMPLE } from 'Constants/attributesConstants';

import type { SetData } from 'Stores/SetsStore.flow';

import styles from './wordWithExpansionPanel.css';

type Props = {
    word: SetData,
    index: number,
    onHandleChange: Function,
    onHandleOpenTranslate: Function,
    expanded: boolean | string,
}

type State = {
    isExampleOpen: boolean,
}

class WordWithExpansionPanel extends Component<Props, State>
{
    state = {
        isExampleOpen: false,
    };

    static getDerivedStateFromProps(props: Props) {
        if (props.expanded !== `panel${props.index}`)
        {
            return {
                isExampleOpen: false,
            };
        }

        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { word, index, expanded } = this.props;
        const isPanelOpen = expanded === `panel${index}`;
        const isPanelOpenNext = nextProps.expanded === `panel${nextProps.index}`;

        if (word !== nextProps.word
        || index !== nextProps.index
        || isPanelOpen !== isPanelOpenNext
        || nextState.isExampleOpen !== this.state.isExampleOpen) {
            return true;
        }

        return false;
    }

    handleOpenExample = event => {
        event.preventDefault();
        const { isExampleOpen } = this.state;

        this.setState({ isExampleOpen: !isExampleOpen });
    };

    // eslint-disable-next-line complexity
    renderExistWord = () => {
        const { isExampleOpen } = this.state;
        const { word, index, onHandleChange, onHandleOpenTranslate, expanded } = this.props;
        const attrProved = path(['attrs', ATTRIBUTE_PROVED], word);
        const attrRecheck = path(['attrs', ATTRIBUTE_RECHECK], word);
        const attrExample = path(['attrs', ATTRIBUTE_EXAMPLE], word);
        const isThereAttr = attrProved || attrRecheck || attrExample;
        const isEmpty = !attrProved && !attrRecheck && !attrExample;
        const isPanelOpen = expanded === `panel${index}`;

        return (
            <ExpansionPanel
                className={styles.panel}
                expanded={expanded === `panel${index}`}
                onChange={onHandleChange(`panel${index}`)}
            >
                <ExpansionPanelSummary
                    className={styles.panelSummary}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}bh-content`}
                >
                    <Typography className={styles.wordsNums}>{index + 1}</Typography>
                    <div className={styles.words}>
                        <div className={styles.word}>
                            <span className={styles.bold}>{word.foreign}</span>
                        </div>
                        {word.transcription
                        && <div className={styles.word}>
                            {word.transcription}
                        </div>
                        }
                        <div className={styles.word}>
                            {word.ru}
                        </div>
                    </div>
                    {isThereAttr
                    && <Tooltip disableFocusListener title='This word has attributes'>
                        <IconBrightnessAutoOutlined
                            className={cn({
                                [styles.iconAttrsExist]: true,
                                [styles.iconAttrsExistHide]: isPanelOpen,
                            })}
                        />
                    </Tooltip>
                    }
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={styles.panelDetails}>
                    {isPanelOpen && <div className={styles.icons}>
                        <div className={styles.attributes}>
                            {isEmpty && <Typography component='span' className={styles.noAttributes}>no attributes</Typography>}
                            {attrProved
                            && <Tooltip disableTouchListener title='confirmed translate'>
                                <IconVerifiedUser className={styles.attrIcon} />
                            </Tooltip>
                            }
                            {attrRecheck
                            && <Tooltip disableTouchListener title='need to recheck'>
                                <IconErrorOutline className={styles.attrIcon} />
                            </Tooltip>
                            }
                            {attrExample
                            && <a
                                href=''
                                onClick={this.handleOpenExample}
                            >
                                <IconLibraryBooksOutlined
                                    className={
                                        isExampleOpen ?
                                            styles.exampleOpen :
                                            styles.exampleClose
                                    }
                                />
                            </a>
                            }
                            {<Typography className={cn({
                                [styles.example]: true,
                                [styles.exampleShow]: isExampleOpen,
                                [styles.exampleHideAnimation]: !isExampleOpen,
                            })}
                            >{attrExample}</Typography>}
                        </div>
                        <a
                            href='' className={styles.externalIcon}
                            onClick={onHandleOpenTranslate(word.foreign)}
                        >
                            <IconTranslate />
                        </a>
                    </div>
                    }                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    };

    renderError = () => {
        const { index } = this.props;

        return (
            <ExpansionPanel
                className={styles.panel}
                expanded={false}
            >
                <ExpansionPanelSummary
                    className={styles.panelSummary}
                    aria-controls={`panel${index}bh-content`}
                >
                    <Typography className={styles.wordsNums}>{index + 1}</Typography>
                    <div className={styles.errorWord}>
                        <span className={styles.error}>incorrect word</span>
                    </div>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        );
    };

    render()
    {
        const { error } = this.props.word;

        return (
            <React.Fragment>
                {error ?
                    this.renderError() :
                    this.renderExistWord()
                }
            </React.Fragment>
        );
    }
}

export default WordWithExpansionPanel;
