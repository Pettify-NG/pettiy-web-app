
import React from "react";

import CreateAccessoriesListingForm from "@/components/Dashboard/AccessoriesListings/CreateAccessoriesListingsForm";

export default function CreateAccessories () {
    return (
        <div>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Create a new accessory listing</h2>

            <CreateAccessoriesListingForm />
        </div>
    )
}