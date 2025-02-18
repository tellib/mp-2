import { Pokemon } from '../interfaces/Pokemon.ts'
import styled from 'styled-components'

const getBackgroundColor = (rarity: string) => {
  rarity = rarity || ''
  if (rarity.toLowerCase().includes('holo')) {
    return `
      background: linear-gradient(120deg, 
      rgba(255, 0, 0, 0.2) 0%,   
      rgba(255, 165, 0, 0.2) 16%, 
      rgba(255, 255, 0, 0.2) 32%, 
      rgba(0, 128, 0, 0.2) 48%,   
      rgba(0, 255, 255, 0.2) 64%, 
      rgba(0, 0, 255, 0.2) 80%,   
      rgba(128, 0, 128, 0.2) 100% 
      );
    `
  } else if (rarity.toLowerCase().includes('rare')) {
    return 'background-color: rgba(148, 128, 0, 0.2);' // Goldish for rare cards
  } else if (rarity.toLowerCase().includes('promo')) {
    return 'background-color: rgba(255, 0, 0, 0.2);'
  } else if (rarity.toLowerCase().includes('uncommon')) {
    return 'background-color: rgba(0, 128, 0, 0.2);' // Greenish for uncommon cards
  } else if (rarity.toLowerCase().includes('classic')) {
    return 'background-color: rgba(0, 0, 255, 0.2);' // Greenish for uncommon cards
  } else {
    return 'background-color: rgba(96, 96, 96, 0.2);' // Grayish for common cards
  }
}

const Card = styled.div<{ rarity: string }>`
  border-radius: 24px;
  ${(props) => getBackgroundColor(props.rarity)};
  padding: 1em;
  width: 16em;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 8px 0px;

  q {
    color: #767676;
    font-size: small;
  }

  img {
    max-width: 100%;
    width: 100%;
    height: auto;
    border-radius: 20px;
    transform: scale(1);
    transition: transform 0.1s ease-in-out;
  }

  img:hover {
    transform: scale(1.05);
  }
`

export default function PokemonCard({ data }: { data: Pokemon }) {
  return (
    <Card rarity={data.rarity}>
      <a href={data.cardmarket?.url}>
        <img src={data.images.small} alt={data.name} />
      </a>
      <div>
        <p>
          <span style={{ fontWeight: 'bold' }}>Set:</span> {data.set.name}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Date:</span>{' '}
          {data.set.releaseDate}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Artist:</span> {data.artist}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>Rarity:</span> {data.rarity}
        </p>
        {data.flavorText && <q>{data.flavorText}</q>}
      </div>
    </Card>
  )
}
