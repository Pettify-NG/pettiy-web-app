import React from "react";

import CreateProductListingForm from "@/components/Dashboard/ProductListings/CreateProductListingsForm";

export default function CreateListingForm () {
    return (
        <>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Create new product listing</h2>
        
            <CreateProductListingForm />
        </>
    )
};