import { IWallet } from "./wallet"

export interface IDashboardData {
    wallet?: IWallet
    orders: any[]
    totalOrders: number
    totalPets: number
    totalAccessories: number
    totalBalance: number
}