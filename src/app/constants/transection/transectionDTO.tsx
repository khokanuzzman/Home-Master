export interface TransectionDTO {
    bazarCategory: string
    bazarItem: BazarItem[]
    total?: number
  }
  
  export interface BazarItem {
    item: string
    price: string
    quantity?:string
  }