export interface IWallet {
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