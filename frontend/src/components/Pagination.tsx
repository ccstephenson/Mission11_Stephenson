interface PaginationProps {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
    onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({currentPage, totalPages, pageSize, onPageChange, onPageSizeChange}: PaginationProps) => {
    return (
        <div className="flex item-center justify-center mt-4">
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Previous</button>

            {/* first we build an array out of the size of total pages. It'll map out the first one and for each one, it'll build a button */}
            {[...Array(totalPages)].map((_, index) => (
                    <button key={index + 1} onClick={() => onPageChange(index + 1)} disabled={currentPage === (index + 1)}>
                        {index + 1}
                    </button>
            ))}

            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</button>

            <br />
            <label>Results per page: 
            <select 
                value={pageSize} onChange = {(p) => {
                    onPageSizeChange(Number(p.target.value));
                }}
                > 
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
            </label>
        </div>
    );
}

export default Pagination;