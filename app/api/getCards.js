// @flow
// Services
import baseRequest from 'Api/baseRequest';

const getCards = (id: string) => baseRequest({
    method: `lists/${id}/cards`,
});

export default getCards;
