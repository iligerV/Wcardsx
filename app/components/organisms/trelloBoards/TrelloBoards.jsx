// @flow
import React from 'react';

import type { Board, List } from 'App/flowTypes/trelloStore.flow';

// Utils
import isEmpty from '@tinkoff/utils/is/empty';
import getClassForMaterial from 'Utils/getClassForMaterial';

// Components
import Lists from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';
import IconFolder from '@material-ui/icons/Folder';
import Layout from 'Components/layouts/withSidebar/WithSidebar.jsx';
import CardsList from './CardsList.jsx';

// Styles
import styles from './trelloLists.css';

type Props = {
    openedBoard?: string,
    pickedCardsId: ?string,
    loadingCards: {
        [string]: boolean
    },
    loadedLists: {
        [string]: List[]
    },
    boards: Board[],
    handleOnPickBoard: (id: string) => () => void,
    handleDownloadCards: (cardId: string) => () => void,
    isOpenItem: boolean,
}

const TrelloBoards = (props: Props) => (
    <Layout
        title='Trello boards'
    >
        {
            isEmpty(props.boards) ?
                <div className={styles.loaderWrapper}><CircularProgress /></div> :
                <Lists classes={getClassForMaterial(styles.list)}>
                    {
                        props.boards.map(({ id, name }: Board) =>
                            <li
                                key={id}
                            >
                                <ListItem
                                    classes={getClassForMaterial({
                                        [styles.listItem]: true,
                                        active: true,
                                    })}
                                    button
                                    onClick={props.handleOnPickBoard(id)}
                                >
                                    <ListItemIcon>
                                        <IconFolder />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={name}
                                    />
                                    {props.openedBoard === id && props.isOpenItem ? <IconExpandLess /> : <IconExpandMore />}
                                </ListItem>
                                <Collapse
                                    in={props.openedBoard === id && props.isOpenItem} timeout='auto'
                                    unmountOnExit
                                >
                                    <Lists disablePadding>
                                        <CardsList
                                            loadedListId={id}
                                            loadedLists={props.loadedLists}
                                            loadingCards={props.loadingCards}
                                            pickedCardsId={props.pickedCardsId}
                                            handleDownloadCards={props.handleDownloadCards}
                                        />
                                    </Lists>
                                </Collapse>
                            </li>
                        )
                    }
                </Lists>
        }

    </Layout>
);

TrelloBoards.defaultProps = {
    openedBoard: '',
};

export default TrelloBoards;
