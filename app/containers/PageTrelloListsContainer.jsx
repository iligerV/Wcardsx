// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Types
import type { Dispatch } from 'redux';
import type ContextRouter from 'react-router-dom';
import type { Board, List } from 'Types/trelloStore.flow';
import type { Set } from 'Stores/SetsStore.flow';

// Utils
import isEmpty from '@tinkoff/utils/is/empty';

// Actions
import setBoards from 'Actions/setBoards';
import pickBoardAction from 'Actions/pickBoard';
import downloadListCards from 'Actions/downloadListCards';

// Components
import TrelloBoards from 'Components/organisms/trelloBoards/TrelloBoards.jsx';
import Notification from 'Components/notification/Notification.jsx';

// Services
import getBoard from 'Api/getBoard';
import getBoards from 'Api/getBoards';

type Props = {
    boards: Board[],
    token: string,
    loadingCards: {
        [string]: boolean
    },
    loadedLists: {
        [string]: List[]
    },
    loadedCards: {
        [string]: {
            id: string,
            payload: Set[]
        },
    },
    pickedCardsId: ?string,
    setBoards: (boards: Board[]) => void,
    pickBoard: (id: string) => void,
    downloadListCards: (id: string) => void,
    ...ContextRouter,
}

type State = {
    error: boolean,
    openPageItem : boolean,
}

class PageTrelloListsContainer extends Component<Props, State>
{
    static defaultProps = {
        boards: [],
        loadedLists: {},
    };

    constructor(props)
    {
        super(props);

        this.state = {
            error: false,
            openPageItem: true,
        };
    }

    componentDidMount()
    {
        if (isEmpty(this.props.boards))
        {
            getBoards(this.props.token).then((boards: Board[]) =>
            {
                this.props.setBoards(boards);
            });
        }
    }

    onPickBoard = (id: string) => () =>
    {
        const { match, history, loadedLists, pickBoard } = this.props;
        const nextUrl = `/home/${id}`;

        this.setState({ openPageItem: !this.state.openPageItem });

        if (match.url !== nextUrl)
        {
            history.push(nextUrl);
            this.setState({ openPageItem: true });
        }

        if (isEmpty(loadedLists[id]))
        {
            getBoard(id)
                .then(lists => pickBoard({ id, lists }))
                .catch(() => this.setState({ error: true }));
        }
    };

    handleClose = (event, reason) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        this.setState({ error: false });
    };

    downloadCards = (cardId: string) => () =>
    {
        this.props.downloadListCards(cardId);
    };

    render()
    {
        const { match: { params: { id } }, boards, pickedCardsId, loadingCards, loadedLists } = this.props;

        return <div>
            <TrelloBoards
                isOpenItem={this.state.openPageItem}
                openedBoard={id}
                pickedCardsId={pickedCardsId}
                boards={boards}
                loadingCards={loadingCards}
                loadedLists={loadedLists}
                handleOnPickBoard={this.onPickBoard}
                handleDownloadCards={this.downloadCards}
            />
            <Notification
                open={!!this.state.error}
                handleClose={this.handleClose}
                type='error'
                message='Internet connection has been lost'
            />
        </div>;
    }
}


const mapStateToProps = ({ TrelloStore: {
    boards,
    loadedLists,
    loadedCards,
    loadingCards,
    pickedCardsId,
}, UserStore: { token } }) =>
    ({
        loadingCards,
        token,
        boards,
        loadedLists,
        loadedCards,
        pickedCardsId,
    });

const mapActionsToProps = (dispatch: Dispatch) => ({
    setBoards: setBoards(dispatch),
    pickBoard: pickBoardAction(dispatch),
    ...bindActionCreators({
        downloadListCards,
    }, dispatch),
});

export default connect(mapStateToProps, mapActionsToProps)(PageTrelloListsContainer);
