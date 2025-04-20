import { IUser } from "./users";

export default interface INotification {
    _id: string
    user: IUser
    title: string
    message: string
    isRead: boolean
    createdAt: string
}

export type INotifications = INotification[];