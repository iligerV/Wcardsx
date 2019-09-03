// @flow
export type Board = { id: string, url: string, name: string, };

export type List = {
    closed: boolean,
    id: string,
    idBoard: string,
    name: string,
    pos: number,
    subscribed: boolean,
};

export type Card = {
    closed: boolean,
    id: string,
    url: string,
    idBoard: string,
    name: string,
    pos: number,
    shortUrl: string,
    subscribed: boolean,
    desc: string,
};

export type TrelloStoreTypes = {
    boards: Board[],
    loadingCards: {
        [string]: boolean
    },
    loadedLists: {
        [string]: List[]
    },
    loadedCards: {
        [string]: Card[]
    },
    pickedCardsId: ?string,
}
