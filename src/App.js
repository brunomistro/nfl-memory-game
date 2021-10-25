import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const nflImages = [
	{ "src": "/img/BIL.png", matched: false},
	{ "src": "/img/ATL.png", matched: false},
	{ "src": "/img/GB.png", matched: false },
	{ "src": "/img/MIA.png", matched: false },
	{ "src": "/img/SEA.png", matched: false },
	{ "src": "/img/TEN.png", matched: false },
]

export default function App() {
	const [cards, setCards] = useState([]);
	const [turns, setTurns] = useState(0);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [disabled, setDisabled] = useState(false);

	//shuffle cards
	const shuffleCards = () => {
		const shuffledCards = [...nflImages, ...nflImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({...card, id: Math.random()}));

		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(shuffledCards);
		setTurns(0);
	}

	//handle choice
	const handleChoice = (card) => {
		choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
	}

	//reset choices and add turn count
	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		setTurns(prevTurns => prevTurns + 1);
		setDisabled(false);
	}

	//compare 2 cards selected
	useEffect(() => {
		if (choiceOne && choiceTwo) {
			setDisabled(true);
			if (choiceOne.src === choiceTwo.src) {
				setCards(prevCards => {
					return prevCards.map(card => {
						if (card.src === choiceOne.src) {
							return {...card, matched: true}
						} else { return card }
					})
				})
				resetTurn();
			} else { setTimeout(() => resetTurn(), 1000); }
		}
	}, [choiceOne, choiceTwo]);

	//start an inital game
	useEffect(() => {
		shuffleCards()
	}, [])

  return (
    <div className="App">
      <h1>NFL Memory Game</h1>
			<button onClick={shuffleCards}>New Game</button>

			<div className="card-grid">
				{cards.map(card => (
					<SingleCard  
						key={card.id} 
						card={card} 
						handleChoice={handleChoice}
						flipped={card === choiceOne || card === choiceTwo || card.matched}
						disabled={disabled}
					/>
				))}
			</div>
			<p>Turns: {turns}</p>
    </div>
  );
}