import React from "react";

import CreatePetListingForm from "@/components/Dashboard/PetListings/CreatePetListingForm";

export default function CreatePetListing () {
    return (
        <>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Create a new pet listing</h2>
        
            <CreatePetListingForm/>
        </>
    )
};