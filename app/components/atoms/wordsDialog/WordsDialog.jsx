// @flow
import * as React from 'react';

import { Element, scroller } from 'react-scroll';
import noop from '@tinkoff/utils/function/noop';

import type { SetData } from 'Stores/SetsStore.flow';
import type { Action } from 'Types/common';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import CloseButton from '@material-ui/icons/CloseOutlined';

import styles from 'Components/atoms/wordsDialog/wordsDialog.css';

const SCROLL_CONTAINER = 'scrollContainer';

const Transition = React.forwardRef((props, ref) => <Slide
    direction='down' {...props}
    ref={ref}
/>);

type OpenProps = {
    header: string,
    canRevert: boolean,
    revertAction: Action,
    onClick: Action,
    index: number,
};

type Props = {
    wordsList: SetData[],
    index: number,
};

type State = {
    open: boolean,
    header: string,
    canRevert: boolean,
    revertAction: Action,
    onClick: null | Action,
};

class WordsDialog extends React.PureComponent<Props, State>
{
    state = {
        open: false,
        header: 'Words',
        canRevert: false,
        revertAction: noop,
        onClick: null,
    };

    handleClose = () =>
    {
        this.setState({ open: false });
    };

    handleRevert = (index: number) => () =>
    {
        this.state.revertAction(index);
    };

    handleClick = (index: number, callback: Function) => (e: Object) =>
    {
        e.preventDefault();
        callback(index);
    };

    createLink = (child: React.Node, idx: number) =>
    {
        const { onClick } = this.state;
        const isCurrWord = idx === this.props.index;
        const itemId = String(idx);

        if (onClick === null)
        {
            return child;
        }

        return (
            <Element name={itemId}>
                <a
                    className={isCurrWord ? styles.currLink : styles.gotoLink}
                    href='#'
                    onClick={this.handleClick(idx, onClick)}
                >
                    {child}
                </a>
            </Element>
        );
    };

    /**
     * @public
     * dialog opener
     */
    open({ header, canRevert, revertAction, onClick }: OpenProps)
    {
        this.setState({
            open: true,
            header,
            canRevert,
            revertAction,
            onClick,
        }, () => {
            const height = document.querySelector(`#${SCROLL_CONTAINER}`).clientHeight;

            scroller.scrollTo(`${this.props.index}`, {
                duration: 10,
                containerId: SCROLL_CONTAINER,
                offset: Math.floor(height / 3) * 2,
            });
        });
    }

    renderWords = (): mixed =>
    {
        const { wordsList } = this.props;
        const { canRevert } = this.state;

        if (!wordsList.length)
        {
            return 'words list is empty';
        }

        return <ol>
            {/* eslint-disable-next-line react/no-array-index-key */}
            {wordsList.map((item: SetData, idx: number) =>
                (
                    <li className={styles.li} key={idx}>
                        {canRevert && <IconButton
                            className={styles.revertButton}
                            size='small'
                            title='Revert word to the current list'
                            onClick={this.handleRevert(idx)}
                        >
                            <ReplayIcon style={{ fontSize: 16 }} />
                        </IconButton>}
                        {this.createLink(
                            <React.Fragment>
                                <b>{item.foreign}</b> {item.transcription ? ` [${item.transcription}]` : ''} - {item.ru}
                            </React.Fragment>,
                            idx,
                        )}
                    </li>
                )
            )}
        </ol>;
    };

    render()
    {
        const { wordsList } = this.props;
        const { open, header } = this.state;

        return (<Dialog
            className={styles.wrapper}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
        >
            <div className={styles.dialogTitle}>
                <DialogTitle id='alert-dialog-slide-title'>
                    {header}
                </DialogTitle>
                <IconButton className={styles.closeButton} onClick={this.handleClose}>
                    <CloseButton />
                </IconButton>
            </div>
            <DialogContent id={SCROLL_CONTAINER} >
                <Typography component='div' align={!wordsList.length ? 'center' : 'left'}>
                    {this.renderWords()}
                </Typography>
            </DialogContent>
        </Dialog>);
    }
}

export default WordsDialog;
