import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Pokemon } from './interfaces/Pokemon.ts'
import PokemonCard from './components/PokemonCard.tsx'

const POKEMON = 'dragonite'

const Wrapper = styled.div`
  width: 80vw;
  min-height: 100vh;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  background-color: #212121;
  box-shadow: rgb(0, 0, 0) 0px 2px 8px 0px;
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d2d2d2;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.25);
`

const PokemonList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  gap: 1em;
`

function App() {
  const [data, setData] = useState<Pokemon[] | null>(null)

  async function fetchData(): Promise<void> {
    try {
      setData(null)
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?q=name:${POKEMON}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }
      const result = await response.json()
      setData(result.data)
      console.log('Data fetched successfully')
    } catch (e) {
      setData(null)
      console.log('There was an error: ' + e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Wrapper>
      <h1>
        {'Pokémon Cards - ' +
          POKEMON.slice(0, 1).toUpperCase() +
          POKEMON.slice(1)}
      </h1>
      {data && data.length > 0 && (
        <PokemonList>
          {data.map((pokemon) => (
            <PokemonCard key={pokemon.id} data={pokemon} />
          ))}
        </PokemonList>
      )}
      {data && data.length === 0 && <p>No cards found</p>}
      {!data && <h2>Loading...</h2>}
    </Wrapper>
  )
}

export default App
