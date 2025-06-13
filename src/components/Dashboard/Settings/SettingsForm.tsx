"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Cookies from "universal-cookie";
import { IoIosArrowDown } from "react-icons/io";
import { FormikErrors } from "formik";
import { useState } from "react";

import ENDPOINTS from "@/config/ENDPOINTS";
import HTTPService from "@/services/http";
import TextInput from "@/components/Global/TextInput";
import Button from "@/components/Global/Button";
import useLocalStorage from "@/hooks/useLocalStorage";
import nigeriaLocations from "@/data/lgas.json";

export interface PickupLocation {
  state: string;
  lga: string;
  address: string;
  nearestLandmark: string;
  nearestBusStop: string;
}

export interface ILocation {
  pickupLocation: PickupLocation;
  contactPhoneNumber: string;
}

function CustomError({ error }: { error?: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined }) {
    if (!error) return;

    // Handle different types of `error`
    const errorMessage =
        typeof error === "string"
        ? error
        : Array.isArray(error)
        ? error.join(", ")
        : undefined; // Handle FormikErrors<any> if needed

    if (!errorMessage) return null;

    return (
        <div className='text-xs font-light ml-1 p-2 absolute -bottom-6'>
            <span className='text-red-600'>
                {errorMessage === "Category must be greater than or equal to 1" ? "Category field is required!": errorMessage}
            </span>
        </div>
    );
}

const SettingsForm = ( { pickupLocation, contactPhoneNumber }: ILocation ) => {
    const [checkedState, setCheckedState] = useState<boolean>(false);

    const httpService = new HTTPService();

    const cookies = new Cookies();
    const token = cookies.get("pettify-token");

    const [seller_info, setSellerInfo] = useLocalStorage<any>("pettify-details", {} as any);

    const formik = useFormik({
        initialValues: {
            state: pickupLocation?.state ?? "",
            lga: pickupLocation?.lga ?? "",
            address: pickupLocation?.address ?? "",
            nearestLandmark: pickupLocation?.nearestLandmark ?? "",
            contactPhoneNumber: contactPhoneNumber ?? "",
            nearestBusStop: pickupLocation?.nearestBusStop ?? "",
        },
        validationSchema: Yup.object({
            state: Yup.string().required().label("State"),
            lga: Yup.string().required().label("lga"),
            address: Yup.string().required().label("Address"),
            nearestLandmark: Yup.string().required().label("Nearest Landmark"),
            nearestBusStop: Yup.string().required().label("Nearest Bust Stop"),
            contactPhoneNumber: Yup.string().required().label("Contact Phone Number"),
        }),
        onSubmit: async (values) => {
            try {
                const pickupLocation = {
                    state: values.state,
                    lga: values.lga,
                    nearestLandmark: values.nearestLandmark,
                    nearestBusStop: values.nearestBusStop,
                    address: values.address,
                };

                httpService
                .patch(
                    `${ENDPOINTS.USER}${seller_info.user._id}`, 
                    {
                        pickupLocation: pickupLocation,
                        contactPhoneNumber: values.contactPhoneNumber,
                    },
                    `Bearer ${token}`
                )
                .then((apiRes) => {
                    if (apiRes.success) {    
                        toast.success('Settings updated.');
                    } else {
                        toast.error(apiRes.message);
                    }
                });
            } catch (error: any) {
                console.log(error);
                toast.error(error.message);
            }
        },
        validateOnChange: true,
    });

    return (
        <>
            <h2 className="border-b-2 border-black py-4 w-full font-semibold text-xl">Settings</h2>

            <form
                action=''
                className='w-full  mt-10'
                onSubmit={formik.handleSubmit}
            >
                <div className="text-black text-sm w-full mb-6">
                    <p className="font-semibold">Important Notice:</p>
                    <p>Please set up your preferred delivery options for buyers.</p>
                    <p>Pettify currently offers delivery services within <strong>Lagos</strong> and selected locations only.</p> 
                </div>

                <label htmlFor='name' className='text-lg text-black mb-2 block'>
                    Pick-Up Location
                </label>
        
                <div className="my-6 w-full">
                    <div className="flex mb-6 items-center gap-3 w-full">
                        {/* State */}
                        <div className='relative w-full'>
                            <label
                                htmlFor='state'
                                className='text-sm text-neutral mb-2 block'
                            >
                                State
                            </label>
        
                            <select
                                name='state'
                                id='state'
                                className='text-black bg-[#F0F1F3] font-medium'
                                onChange={formik.handleChange}
                                value={formik.values.state}
                            >
                                <option value="" defaultChecked disabled>-- Select a State --</option>
                                {Object.keys(nigeriaLocations).map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                                ))}
                            </select>
                            <IoIosArrowDown className={`absolute right-4 ${formik.errors.state ? "top-10" : "bottom-4"}`} />
                            <CustomError error={formik.errors.state} />
                        </div>
        
                        {/* LGA */}
                        <div className='relative w-full'>
                            <label
                                htmlFor='lga'
                                className='text-sm text-neutral mb-2 block'
                            >
                                LGA
                            </label>
        
                            <select
                                name='lga'
                                id='lga'
                                className='text-black bg-[#F0F1F3] font-medium'
                                onChange={formik.handleChange}
                                value={formik.values.lga}
                                disabled={!formik.values.state}
                            >
                                <option value="" defaultChecked disabled>-- Select a LGA --</option>
                                {(nigeriaLocations[formik.values.state as keyof typeof nigeriaLocations] || []).map((state: string, index: number) => (
                                <option key={index} value={state}>
                                    {state}
                                </option>
                                ))}
                            </select>
                            <IoIosArrowDown className={`absolute right-4 ${formik.errors.lga ? "top-10" : "bottom-4"}`} />
                            <CustomError error={formik.errors.lga} />
                        </div>
                    </div>
        
                    {/* Address */}
                    <div className='mb-6'>
                        <label htmlFor='address' className='text-sm text-neutral mb-2 block'>
                            Full Address
                        </label>
                        <textarea
                            name='address'
                            id='address'
                            placeholder='Enter pickup address...'
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            className='bg-[#F0F1F3] text-black font-medium'
                        ></textarea>

                        <CustomError error={formik.errors.address} />
                    </div>

                    {/* Nearest Bus Stop */}
                    <div className='mb-6'>
                        <label htmlFor='address' className='text-sm text-neutral mb-2 block'>
                            Bus Stop
                        </label>

                        <textarea
                            name='nearestBusStop'
                            id='nearestBusStop'
                            placeholder='Enter the nearest bus stop to your house address...'
                            onChange={formik.handleChange}
                            value={formik.values.nearestBusStop}
                            className='bg-[#F0F1F3] text-black font-medium'
                        ></textarea>

                        <CustomError error={formik.errors.nearestBusStop} />
                    </div>

                    {/* Nearest Landmark */}
                    <div className='mb-6'>
                        <label htmlFor='address' className='text-sm text-neutral mb-2 block'>
                            Landmark
                        </label>

                        <textarea
                            name='nearestLandmark'
                            id='nearestLandmark'
                            placeholder='Describe the nearest landmark(s) to your house address...'
                            onChange={formik.handleChange}
                            value={formik.values.nearestLandmark}
                            className='bg-[#F0F1F3] text-black font-medium'
                        ></textarea>

                        <CustomError error={formik.errors.nearestLandmark} />
                    </div>
                </div>

                <label htmlFor='name' className='text-lg text-black mb-2 block'>
                    Pick-Up Contact Phone Number
                </label>

                {/* Contact Phone Number */}
                <div className='mb-6'>
                    <TextInput
                        placeholder='Enter contact phone number...'
                        id='contactPhoneNumber'
                        onChange={formik.handleChange}
                        value={formik.values.contactPhoneNumber}
                        error={formik.errors.contactPhoneNumber}
                    />
                </div>

                {/* <label htmlFor='name' className='text-lg text-neutral mb-2 block'>
                    Delivery Prices
                </label>

                <div className="my-6 w-full">
                    <div className='mb-6'>
                        <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                            Island 1
                        </label>
                        <TextInput
                            placeholder='Enter delivery price of island one...'
                            id='price'
                            onChange={formik.handleChange}
                            value={formik.values.islandOne}
                            error={formik.errors.islandOne}
                        />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                            Island 1
                        </label>
                        <TextInput
                            placeholder='Enter delivery price of island two...'
                            id='price'
                            onChange={formik.handleChange}
                            value={formik.values.islandTwo}
                            error={formik.errors.islandTwo}
                        />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                            Island 3
                        </label>
                        <TextInput
                            placeholder='Enter delivery price of island three...'
                            id='price'
                            onChange={formik.handleChange}
                            value={formik.values.islandThree}
                            error={formik.errors.islandThree}
                        />
                    </div>

                    <div className='mb-6'>
                        <label htmlFor='name' className='text-sm text-neutral mb-2 block'>
                            Mainland 1
                        </label>
                        <TextInput
                            placeholder='Enter delivery price of mainland one...'
                            id='price'
                            onChange={formik.handleChange}
                            value={formik.values.mainlandOne}
                            error={formik.errors.mainlandOne}
                        />
                    </div>

                </div> */}

                <div className="flex flex-col gap-6 text-gray-600 mb-8 mt-6">
                    <p> <strong>Note:</strong> Full pick-up details will only be shared with the buyer after payment confirmation.</p>
                    
                    <div>
                        <h4 className="font-semibold text-lg">Home Delivery</h4>
                        <p>For buyers who request home delivery, Pettify logistics team will come pick up the pet or accessories.</p>
                        <p className="font-semibold italic mt-4">In order to ensure pet’s safety and health, we require you as a vendor to: </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Prepare the pet securely for pickup.</li>
                            <li>Ensure the pet is placed inside a pet carrier/cage for safe transportation. (We advise you factor the cost of the pet carrier in the pricing of your pet)</li>
                            <li>On no account should a live pet be handed over directly to the rider without proper containment.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-lg">Outside Lagos Deliveries</h4>
                        <p>
                            For deliveries outside Lagos, you (the vendor) will coordinate and arrange delivery directly with the buyer. 
                            Pettify will not manage logistics outside the supported regions at this time. Once payment is confirmed, name and phone number of the customer will be shared with you for smooth communication on delivery charges. 
                            Once the buyer confirms payment of the Pet or accessories, payment will be made to your wallet for withdrawal.
                        </p>
                    </div>

                    <label className="flex">
                        <input
                            type="checkbox"
                            checked={checkedState}
                            onChange={() => setCheckedState((prev: boolean) => prev = !prev)}
                            className="mr-2 w-[24px] h-[24px]"
                        />
                        <p className="text-sm font-semibold italic">By submitting this form, you agree to Pettify’s safety and delivery guidelines.</p>
                    </label>
                </div>


                <Button block disabled={!checkedState} className="text-white" loading={formik.isSubmitting} type='submit'>
                    Submit
                </Button>
            </form>
        </>
    );
}

export default SettingsForm;
