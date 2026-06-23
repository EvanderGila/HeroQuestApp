// 1. Reflejo exacto de tus ENUMS de Supabase
export type ItemType = 'consumable' | 'equipment'

export type ItemSlot =
  | 'head'
  | 'chest_inner'
  | 'chest_outer'
  | 'bracers'
  | 'boots'
  | 'talisman'
  | 'weapon_1h'
  | 'shield'
  | 'weapon_2h'

// 2. Modelo de la tabla public.items
export interface Item {
  id: number // Usamos number porque en tu BD es 'serial'
  name: string
  type: ItemType | null
  reliq: boolean | null
  slot: ItemSlot | null
  hp_mod: number
  atk_mod: number
  def_mod: number
  mp_mod: number
  mov_mod: number
  effect: Record<string, any> | null // jsonb se mapea como objeto clave-valor
  img: string | null
}

// 3. Modelo de la tabla public.global_inventory
export interface GlobalInventory {
  id: number
  item_id: number
  quantity: number
  items?: Item // Para cuando Supabase nos devuelva el objeto anidado via JOIN
}

// 4. Modelo de la tabla public.shop_items
export interface ShopItem {
  id: number
  item_id: number
  stock: number
  price: number
  items?: Item // Objeto anidado del catálogo
}

// 5. Modelo de la tabla public.character_equipment
export interface CharacterEquipment {
  id: number
  character_id: number
  item_id: number
  slot: ItemSlot
  items?: Item // Para saber qué stats aporta lo que lleva equipado
}

//6. Modelo de la tabla public.global_resources
export interface GlobalResource {
  id: number
  type: string // 'gold', y lo que venga en el futuro
  amount: number
}
