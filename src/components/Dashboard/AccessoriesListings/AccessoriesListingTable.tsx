"use client"

import { Column } from "primereact/column";
import { DataTable, DataTableFilterMeta, DataTablePageEvent } from "primereact/datatable";
import moment from "moment";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import { IListing } from "@/interfaces/listings";
import { formatCurrency, calculatePetAge } from "@/helpers";
import { IoIosArrowDown } from "react-icons/io";
import useLocalStorage from "@/hooks/useLocalStorage";

interface IPetListingsTable {
    searchValue: string;
    selectedDate: number | null;
    handleChangeSelectedListings: (e: any) => void;
    selectedListings: any;
}

export interface LazyTableState { 
    first: number; 
    rows: number; 
    page?: number | undefined; 
    pageCount?: number; 
    sortField?: string; 
    sortOrder?: number; 
    filters?: DataTableFilterMeta; 
}

export default function AccessoriesListingsTable ({
    searchValue,
    selectedDate,
    handleChangeSelectedListings,
    selectedListings,
}: IPetListingsTable) {
    // const cookies = new Cookies();
    // const httpService = new HTTPService();
  
    const router = useRouter();

    const [sellerInfo, setSellerInfo] = useLocalStorage<any>("pettify-details", {} as any);
  
    const [rowClick, setRowClick] = useState<boolean>(true);
    const [totalRecords, setTotalRecords] = useState<number>(0); 
    const [totalPages, setTotalPages] = useState<number>(0); 
    const [lazyListings, setLazyListings] = useState<IListing[] | null>(null); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [lazyState, setlazyState] = useState<LazyTableState>({ 
       first: 0, 
       rows: 10, 
       page: 0, 
    }); 

   const [timeFilter, setTimeFilter] = useState<string>("All-time");

    const loadLazyData = useCallback(() => { 
          setLoading(true); 
     
          //imitate delay of a backend call 
              const fetchData = () => { 
                  const cookies = new Cookies(); 
                  const token = cookies.get('urban-token'); 
                  console.log(token); 
                  const baseUrl = process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL; 
           
                  fetch(`${baseUrl}/api/v1/users/${sellerInfo.user._id}/accessories?page=${lazyState.page}&size=${lazyState.rows}&type=${timeFilter}`, { 
                      headers: { 
                          Authorization: `Bearer ${token}`, 
                      }, 
                      cache: 'no-store', 
                  }).then(response => { 
                      if (!response.ok) { 
                          throw new Error('Network response was not ok'); 
                      } 
                      return response.json(); 
                  }).then(data => { 
                      if (data.data) { 
                          console.log(data.meta); 
                          setTotalRecords(data.meta.total_items); 
                          setTotalPages(data.meta.total_pages); 
                          console.log(data.data); 
                          setLazyListings(data.data); 
                          setLoading(false); 
                      } 
                  }).catch(error => { 
                      toast.error(error.message); 
                      console.error('There was a problem with the fetch operation:', error); 
                  }); 
              }; 
           
              fetchData(); 
    }, [lazyState, timeFilter, sellerInfo]);
    
     useEffect(() => { 
        loadLazyData(); 
     }, [loadLazyData]); 
    
     const onPage = (event: DataTablePageEvent) => {  
        setlazyState(event);
        console.log(event); 
     }; 
  
    const dateTemplate = (listing: IListing) =>
      moment(listing.createdAt).format('MMM Do YYYY');

    const ageTemplate = (listing: IListing) => {
        const age = calculatePetAge(listing.petDateOfBirth);
        return age;
    }
  
    function amountTemplate(listing: IListing) {
      return formatCurrency(+listing.price);
    }
  
    // function actionTemplate(listing: IListing) {
    //   return (
    //     <div className='flex items-center gap-3'>
    //       <Link
    //         href={`/dashboard/listings/${listing.id}`}
    //         className='text-xl text-neutral'
    //       >
    //         <FaEye />
    //       </Link>
    //       <Link
    //         href={`/dashboard/listings/${listing.id}/edit`}
    //         className='text-xl text-neutral'
    //       >
    //         {/* <RxPencil2 /> */}
    //         <MdOutlineModeEdit />
    //       </Link>
    //       <button onClick={() => {
    //         // deleteProduct(product.id);
    //         setDeleteProductModal(true);
    //         setProductToBeDeleted(product.id);
  
    //       }}>
    //         <RiDeleteBin6Line className='text-xl' />
    //       </button>
    //     </div>
    //   );
    // }
  
    function checkIfUrl(imageUrl: string) {
      if (!/^https?:\/\//.test(imageUrl) && !/^\/ /.test(imageUrl)) {
        // console.error(`Invalid image URL: ${imageUrl}`);
        return false;
      }
      return true;
    }
  
    function listingTemplate(listing: IListing) {
      return (
        <div className='flex items-center gap-4'>
          {listing.petImage?.length > 0 && checkIfUrl(listing.petImage[0]) ? (
            <Image
              src={listing.petImage}
              alt={listing.description}
              width={20}
              height={20}
              className='h-12 w-12 bg-[#1b1b1b] rounded-md'
            />
          ) : (
            <div className='h-12 w-12 bg-[#1b1b1b] rounded-md'></div>
          )}
          <div className='flex-1 '>
            <p className='text-sm font-medium'>{listing?.breed}</p>
          </div>
        </div>
      );
    }

    function listingStatusTemplate (listing: IListing) {

        const { vaccineStatus } = listing;

        let styles;

        switch(vaccineStatus) {
            case true: 
        }

        return (
            <span className={`p-2 px-4 text-xs font-medium rounded-full whitespace-nowrap ${styles}`}>
              {vaccineStatus}
            </span>
        );
    } 
  
    const getListingsByDate = useMemo(() => {
      if (selectedDate) {
        return lazyListings?.filter(
          (listing) => moment(listing.createdAt).valueOf() >= selectedDate
        );
      } else return lazyListings;
    }, [lazyListings, selectedDate]);
  
    const matchedListings = useMemo(() => {
      if (searchValue.trim().length === 0) return getListingsByDate;
  
      return getListingsByDate?.filter(
        (listing) =>
          listing.breed.toLowerCase().includes(searchValue) ||
          listing.description.toLowerCase().includes(searchValue)
      );
    }, [getListingsByDate, searchValue]);
  
    const rowClassTemplate = (data: IListing) => {
      return {
          'cursor-pointer': data.id
      };
    };
  
    return (
      <div>
      <div className='card rounded-xl p-4 bg-white border border-gray-200'>

        <div className='px-4 flex flex-col w-full justify-between lg:flex-row lg:items-center gap-8 mb-8'>
          <p className='font-bold text-xl text-gray-700'>All listings</p>
        </div>
        
        <DataTable
          value={matchedListings ?? []}
          lazy 
          first={lazyState.first}  
          onPage={onPage} 
          loading={loading} 
          totalRecords={totalRecords}
          selectionMode={rowClick ? null : 'multiple'}
          selection={selectedListings!}
          onSelectionChange={handleChangeSelectedListings}
          dataKey='id'
          tableStyle={{ minWidth: '80rem' }}
          paginator
          paginatorClassName='flex justify-between'
          rows={10}
          // rowsPerPageOptions={[20, 50, 100]}
          className='rounded-xl text-sm capitalize'
          sortOrder={-1}
          sortField='createdAt'
          sortIcon={<IoIosArrowDown />}
          showSelectAll
          selectionAutoFocus={true}
          alwaysShowPaginator={true}
          onRowClick={(e) => router.push(`/dashboard/pets/${e.data.id}`)}
          rowClassName={rowClassTemplate}
        >
          <Column selectionMode='multiple' headerStyle={{ width: '3rem' }} />
          <Column field='category' header='Category' sortable />
          <Column field='breed' header='Breed' sortable />
          <Column field='petDateOfBirth' header='Age' body={ageTemplate} sortable />
          <Column field='stock' header='Number of Stock' sortable />
          <Column field='sex' header='Gender' sortable />
          {/* <Column field='listing' header='Listing' body={listingTemplate} /> */}
          <Column
            field='price'
            header='Price'
            body={amountTemplate}
            sortable
          />
          <Column
            field='vaccineStatus'
            header='Vaccine Status'
            sortable
            body={listingStatusTemplate}
          />
          {/* <Column field='createdAt' header='Added' body={dateTemplate} sortable /> */}
        </DataTable>
      </div>
      </div>
    );
}