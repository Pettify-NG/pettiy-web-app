"use client";

import React from "react";
import Cookies from 'universal-cookie';

import SettingsForm from "@/components/Dashboard/Settings/SettingsForm";
import LoadingScreen from "@/components/Global/LoadingScreen";
import useFetch from "@/hooks/useFetch";

export default function Settings() {
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/pickup-location`

    const cookies = new Cookies();
    const token = cookies.get("pettify-token");

    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data, error, isLoading, refetch } = useFetch<any>(fetchUrl, options);

    if(isLoading) {
        return <LoadingScreen />
    }

    console.log(data);

    return (
        <div>
            <SettingsForm pickupLocation={data}/>
        </div>
    )
}