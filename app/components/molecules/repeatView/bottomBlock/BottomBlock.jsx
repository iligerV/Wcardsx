// @flow
import React, { PureComponent } from 'react';
import classnames from 'classnames';

import propOr from '@tinkoff/utils/object/propOr';

import IconHistory from '@material-ui/icons/History';
import IconShuffle from '@material-ui/icons/Shuffle';
import IconFastRewind from '@material-ui/icons/FastRewind';
import IconReplay from '@material-ui/icons/Replay';
import IconTranslate from '@material-ui/icons/Translate';
// todo: добавить кнопку меню
// import ButtonWithMenu from 'Components/atoms/ButtonWithMenu/ButtonWithMenu.jsx';

// Types
import type { BottomButtonProps } from 'Components/molecules/repeatView/bottomBlock/index.jsx';

// Components
import ButtonHint, { COLOR_PRIMARY } from 'Components/atoms/ButtonHint/ButtonHint.jsx';
import InputCounter from 'Components/atoms/InputCounter/InputCounter.jsx';
import TranslateExternal from 'Components/molecules/translateExternal/TranslateExternal.jsx';
import ShuffleCheckbox from './ShuffleCheckbox.jsx';

import styles from './bottomBlock.css';

class BottomBlock extends PureComponent<BottomButtonProps>
{
    refTranslateBlock = React.createRef();

    componentDidMount()
    {
        const { autoShuffle, shuffle } = this.props;

        autoShuffle && shuffle();
    }

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
            shuffle,
            goToBeginning,
            initSetArrays,
            autoShuffle,
            setAutoShuffle,
            repeatLaterList,
            isMobile,
        } = this.props;
        const word = propOr(currentWordIndex, {})(currentWords).foreign;
        const isLoadExist = !!(repeatLaterList.length && isLast);

        return <div className={styles.wrapper}>
            <div className={styles.row}>
                {/* todo: добавить кнопку меню
                <ButtonWithMenu title='A'
                    // onClick={goToBeginning}
                    // icon={IconArrowDropDown}
                /> */}
                <ButtonHint
                    title='Translate' onClick={this.handleOpenTranslate(word)}
                    className={styles.btn}
                    icon={IconTranslate}
                />
                <ButtonHint
                    title='To the beginning'
                    className={styles.btn}
                    onClick={goToBeginning}
                    icon={IconFastRewind}
                />
                <ButtonHint
                    title='Shuffle words cards'
                    className={styles.btn}
                    onClick={shuffle}
                    icon={IconShuffle}
                />
                <ButtonHint
                    title='Repeat again'
                    className={styles.btn}
                    onClick={initSetArrays}
                    icon={IconReplay}
                />
                {isLoadExist
                    && <ButtonHint
                        title='Load remember later list'
                        className={styles.btn}
                        color={COLOR_PRIMARY}
                        value={isMobile ? '' : 'Load'}
                        icon={IconHistory}
                        onClick={loadRememberLater}
                    />
                }
            </div>
            <div className={styles.checkboxWrapper}>
                <ShuffleCheckbox
                    autoShuffle={autoShuffle}
                    setAutoShuffle={setAutoShuffle}
                />
            </div>
            <div className={classnames(styles.row, styles.right)}>
                <InputCounter />
            </div>
            <TranslateExternal ref={this.refTranslateBlock} />

        </div>;
    }
}

export default BottomBlock;
