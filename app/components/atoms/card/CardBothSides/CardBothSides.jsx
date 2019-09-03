// @flow
import React, { PureComponent } from 'react';

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

import type { CardProps } from '../card.flow';

import styles from './cardBothSides.css';

class CardBothSides extends PureComponent<CardProps>
{
    render()
    {
        const { word, noRememberLater, openCurrentIterationSet, rememberLater } = this.props;
        const foreign = word && path(['foreign'], word);
        const ru = word && path(['ru'], word);
        const transcription = path(['transcription'], word);
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
                    <div />
                </CardActions>
                <CardContent className={styles.cardContent}>
                    <Typography variant='h5' component='div' className={styles.words}>
                        {foreign}
                    </Typography>
                    <div className={styles.hr} />
                    {transcription && <Typography variant='h5' component='div' className={styles.words}>
                        [{transcription}]
                    </Typography>}
                    {transcription && <div className={styles.hr} />}
                    <Typography variant='h5' component='div' className={styles.words}>
                        {ru}
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
                        && <Tooltip disableTouchListener title={word.attrs.e} >
                            <IconLibraryBooksOutlined className={styles.attrIcon} />
                        </Tooltip>
                        }
                    </div>
                    {noRememberLater ? null : <Button
                        className={styles.cardActionsButton}
                        size='small'
                        title='move word to remember later list'
                        onClick={rememberLater}
                    >
                        remember later
                    </Button>}
                </CardActions>
            </MCard>
        </div>;
    }
}

export default CardBothSides;
