// @flow
import React, { PureComponent } from 'react';
import propOr from '@tinkoff/utils/object/propOr';

import type { Action } from 'Types/common';
import type { SetData } from 'Stores/SetsStore.flow';

import IconHistory from '@material-ui/icons/History';
import IconReplay from '@material-ui/icons/Replay';
import IconTranslate from '@material-ui/icons/Translate';
import ButtonHint, { COLOR_PRIMARY } from 'Components/atoms/ButtonHint/ButtonHint.jsx';
import TranslateExternal from 'Components/molecules/translateExternal/TranslateExternal.jsx';

import styles from './bottomBlock.css';

type Props = {
    currentWords: SetData[],
    repeatLaterList: SetData[],
    currentWordIndex: number,
    isLast: boolean,
    isMobile: boolean,
    loadRememberLater: Action,
    initSetArrays: Action,
};

class BottomBlock extends PureComponent<Props>
{
    refTranslateBlock = React.createRef();

    handleOpenTranslate = word => () => {
        this.refTranslateBlock.current.open({ word });
    };

    render()
    {
        const {
            currentWords,
            currentWordIndex,
            isLast,
            loadRememberLater,
            initSetArrays,
            repeatLaterList,
            isMobile,
        } = this.props;
        const word = propOr(currentWordIndex, {})(currentWords).foreign;
        const isLoadExist = !!(repeatLaterList.length && isLast);

        return <div className={styles.wrapper}>
            <div className={styles.row}>
                <ButtonHint
                    title='Translate'
                    className={styles.btn}
                    onClick={this.handleOpenTranslate(word)}
                    icon={IconTranslate}
                />
                <ButtonHint
                    title='Learn again'
                    className={styles.btn}
                    onClick={initSetArrays}
                    icon={IconReplay}
                />
                {isLoadExist
                    && <ButtonHint
                        title='Load remember later list'
                        className={styles.btn}
                        color={COLOR_PRIMARY}
                        onClick={loadRememberLater}
                        value={isMobile ? '' : 'Load'}
                        icon={IconHistory}
                    />
                }
            </div>
            <TranslateExternal ref={this.refTranslateBlock} />
        </div>;
    }
}

export default BottomBlock;
