import React, { PureComponent } from 'react';
import classnames from 'classnames';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { LANG_FOREIGN, LANG_RU } from 'App/stores/constants/setsStore';

import type { Language } from 'Stores/SetsStore.flow';

import styles from './languageSwitcher.css';

type Props = {
    language: Language,
    onChange: Function,
};

class languageSwitcher extends PureComponent<Props>
{
    render()
    {
        const { language, onChange } = this.props;

        return <FormGroup row>
            <FormControlLabel
                control={
                    <Switch
                        defaultChecked={language === LANG_RU}
                        value='checkedF'
                        color='default'
                        onChange={onChange}
                    />
                }
                label={
                    <span className={styles.lang}>
                        <span className={classnames({ [styles.langBold]: language === LANG_FOREIGN })}>
                            {LANG_FOREIGN}
                        </span>
                        &nbsp;/&nbsp;
                        <span className={classnames({ [styles.langBold]: language === LANG_RU })}>
                            {LANG_RU}
                        </span>
                    </span>
                }
            />
        </FormGroup>;
    }
}

export default languageSwitcher;
