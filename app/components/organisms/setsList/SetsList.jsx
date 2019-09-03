// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ContextRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';

import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';

import type { SetMeta } from 'Stores/SetsStore.flow';

import styles from './setsList.css';

type Props = {
    setsMeta: SetMeta[],
    history: ContextRouter.history
};

class SetsList extends Component<Props>
{
    handleClickWithParam = (id: string) => () =>
    {
        const { history } = this.props;

        history.push(`/set/${id}`);
    };

    render()
    {
        const { setsMeta } = this.props;

        return <Layout
            title='Наборы слов'
        >
            <List>
                {setsMeta.map(({ id, title, comment }: SetMeta) =>
                    <ListItem
                        key={id} button
                        onClick={this.handleClickWithParam(id)}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FolderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className={styles.text}
                            primary={title}
                            secondary={comment}
                        />
                    </ListItem>
                )}
            </List>
        </Layout>;
    }
}

function mapStateToProps({ SetsStore: { setsMeta } })
{
    return {
        setsMeta,
    };
}

const styles2 = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

export default withStyles(styles2)(connect(mapStateToProps)(SetsList));
