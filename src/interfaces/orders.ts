export interface IOrder {
    id: number
    uuid: string
    paymentIntent: any
    userId: number
    paymentMethod: string
    customer: User
    merchant: User
    address: string
    status: string
    paymentStatus: string
    totalAmount: number
    deliveryDate: string
    createdAt: string
    updatedAt: string
    orderProduct: OrderProductItem[]
    user: User
}
  
  export interface OrderProductItem {
    id: number
    orderId: number
    productId: number
    productName: string
    image: string
    color: string
    quantity: number
    amount: number
    total: number
    category: string
    breed: string
    sex: "female" | "male" | string
    createdAt: string
    updatedAt: string
  }
  
  export interface User {
    role: string
    id: number
    uuid: string
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
  
  export const DummyOrders = [
    {
      "id": 1,
      "uuid": "1234567890",
      "paymentIntent": {},
      "userId": 1,
      "paymentMethod": "Card",
      "customer": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "merchant": {
        "role": "merchant",
        "id": 2,
        "uuid": "2345678901",
        "firstName": "Merchant",
        "lastName": "User",
        "email": "merchantuser@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "business",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "address": "123 Main St",
      "status": "pending",
      "paymentStatus": "unpaid",
      "totalAmount": 100.00,
      "deliveryDate": "2024-06-30T10:00:00.000Z",
      "createdAt": "2024-06-28T10:00:00.000Z",
      "updatedAt": "2024-06-28T10:00:00.000Z",
      "orderProduct": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "productName": "Product 1",
          "image": "product1.jpg",
          "color": "Red",
          "quantity": 2,
          "amount": 50.00,
          "total": 100.00,
          "category": "Dog",
          "breed": "German Sheperd",
          "sex": "male",
          "createdAt": "2024-06-28T10:00:00.000Z",
          "updatedAt": "2024-06-28T10:00:00.000Z"
        }
      ],
      "user": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      }
    },
    {
      "id": 2,
      "uuid": "1234567890",
      "paymentIntent": {},
      "userId": 1,
      "paymentMethod": "Card",
      "customer": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "merchant": {
        "role": "merchant",
        "id": 2,
        "uuid": "2345678901",
        "firstName": "Merchant",
        "lastName": "User",
        "email": "merchantuser@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "business",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "address": "123 Main St",
      "status": "pending",
      "paymentStatus": "unpaid",
      "totalAmount": 100.00,
      "deliveryDate": "2024-06-30T10:00:00.000Z",
      "createdAt": "2024-06-28T10:00:00.000Z",
      "updatedAt": "2024-06-28T10:00:00.000Z",
      "orderProduct": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "productName": "Product 1",
          "image": "product1.jpg",
          "color": "Red",
          "quantity": 2,
          "amount": 50.00,
          "total": 100.00,
          "category": "Dog",
          "breed": "German Sheperd",
          "sex": "male",
          "createdAt": "2024-06-28T10:00:00.000Z",
          "updatedAt": "2024-06-28T10:00:00.000Z"
        }
      ],
      "user": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      }
    },
    {
      "id": 3,
      "uuid": "1234567890",
      "paymentIntent": {},
      "userId": 1,
      "paymentMethod": "Card",
      "customer": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "merchant": {
        "role": "merchant",
        "id": 2,
        "uuid": "2345678901",
        "firstName": "Merchant",
        "lastName": "User",
        "email": "merchantuser@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "business",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "address": "123 Main St",
      "status": "pending",
      "paymentStatus": "unpaid",
      "totalAmount": 100.00,
      "deliveryDate": "2024-06-30T10:00:00.000Z",
      "createdAt": "2024-06-28T10:00:00.000Z",
      "updatedAt": "2024-06-28T10:00:00.000Z",
      "orderProduct": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "productName": "Product 1",
          "image": "product1.jpg",
          "color": "Red",
          "quantity": 2,
          "amount": 50.00,
          "total": 100.00,
          "category": "Dog",
          "breed": "German Sheperd",
          "sex": "male",
          "createdAt": "2024-06-28T10:00:00.000Z",
          "updatedAt": "2024-06-28T10:00:00.000Z"
        }
      ],
      "user": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      }
    },
    {
      "id": 4,
      "uuid": "1234567890",
      "paymentIntent": {},
      "userId": 1,
      "paymentMethod": "Card",
      "customer": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "merchant": {
        "role": "merchant",
        "id": 2,
        "uuid": "2345678901",
        "firstName": "Merchant",
        "lastName": "User",
        "email": "merchantuser@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "business",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      },
      "address": "123 Main St",
      "status": "pending",
      "paymentStatus": "unpaid",
      "totalAmount": 100.00,
      "deliveryDate": "2024-06-30T10:00:00.000Z",
      "createdAt": "2024-06-28T10:00:00.000Z",
      "updatedAt": "2024-06-28T10:00:00.000Z",
      "orderProduct": [
        {
          "id": 1,
          "orderId": 1,
          "productId": 1,
          "productName": "Product 1",
          "image": "product1.jpg",
          "color": "Red",
          "quantity": 2,
          "amount": 50.00,
          "total": 100.00,
          "category": "Dog",
          "breed": "German Sheperd",
          "sex": "male",
          "createdAt": "2024-06-28T10:00:00.000Z",
          "updatedAt": "2024-06-28T10:00:00.000Z"
        }
      ],
      "user": {
        "role": "customer",
        "id": 1,
        "uuid": "1234567890",
        "firstName": "John",
        "lastName": "Doe",
        "email": "johndoe@example.com",
        "password": "password123",
        "profileImage": null,
        "verified": true,
        "userType": "individual",
        "loginType": "email",
        "status": "active",
        "twoFactorAuth": false,
        "notificationOrders": true,
        "notificationPromotion": true,
        "notificationToken": null,
        "createdAt": "2024-06-28T10:00:00.000Z",
        "updatedAt": "2024-06-28T10:00:00.000Z"
      }
    }
  ]