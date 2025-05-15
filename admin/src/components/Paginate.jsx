import ReactPaginate from "react-paginate";

import { ReactComponent as PrevIcon } from "assets/icons/arrow-left.svg";
import { ReactComponent as NextIcon } from "assets/icons/arrow-right.svg";

const Paginate = (props) => {
  const { onPageChange, page, pagesCount } = props;

  return (
    <>
      {pagesCount > 1 && (
        <div dir="ltr">
          <ReactPaginate
            containerClassName="flex flex-wrap justify-center gap-2"
            activeClassName="bg-primary text-white"
            pageClassName="transition  rounded-md py-1 px-2"
            pageLinkClassName=""
            breakClassName=""
            breakLinkClassName="py-4 px-1"
            nextClassName="flex items-center"
            nextLinkClassName=""
            previousClassName="flex items-center"
            previousLinkClassName=""
            breakLabel="..."
            nextLabel={page < pagesCount && <NextIcon width={30} />}
            previousLabel={page > 1 ? <PrevIcon width={30} /> : null}
            onPageChange={(currntPage) => onPageChange(currntPage.selected + 1)}
            pageCount={pagesCount}
            pageRangeDisplayed={2}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </>
  );
};

export default Paginate;
