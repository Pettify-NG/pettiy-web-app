'use server';

import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export const getPet = async (id: string) => {
    const token = getCookie("pettify-token", { cookies });

    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const apiRes = await fetch(`${baseURL}/api/v1/pets/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Cache-control': 'no-chache, max-age=0'
            },

            cache: "no-store"
        }
    );
    console.log(apiRes);

    const res = await apiRes.json();

    console.log(res);

    if(!res.success) {
        console.log(res);
        return;
    }

    return res.data;
}