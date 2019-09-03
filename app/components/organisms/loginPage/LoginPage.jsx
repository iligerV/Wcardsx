import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { IMG_PATH } from 'Constants/common';

import styles from './LoginPage.css';

type Props = {
    onLogIn: Function
}

const LoginPage = (props: Props) => (
    <div className={styles.loginPage}>
        <div className={styles.banner}>
            <div className={styles.text}>
                <h1>Wcards</h1>
                <p>Learn faster!</p>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={props.onLogIn}
                >LOG IN TO TRELLO</Button>
            </div>
            <img
                src={`${IMG_PATH}/desk.png`}
                alt='desk'
                className={styles.image}
            />
        </div>
    </div>
);

LoginPage.propTypes = {
    onLogIn: PropTypes.func.isRequired,
};

export default LoginPage;
