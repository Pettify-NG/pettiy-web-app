// "use client";
// import { createContext, useState } from "react";

// type UserContextType = {
//     userDetails: any,
//     setUserDetails: React.Dispatch<any>
// }

// export const UserContext = createContext<UserContextType | null>(null);

// const UserProvider = ({ children }: { children: React.ReactNode}) => {
//     const [userDetails, setUserDetails] = useState();

//     return (
//         <UserContext.Provider value={{ userDetails, setUserDetails }}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserProvider;