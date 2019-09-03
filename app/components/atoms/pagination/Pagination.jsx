// @flow
import React, { PureComponent } from 'react';

import ReactPaginate from 'react-paginate';

import IconLeftArrow from '@material-ui/icons/KeyboardArrowLeft';
import IconRightArrow from '@material-ui/icons/KeyboardArrowRight';

import styles from './pagination.css';

type Props = {
    wordsPerPage: number,
    wordsLength: number,
    activePage: number,
    onHandlePageClick: Function,
};

class Pagination extends PureComponent<Props, State>
{
    render()
    {
        const { wordsPerPage, wordsLength, activePage, onHandlePageClick } = this.props;
        const pageCount = Math.ceil(wordsLength / wordsPerPage);

        return (
            <React.Fragment>
                <ReactPaginate
                    previousLabel={<IconLeftArrow />}
                    nextLabel={<IconRightArrow />}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={4}
                    initialPage={0}
                    forcePage={activePage}
                    onPageChange={onHandlePageClick}
                    containerClassName={styles.pagination}
                    pageClassName={styles.page}
                    pageLinkClassName={styles.pageLink}
                    activeClassName={styles.activePage}
                    previousClassName={styles.previous}
                    previousLinkClassName={styles.previousLink}
                    nextClassName={styles.next}
                    nextLinkClassName={styles.nextLink}
                    disabledClassName={styles.disabled}
                    breakClassName={styles.break}
                    breakLinkClassName={styles.breakLink}
                />
            </React.Fragment>
        );
    }
}

export default Pagination;
