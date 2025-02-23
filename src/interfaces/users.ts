import { IListing } from "./listings"

export interface IUser {
    id: string
    username: string
    firstname: string
    lastname: string
    email: string
    phonenumber: number
    profileImage: string
    totalPurchases: number
    totalAmountSpent: number
    totalTransactions: number
    deliveryAddress: string
    createdAt: string
    updatedAt: string
    listings: IListing[]
}

export type IUsers = IUser[];

export const dummyUsers = [
    {
      "id": "1",
      "username": "john_doe",
      "firstname": "John",
      "lastname": "Doe",
      "email": "johndoe@example.com",
      "phonenumber": 8012345678,
      "profileImage": "https://example.com/johndoe.jpg",
      "totalPurchases": 5,
      "totalAmountSpent": 1000,
      "totalTransactions": 10,
      "deliveryAddress": "123 Main St, Lagos",
      "createdAt": "2022-01-01T00:00:00.000Z",
      "updatedAt": "2022-01-15T00:00:00.000Z",
      "listings": [],
    },
    {
      "id": "2",
      "username": "jane_smith",
      "firstname": "Jane",
      "lastname": "Smith",
      "email": "janesmith@example.com",
      "phonenumber": 7023456789,
      "totalAmountSpent": 1000,
      "totalTransactions": 10,
      "profileImage": "https://example.com/janesmith.jpg",
      "totalPurchases": 3,
      "deliveryAddress": "456 Elm St, Abuja",
      "createdAt": "2022-01-05T00:00:00.000Z",
      "updatedAt": "2022-01-20T00:00:00.000Z",
      "listings": [],
    },
    {
      "id": "3",
      "username": "emmanuel_oluwaseun",
      "firstname": "Emmanuel",
      "lastname": "Oluwaseun",
      "email": "emmanueloluwaseun@example.com",
      "phonenumber": 8045678901,
      "totalAmountSpent": 1000,
      "totalTransactions": 10,
      "profileImage": "https://example.com/emmanueloluwaseun.jpg",
      "totalPurchases": 2,
      "deliveryAddress": "789 Oak St, Port Harcourt",
      "createdAt": "2022-01-10T00:00:00.000Z",
      "updatedAt": "2022-01-25T00:00:00.000Z",
      "listings": [],
    }
  ]