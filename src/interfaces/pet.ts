export interface IPet {
    _id: string
    date_of_birth: string
    description: string
    breed: string
    price: number
    quantity: number
    seller: string
    category: string
    color: string
    gender: string
    name?: string
    pet_images: string[]
    createdAt: string
    vaccine_status: boolean
    location: string
    vaccine_status_image: string
}