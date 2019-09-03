// @flow
// Services
import baseRequest from 'Api/baseRequest';

const getBoards = (token: string) => baseRequest({
    method: 'members/me/boards',
    token,
});

export default getBoards;
