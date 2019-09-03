import React, { useState, memo } from 'react';
import classnames from 'classnames';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconKeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import IconKeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';

import styles from './inputCounter.css';

function InputCounter()
{
    const [count, setCount] = useState(1);

    return (
        <div className={classnames(styles.wrapper, styles.width50)}>
            <Button
                size='small'
                color='primary' className={styles.width50}
                onClick={() => setCount(count + 1)}
            >
                <IconKeyboardArrowUp />
            </Button>
            <TextField
                className={styles.input}
                id='outlined-bare' value={count}
                margin='normal' variant='outlined'
            />
            <Button
                size='small'
                color='primary' className={styles.width50}
                onClick={() => setCount(count - 1)}
            >
                <IconKeyboardArrowDown />
            </Button>
        </div>
    );
}

export default memo(InputCounter);
