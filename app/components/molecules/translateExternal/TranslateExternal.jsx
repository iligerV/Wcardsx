// @flow
import * as React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import IconOpenInNew from '@material-ui/icons/OpenInNew';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

import styles from './translateExternal.css';

const TranslateUrls = [
    { name: 'Google', url: 'https://translate.google.ru/#view=home&op=translate&sl=en&tl=ru&text={{word}}' },
    { name: 'Reverso', url: 'https://context.reverso.net/%D0%BF%D0%B5%D1%80%D0%B5%D0%B2%D0%BE%D0%B4/%D0%B0%D0%BD%D0%B3%D0%BB%D0%B8%D0%B9%D1%81%D0%BA%D0%B8%D0%B9-%D1%80%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9/{{word}}' },
    { name: 'Lexico', url: 'https://www.lexico.com/en/definition/{{word}}' },
];

const prepareUrl = (url, word) => word ? url.replace('{{word}}', word.toLowerCase()) : url;
const Transition = React.forwardRef((props, ref) => <Slide direction='down' {...props} ref={ref} />);

type OpenProps = {
    word: string,
};

type Props = {};

type State = {
    isOpened: boolean,
    word: string,
};

class TranslateExternal extends React.PureComponent<Props, State>
{
    state = {
        isOpened: false,
        word: '',
    };

    handleClose = () =>
    {
        this.setState({ isOpened: false });
    };

    /**
     * @public
     * dialog opener
     */
    open(props: OpenProps)
    {
        this.setState({
            isOpened: true,
            word: props.word,
        });
    }

    renderWords = (): mixed =>
    {
        const translateSites = TranslateUrls;
        const { word } = this.state;

        return <ol>
            {translateSites.map(({ name, url }) => <li key={url} className={styles.li}>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a href={prepareUrl(url, word)} target='_blank'>{name}</a>
            </li>)}
        </ol>;
    };

    render()
    {
        const { isOpened, word } = this.state;

        return <Dialog
            className={styles.wrapper}
            open={isOpened}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby='alert-dialog-slide-title'
            aria-describedby='alert-dialog-slide-description'
        >
            <DialogTitle>
                Translate <b>{word}</b> <IconOpenInNew className={styles.externalIcon} />
            </DialogTitle>
            <DialogContent>
                <Typography component='div' align='left'>
                    {this.renderWords()}
                </Typography>
            </DialogContent>
        </Dialog>
        ;
    }
}

export default TranslateExternal;
