export interface Pokemon {
  id: string
  name: string
  artist?: string
  rarity: string
  flavorText?: string
  images: { small?: string; large?: string }
  set: Set
  cardmarket?: CardMarket
}

interface Set {
  id: string
  name: string
  releaseDate: string
}

interface CardMarket {
  url: string
}
