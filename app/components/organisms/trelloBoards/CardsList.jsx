// @flow
import React, { PureComponent } from 'react';

import type { List } from 'App/flowTypes/trelloStore.flow';

// Utils
import getClassForMaterial from 'Utils/getClassForMaterial';

// Components
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

// Styles
import styles from './trelloLists.css';

type Props = {
    loadedListId: string,
    loadingCards: {
        [string]: boolean
    },
    loadedLists: {
        [string]: List[]
    },
    pickedCardsId: ?string,
    handleDownloadCards: (cardId: string) => () => void,
}

class CardsList extends PureComponent<Props>
{
    render()
    {
        const { loadedListId, loadedLists, pickedCardsId, loadingCards, handleDownloadCards } = this.props;
        const loadedList: List[] = loadedLists[loadedListId];

        if (loadedList)
        {
            // $FlowFixMe
            return loadedList.map(({ id: cardId, name: listTitle }: List) =>
                <li key={cardId}>
                    <ListItem
                        className={styles.subListItem}
                        selected={pickedCardsId === cardId}
                        button
                    >
                        <Tooltip title='Pick group'>
                            <ListItemText
                                inset
                                primary={listTitle}
                                classes={getClassForMaterial(styles.subListItemButton)}
                            />
                        </Tooltip>
                        <Tooltip title='Download or update cards'>
                            {
                                loadingCards[cardId] ?
                                    <div className={styles.cardLoaderWrapper}>
                                        <CircularProgress size={24} />
                                    </div> :
                                    <IconButton onClick={handleDownloadCards(cardId)} >
                                        <GetAppIcon />
                                    </IconButton>
                            }
                        </Tooltip>
                    </ListItem>
                </li>
            );
        }

        return <div className={styles.loaderWrapper}><CircularProgress /></div>;
    }
}

export default CardsList;
