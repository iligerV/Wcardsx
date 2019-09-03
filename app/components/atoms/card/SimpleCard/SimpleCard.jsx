// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import MCard from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListIcon from '@material-ui/icons/List';
import Tooltip from '@material-ui/core/Tooltip';
import IconVerifiedUser from '@material-ui/icons/VerifiedUser';
import IconErrorOutline from '@material-ui/icons/ErrorOutline';
import IconLibraryBooksOutlined from '@material-ui/icons/LibraryBooksOutlined';
import path from '@tinkoff/utils/object/path';
import { ATTRIBUTE_PROVED, ATTRIBUTE_RECHECK, ATTRIBUTE_EXAMPLE } from 'Constants/attributesConstants';

import { LANG_FOREIGN, LANG_RU } from 'Stores/constants/setsStore';

import type { Language, SetData } from 'Stores/SetsStore.flow';
import type { CardProps } from '../card.flow';

import styles from './SimpleCard.css';

type Props = CardProps & {
    language: Language,
};

type State = {
    word: SetData,
    prevLang: Language,
    language: Language,
    isTranslated: boolean,
    index: number,
};

class SimpleCard extends PureComponent<Props, State>
{
    static getInitState = (props: Props) => ({
        word: props.word,
        prevLang: props.language,
        language: props.language,
        isTranslated: false,
        index: props.index,
    });

    static getDerivedStateFromProps(props: Props, state: State)
    {
        if (props.language !== state.prevLang || props.word !== state.word || props.index !== state.index)
        {
            return SimpleCard.getInitState(props);
        }

        return null;
    }

    constructor(props: Props)
    {
        super(props);

        this.state = SimpleCard.getInitState(props);
    }

    handleSeeTranslation = () =>
    {
        const language = this.state.language;

        this.setState({
            language: language === LANG_FOREIGN ? LANG_RU : LANG_FOREIGN,
            isTranslated: language === this.props.language,
        });
    };

    render()
    {
        const { word, noRememberLater, openCurrentIterationSet, rememberLater } = this.props;
        const { language, isTranslated } = this.state;
        const attrProved = path(['attrs', ATTRIBUTE_PROVED], word);
        const attrRecheck = path(['attrs', ATTRIBUTE_RECHECK], word);
        const attrExample = path(['attrs', ATTRIBUTE_EXAMPLE], word);

        return <div className={styles.wrapper}>
            <MCard className={styles.card}>
                <CardActions className={styles.cardActionsTop}>
                    <div className={styles.listBtnWrapper}>
                        <IconButton
                            className={styles.listBtn}
                            title='show current list'
                            onClick={openCurrentIterationSet}
                        >
                            <ListIcon />
                        </IconButton>
                    </div>
                    <Button
                        className={classnames(styles.cardActionsButton, styles.transBtn)}
                        size='small'
                        onClick={this.handleSeeTranslation}
                    >
                        see {!isTranslated ? 'translation' : 'word'}
                    </Button>
                </CardActions>
                <CardContent className={styles.cardContent}>
                    <Typography className={styles.words} variant='h5' component='div'>
                        {word && word[language]}
                    </Typography>
                </CardContent>
                <CardActions className={styles.cardActionsBottom}>
                    <div className={styles.attributes}>
                        {attrProved
                        && <Tooltip disableTouchListener title='перевод верный' >
                            <IconVerifiedUser className={styles.attrIcon} />
                        </Tooltip>
                        }
                        {attrRecheck
                        && <Tooltip disableTouchListener title='требуется перепроверка' >
                            <IconErrorOutline className={styles.attrIcon} />
                        </Tooltip>
                        }
                        {attrExample
                        && <Tooltip disableTouchListener title={attrExample} >
                            <IconLibraryBooksOutlined className={styles.attrIcon} />
                        </Tooltip>
                        }
                    </div>
                    {!noRememberLater
                        && <Button
                            className={styles.cardActionsButton}
                            size='small'
                            title='move word to remember later list'
                            onClick={rememberLater}
                        >
                            remember later
                        </Button>
                    }
                </CardActions>
            </MCard>
        </div>;
    }
}

export default SimpleCard;
