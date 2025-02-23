"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../Global/Button";

interface ICreateListingProp {
    closePopup: () => void
}

const CreateListingPopup: React.FC<ICreateListingProp> = ({ closePopup }) => {
  const [selectedOption, setSelectedOption] = useState<"pet" | "accessory" | "">("");
  const router = useRouter();

  const handleContinue = () => {
    if (selectedOption === "pet") {
      router.push("/dashboard/pet/create");
    } else if (selectedOption === "accessory") {
      router.push("/dashboard/accessories/create");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
            onClick={closePopup}
            className="absolute top-2 right-2 text-gray-400 text-3xl hover:text-gray-600"
        >
            &times;
        </button>

        <h2 className="text-lg font-semibold mb-4">Create a new listing</h2>

        <div
          className={`p-4 mb-3 cursor-pointer ${
            selectedOption === "pet" ? "bg-orange-100 border-orange-500" : ""
          }`}
          onClick={() => setSelectedOption("pet")}
        >
          <h3 className="font-medium">Create a new pet listing</h3>
          <p className="text-sm text-gray-600">
            List your dog, cat, bunny, and more in just a few steps
          </p>
        </div>

        <div
          className={`p-4 mb-4 cursor-pointer ${
            selectedOption === "accessory" ? "bg-orange-100 border-orange-500" : ""
          }`}
          onClick={() => setSelectedOption("accessory")}
        >
          <h3 className="font-medium">Create a new accessory listing</h3>
          <p className="text-sm text-gray-600">
            List all kinds of pet accessories such as feed, toys, pet wearables, etc.
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outlined"
            onClick={() => setSelectedOption("")}
            className=""
          >
            Cancel
          </Button>

          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            variant="fill"
            className="bg-orange-500 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateListingPopup;
