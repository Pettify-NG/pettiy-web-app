
export interface ICustomer {
    id: number
    uuid: string
    firstName: string
    lastName: string
    username: string
    email: string
    profileImage: string
    status: string
    createdAt: string
    orderCount: number
    orderBalance: number
    phonenumber: number
  }
  
  export type ICustomers = ICustomer[];

  export const dummyCustomer = [
    {
      "id": 1,
      "uuid": "1234567890",
      "firstName": "John",
      "lastName": "Doe",
      "username": "JohnDoe",
      "email": "johndoe@example.com",
      "status": "active",
      "createdAt": "2024-06-28T10:00:00.000Z",
      "orderCount": 5,
      "orderBalance": 200.00,
      "phonenumber": 1234567890,
      "profileImage": "",
    },
    {
      "id": 2,
      "uuid": "2345678901",
      "firstName": "Jane",
      "lastName": "Smith",
      "username": "JohnDoe",
      "email": "janesmith@example.com",
      "status": "inactive",
      "createdAt": "2024-06-27T10:00:00.000Z",
      "orderCount": 2,
      "orderBalance": 100.00,
      "phonenumber": 2345678901,
      "profileImage": "",
    },
    {
      "id": 3,
      "uuid": "3456789012",
      "firstName": "Bob",
      "lastName": "Johnson",
      "username": "JohnDoe",
      "email": "bobjohnson@example.com",
      "status": "active",
      "createdAt": "2024-06-26T10:00:00.000Z",
      "orderCount": 10,
      "orderBalance": 500.00,
      "phonenumber": 3456789012,
      "profileImage": ""
    },
    {
      "id": 4,
      "uuid": "4567890123",
      "firstName": "Alice",
      "lastName": "Williams",
      "username": "JohnDoe",
      "email": "alicewilliams@example.com",
      "status": "inactive",
      "createdAt": "2024-06-25T10:00:00.000Z",
      "orderCount": 3,
      "orderBalance": 150.00,
      "phonenumber": 4567890123,
      "profileImage": ""
    },
    {
      "id": 5,
      "uuid": "5678901234",
      "firstName": "Charlie",
      "lastName": "Brown",
      "username": "JohnDoe",
      "email": "charliebrown@example.com",
      "status": "active",
      "createdAt": "2024-06-24T10:00:00.000Z",
      "orderCount": 7,
      "orderBalance": 350.00,
      "phonenumber": 5678901234,
      "profileImage": ""
    }
  ]
  
  