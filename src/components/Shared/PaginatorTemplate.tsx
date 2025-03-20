"use client";

import { classNames } from 'primereact/utils';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { PaginatorCurrentPageReportOptions, PaginatorRowsPerPageDropdownOptions,
    PaginatorNextPageLinkOptions, PaginatorPageLinksOptions, PaginatorPrevPageLinkOptions } from 'primereact/paginator';

const PaginatorTemplate = ({ totalRecords = 0, page = 0 }: { totalRecords: number; page: number }) => {
    return (
        {
            layout: 'CurrentPageReport RowsPerPageDropdown PrevPageLink PageLinks NextPageLink ',
            RowsPerPageDropdown: (options: PaginatorRowsPerPageDropdownOptions) => {
                return (
                    <div className="invisible">
                    </div>
                );
            },
            PageLinks: (options: PaginatorPageLinksOptions) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return (
                    <span className={classNames('border px-3 py-1 mx-1 rounded-sm cursor-pointer border-[#F2C94C]')} style={{ userSelect: 'none' }}>
                        ...
                    </span>
                );
            }
            
            return (
                <span 
                className={classNames(`${options.page === page ? "bg-[#F2C94C]" : "bg-white"} px-3 cursor-pointer py-1 mx-1 rounded-sm border border-[#F2C94C] `)} 
                onClick={options.onClick}
                >
                    {options.page + 1}
                </span>
            );
            },
            CurrentPageReport: (options: PaginatorCurrentPageReportOptions) => {
            return (
                <div style={{ color: 'var(--text-color)', userSelect: 'none', width: 'auto', textAlign: 'left'}} className='text-sm text-neutral cursor-pointer items-center my-auto mr-auto'>
                    {`Showing ${options.first} - ${options.last} from ${totalRecords}`}
                </div>
            );
            },
            PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
                return (
                    <span 
                        className={classNames('rounded-sm bg-[#F2C94C] p-2 mx-1 cursor-pointer')} 
                        onClick={options.onClick}
                    >
                        <MdOutlineKeyboardArrowLeft color="black"/>
                    </span>
                );
            },
            NextPageLink: (options: PaginatorNextPageLinkOptions) => {
                return (
                    <span 
                    className={classNames('rounded-sm p-2 mx-1 bg-[#F2C94C] cursor-pointer')} 
                    onClick={options.onClick}
                    >
                        <MdKeyboardArrowRight color="black"/>
                    </span>
                );
            },
        }
    )
};

export default PaginatorTemplate;