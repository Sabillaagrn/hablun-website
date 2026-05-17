// types.ts

export interface Product {
  id: number
  name: string
  price: number
  category: string

  image: string
  images: string[]

  // basic
  description: string

  // article section
  about: string
  story: string
  detail: string

  // benefits
  benefits: string[]

  // detail sidebar
  condition: string
  origin: string
  type: string

  // seller
  seller: string
  sellerPhone: string
  sellerDescription: string
}