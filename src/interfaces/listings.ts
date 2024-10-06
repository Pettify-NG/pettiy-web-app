export interface IListing {
    id: string
    uuid: string
    merchant: User
    category: string
    breed: string
    sex: Sex
    price: number
    petDateOfBirth: string
    location: string
    stock: number
    color: string
    petImage: string
    vaccineCard: string
    vaccineStatus: boolean
    status: string
    description: string
    createdAt: string
}

enum Sex {
    Male = "male",
    Female = "female"
}

export interface User {
    role: string
    id: number
    uuid: string
    username: string
    firstName: string
    lastName: string
    email: string
    password: string
    profileImage: any
    verified: boolean
    userType: string
    loginType: string
    status: string
    twoFactorAuth: boolean
    notificationOrders: boolean
    notificationPromotion: boolean
    notificationToken: any
    createdAt: string
    updatedAt: string
}

export const dummyListings = [
    {
      "id": "1",
      "uuid": "uuid-12345",
      "merchant": {
        "role": "admin",
        "id": 1,
        "uuid": "uuid-12345",
        "username": "john_doe",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "merchant",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-30T12:00:00.000Z",
        "updatedAt": "2024-06-30T12:00:00.000Z"
      },
      "category": "dogs",
      "breed": "Labrador Retriever",
      "sex": Sex["Male"],
      "price": 50000,
      "petDateOfBirth": "2020-01-01",
      "location": "Lagos, Nigeria",
      "stock": 1,
      "color": "Golden",
      "petImage": "",
      "vaccineCard": "",
      "vaccineStatus": true,
      "status": "out-of-stock",
      "description": "Great animal",
    },
    {
      "id": "2",
      "uuid": "uuid-67890",
      "merchant": {
        "role": "admin",
        "id": 2,
        "uuid": "uuid-67890",
        "username": "jane_doe",
        "firstName": "Jane",
        "lastName": "Doe",
        "email": "janedoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "merchant",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-30T12:00:00.000Z",
        "updatedAt": "2024-06-30T12:00:00.000Z"
      },
      "category": "cats",
      "breed": "Siamese",
      "sex": Sex["Female"],
      "price": 30000,
      "petDateOfBirth": "2018-06-01",
      "location": "Abuja, Nigeria",
      "stock": 1,
      "color": "Cream",
      "petImage": "",
      "vaccineCard": "",
      "vaccineStatus": true,
      "status": "active",
      "description": "Great animal",
    }
  ]