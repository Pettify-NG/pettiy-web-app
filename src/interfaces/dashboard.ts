export interface IDashboardData {
    wallet: IWallet
    orders: any[]
    totalOrders: number
    totalPets: number
    totalAccessories: number
}

export interface IWallet {
    balance: number
    pendingBalance: number,
}