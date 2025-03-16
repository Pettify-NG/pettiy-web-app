import React from "react";

import { getUserDetails } from "@/libs/products";
import ProfileForm from "@/components/Dashboard/Profile/ProfileForm";

interface UserData {
    firstname: string;
    lastname: string;
    username: string;
    address: string;
    email: string;
    phoneNumber: string;
    country: string;
    state: string;
    profileImage: string;
    [key: string]: string;
}

export default async function Profile ({ params }: { params: { id: string } }) {

    const apiRes: Promise<UserData | null> = getUserDetails(params.id);
    const userDetails = await apiRes;

    return (
        <ProfileForm user={userDetails} />
    )
}