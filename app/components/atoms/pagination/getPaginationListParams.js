export default function getPaginationListParams(data, wordsPerPage) {
    const selected = data.selected;
    const startList = Math.ceil(selected * wordsPerPage);
    const endList = startList + wordsPerPage;

    return {
        startList,
        endList,
        selected,
    };
}
