// @flow
import React from 'react';
import getClassForMaterial from 'App/core/utils/getClassForMaterial';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tooltip from '@material-ui/core/Tooltip/Tooltip';

import type { ShuffleProps } from 'Components/molecules/repeatView/bottomBlock/index.jsx';

import styles from './bottomBlock.css';

function ShuffleCheckbox({ autoShuffle, setAutoShuffle }: ShuffleProps) {
    return (
        <Tooltip title='Cards will be reshuffled if you click "Repeat again"'>
            <FormControlLabel
                className={styles.checkboxLabel}
                control={
                    <Checkbox
                        classes={getClassForMaterial({
                            [styles.checkbox]: true,
                        })}
                        color='default'
                        checked={autoShuffle}
                        onChange={setAutoShuffle}
                    />
                }
                label='auto shuffle'
            />
        </Tooltip>
    );
}

export default ShuffleCheckbox;
