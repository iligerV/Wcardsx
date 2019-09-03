// @flow
import slice from '@tinkoff/utils/array/slice';
import findIndex from '@tinkoff/utils/array/findIndex';

const getIndex = (gapIndex: number, borderValue: number = 0): number =>
{
    if ((borderValue === 0 && gapIndex < borderValue) || (borderValue && gapIndex > borderValue))
    {
        return borderValue;
    }

    return gapIndex;
};


/**
 * Уменьшает список до заданного
 * @param quantity - длинна списка (Пример: 10)
 * @param gap - кол. элемметов доп. до и после (Пример: 3, то при quantity = 10 будет 16 элементов)
 * @return {function(any[], number)}
 */
export default (quantity: number, gap?: number = 0) =>
    /**
     * @param list - список, который надо сократить
     * @param currentIndex - текущий отображаемый элемент
     * @return {{ virtualizedList: any[], virtualIndex: number }}
     */
    (list: any[], currentIndex: number): { virtualizedList: any[], virtualIndex: number } =>
    {
        const firstIndex = getIndex(currentIndex - gap);
        const lastIndex = getIndex(currentIndex + quantity + gap, list.length);
        const virtualizedList = slice(firstIndex, lastIndex, list);
        const virtualIndex = findIndex(x => x === list[currentIndex])(virtualizedList);

        return { virtualizedList, virtualIndex };
    };
