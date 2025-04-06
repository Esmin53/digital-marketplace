import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";



interface PaginationProps {
    totalResults: number,
    currentPage: number,
    setPage: (pageNum: number) => void,
    limit: number
}

const Pagination = ({ totalResults, currentPage, setPage, limit }: PaginationProps) => {


    const totalPages = Math.ceil(totalResults / limit)

    const handlePage = (pageNum: number) => {
        if(pageNum === 0) {
            return
        }

        if(pageNum > totalPages) return

        setPage(pageNum)
    }

    return (
        <div className=" flex justify-center my-4">
            <div className="flex gap-2">
                <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow" 
                onClick={() => handlePage(currentPage - 1)}>
                    <FaChevronLeft />
                </div>
                {currentPage - 1 !== 1 && currentPage !==  1 ? <div className="flex gap-1 items-end">
                        <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow font-medium"
                        onClick={() => handlePage(1)}>
                            1
                        </div>
                        <div className="flex items-end">
                            <LuDot />
                            <LuDot />
                            <LuDot />
                        </div>
                    </div> : null}
                {currentPage - 1 > 0 ? (
                    <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow font-medium"
                    onClick={() => handlePage(currentPage - 1)}>
                        {currentPage - 1}
                    </div>
                ) : null}
                <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow font-medium border border-accent-teal/40">
                    {currentPage}
                </div>
                {currentPage + 1 <= totalPages ? (
                    <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow font-medium"
                    onClick={() => handlePage(currentPage + 1)}>
                        {currentPage + 1}
                    </div>
                ) : null}
                    {currentPage + 1 < totalPages && currentPage !== totalPages ? <div className="flex gap-1 items-end">
                        <div className="flex items-end">
                            <LuDot />
                            <LuDot />
                            <LuDot />
                        </div>
                        <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow font-medium"
                        onClick={() => handlePage(totalPages)}>
                            {totalPages}
                        </div>
                    </div> : null}

                <div className="w-10 h-10 bg-secondary flex justify-center items-center cursor-pointer shadow">
                    <FaChevronRight onClick={() => handlePage(currentPage + 1)} />
                </div>
            </div>
        </div>
    )
}

export default Pagination;