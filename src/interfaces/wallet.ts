export interface IWallet {
    _id: string
    pendingBalance: number
    balance: number
    user: string
    accountDetails: IAccountDetails
}

interface IAccountDetails {
    bankName: string
    accountHolderName: string
    accountNumber: string
}