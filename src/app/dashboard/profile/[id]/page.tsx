"use client";

import React from "react";
import Cookies from "universal-cookie";

import ProfileForm from "@/components/Dashboard/Profile/ProfileForm";
import useFetch from "@/hooks/useFetch";
import LoadingScreen from "@/components/Global/LoadingScreen";

interface UserData {
    firstname: string;
    lastname: string;
    username: string;
    address: string;
    email: string;
    phonenumber: string;
    country: string;
    state: string;
    profileImage: string;
    [key: string]: string;
}

export default function ProfileDetails ({ params }: { params: { id: string } }) {
    const fetchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/${params.id}`

    const cookies = new Cookies();
    const token = cookies.get("pettify-token");

    const options = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const { data, error, isLoading, refetch } = useFetch<UserData>(fetchUrl, options);
    console.log(data);

    if(!data) {
        return <LoadingScreen />
    }

    return (
        <section>
            <ProfileForm user={data} />
        </section>
    )
}