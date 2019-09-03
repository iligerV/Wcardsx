// @flow
// Services
import baseRequest from 'Api/baseRequest';

const getBoards = (id: string) => baseRequest({
    method: `boards/${id}/lists`,
});

export default getBoards;
