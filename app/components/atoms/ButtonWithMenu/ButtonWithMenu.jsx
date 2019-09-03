import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ButtonHint from 'Components/atoms/ButtonHint/ButtonHint.jsx';

import IconArrowDropDown from '@material-ui/icons/ArrowDropDown';
import IconTranslate from '@material-ui/icons/Translate';

import styles from './buttonWithMenu.css';

const options = [{
    title: 'Translate',
    Icon: IconTranslate,
    onClick: () => {},
}, {
    title: 'Sect action',
    Icon: IconArrowDropDown,
    onClick: () => {},
}];

export default function ButtonWithMenu() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleMenuItemClick = onClick => event => {
        onClick();
        setOpen(false);
    };

    function handleToggle() {
        setOpen(prevOpen => !prevOpen);
    }

    function handleClose(event) {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    return (
        <div className={styles.wrapper}>
            <ButtonHint
                ref={anchorRef}
                title='Actions'
                onClick={handleToggle}
                icon={IconArrowDropDown}
            />
            <Popper
                open={open} anchorEl={anchorRef.current}
                transition disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    {options.map(({ title, Icon, onClick }, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={handleMenuItemClick(onClick)}
                                        >
                                            <Icon />&nbsp;&nbsp;{title}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}
