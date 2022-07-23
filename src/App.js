import './App.css';
import femaleFighters from './female-fighters.json'
import maleFighters from './male-fighters.json'
import { useState } from 'react'

let allFighters = femaleFighters.concat(maleFighters);
for (let i = 0; i < allFighters.length; i++) {
  allFighters[i].name = decodeURIComponent(allFighters[i].name).normalize('NFD').replace(/\p{Diacritic}/gu, "");
}

const weightClasses = ['Strawweight', 'Flyweight', 'Bantamweight', 'Featherweight', 'Lightweight', 'Welterweight', 'Middleweight', 'Light Heavyweight', 'Heavyweight'];
const weightClassAbbreviations = ['SW', 'FLY', 'BW', 'FW', 'LW', 'WW', 'MW', 'LHW', 'HW'];

let randomFighter = allFighters[Math.floor(Math.random() * allFighters.length)];

const InputSection = (props) => {
  const { onChange, name, guesses } = props;

  return (
    <div>
      <form>
        <input type="text" style={{
          display: 'block',
          margin: 'auto',
          minWidth: '310px',
          width: '50%',
          maxWidth: '1500px',
          height: '50px',
          borderColor: '#60CDEF',
          marginTop: '100px',
          fontSize: '25px'
        }} onChange={onChange} value={name} placeholder={`Guess ${guesses + 1} of 5`} />
      </form>
    </div>
  )
}

const SelectionButton = (props) => {
  const { fighter, handleSelection } = props;

  return (
    <button style={{
      display: 'block',
      width: '100%',
    }} onClick={handleSelection}>
      {fighter.name}
    </button>
  )
}

const Guess = (props) => {
  const { fighter, randomFighter } = props;
  const { id, name, weightClass, rank, age, height, reach } = fighter;

  let gender;
  femaleFighters.find(f => f.id === id) ? gender = 'F' : gender = 'M';
  const abbreviatedWeightClass = weightClassAbbreviations[weightClasses.findIndex(w => w === weightClass)];
  const rankToShow = rank === 0 ? 'C' : rank;

  let genderColor = (femaleFighters.find(f => f.id === fighter.id) && femaleFighters.find(f => f.id === randomFighter.id)) ||
    (maleFighters.find(f => f.id === fighter.id) && maleFighters.find(f => f.id === randomFighter.id)) ? '#42E578' : '';

  let weightClassColor;
  let weightClassDifference = weightClasses.findIndex(w => w === weightClass) - weightClasses.findIndex(w => w === randomFighter.weightClass);
  Math.abs(weightClassDifference) === 1 ? weightClassColor = '#DAEA48' : weightClassColor = '';

  let weightClassText;
  if (weightClassDifference === 0) {
    weightClassText = abbreviatedWeightClass;
    weightClassColor = '#42E578'
  }
  else if (weightClassDifference < 0) {
    weightClassText = `${abbreviatedWeightClass} ${'▲'}`;
  }
  else {
    weightClassText = `${abbreviatedWeightClass} ${'▼'}`
  }

  let rankColor;
  let rankDifference = rank - randomFighter.rank;
  Math.abs(rankDifference) === 2 || Math.abs(rankDifference) === 1 ? rankColor = '#DAEA48' : rankColor = '';

  let rankText;
  if (rankDifference === 0) {
    rankText = `${rankToShow}`
    rankColor = '#42E578'
  }
  else if (rankDifference < 0) {
    rankText = `${rankToShow} ${'▼'}`;
  }
  else {
    rankText = `${rankToShow} ${'▲'}`;
  }

  let heightColor;
  let heightDifference = height - randomFighter.height;
  Math.abs(heightDifference) === 2 || Math.abs(heightDifference) === 1 ||  Math.abs(heightDifference) === 0.5 ? heightColor = '#DAEA48' : heightColor = '';

  let heightText;
  if (heightDifference === 0) {
    heightText = `${height}"`
    heightColor = '#42E578'
  }
  else if (heightDifference < 0) {
    heightText = `${height}" ${'▲'}`;
  }
  else {
    heightText = `${height}" ${'▼'}`;
  }

  let reachColor;
  let reachDifference = reach - randomFighter.reach;
  Math.abs(reachDifference) === 2 || Math.abs(reachDifference) === 1 || Math.abs(reachDifference) === 0.5 ? reachColor = '#DAEA48' : reachColor = '';

  let reachText;
  if (reachDifference === 0) {
    reachText = `${reach}"`
    reachColor = '#42E578'
  }
  else if (reachDifference < 0) {
    reachText = `${reach}" ${'▲'}`;
  }
  else {
    reachText = `${reach}" ${'▼'}`;
  }

  let ageColor;
  let ageDifference = age - randomFighter.age;
  Math.abs(ageDifference) === 2 || Math.abs(ageDifference) === 1 ? ageColor = '#DAEA48' : ageColor = '';

  let ageText;
  if (ageDifference === 0) {
    ageText = `${age}`
    ageColor = '#42E578'
  }
  else if (ageDifference < 0) {
    ageText = `${age} ${'▲'}`;
  }
  else {
    ageText = `${age} ${'▼'}`;
  }

  return (
    <div>
      <h4 style={{ marginTop: '30px', width: '100%' }}> {name} </h4>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ backgroundColor: genderColor }}> M/F </th>
            <th style={{ backgroundColor: weightClassColor }}> WC </th>
            <th style={{ backgroundColor: rankColor }}> # </th>
            <th style={{ backgroundColor: heightColor }}> HT </th>
            <th style={{ backgroundColor: reachColor }}> Reach </th>
            <th style={{ backgroundColor: ageColor }}> Age </th>
          </tr>
          <tr>
            <td style={{ backgroundColor: genderColor }}> {gender} </td>
            <td style={{ backgroundColor: weightClassColor }}> {weightClassText} </td>
            <td style={{ backgroundColor: rankColor }}> {rankText} </td>
            <td style={{ backgroundColor: heightColor }}> {heightText} </td>
            <td style={{ backgroundColor: reachColor }}> {reachText} </td>
            <td style={{ backgroundColor: ageColor }}> {ageText} </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  const [name, setName] = useState('');
  const [displayedFighters, setDisplayedFighters] = useState([]);
  const [guessesNumber, setGuessesNumber] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [found, setFound] = useState(false);

  function onChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
    if (event.target.value.trim() !== '') {
      let filteredFighters = allFighters.filter(fighter => fighter.name.trim().toLowerCase().indexOf(event.target.value.trim().toLowerCase()) !== -1);
      if (filteredFighters.length > 5) {
        filteredFighters = filteredFighters.sort(function (a, b) {
          let term1 = a.name.trim().toLowerCase().indexOf(event.target.value.trim().toLowerCase());
          let term2 = b.name.trim().toLowerCase().indexOf(event.target.value.trim().toLowerCase());
          return  term1 - term2;
        }).splice(0, 5);
      }
      setDisplayedFighters(filteredFighters);
    }
    else {
      setDisplayedFighters([])
    }
  }

  function resetGame(event) {
    event.preventDefault();
    setName('');
    setDisplayedFighters([]);
    setGuessesNumber(0);
    setGuesses([]);
    setFound(false);
    randomFighter = allFighters[Math.floor(Math.random() * allFighters.length)];
  }

  if (found) {
    return (
      <>
        <h2 style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '25px', textAlign: 'center' }}> You guessed correctly! </h2>

        <div>
          <h4 style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '30px', textAlign: 'center' }}> {randomFighter.name} </h4>
          <table style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '10px' }}>
            <tbody>
              <tr>
                <th> M/F </th>
                <th> WC </th>
                <th> # </th>
                <th> HT </th>
                <th> Reach </th>
                <th> Age </th>
              </tr>
              <tr>
                <td> {femaleFighters.find(f => f.id === randomFighter.id) ? 'F' : 'M'} </td>
                <td> {weightClassAbbreviations[weightClasses.findIndex(w => w === randomFighter.weightClass)]} </td>
                <td> {randomFighter.rank === 0 ? 'C' : randomFighter.rank} </td>
                <td> {randomFighter.height}" </td>
                <td> {randomFighter.reach} </td>
                <td> {randomFighter.age} </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '25px', textAlign: 'center' }}> Your guesses... </h2>

        <div style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto' }}>
          {guesses.map((guess) => {
            return <Guess key={guess.id} fighter={guess} randomFighter={randomFighter} />
          })}
        </div>

        <button style={{ display: 'block', margin: 'auto', marginTop: '50px' }} onClick={resetGame}> Play Again! </button>

        <div style={{ height: '70px' }}></div>
      </>
    )
  }

  if (guessesNumber === 5) {
    return (
      <>
        <h2 style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '25px', textAlign: 'center' }}> You used all your guesses! </h2>
        <p style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '15px', textAlign: 'center' }}> Correct fighter was... </p>

        <div>
          <h4 style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '30px', textAlign: 'center' }}> {randomFighter.name} </h4>
          <table style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '20px' }}>
            <tbody>
              <tr>
                <th> M/F </th>
                <th> WC </th>
                <th> # </th>
                <th> HT </th>
                <th> Reach </th>
                <th> Age </th>
              </tr>
              <tr>
                <td> {femaleFighters.find(f => f.id === randomFighter.id) ? 'F' : 'M'} </td>
                <td> {weightClassAbbreviations[weightClasses.findIndex(w => w === randomFighter.weightClass)]} </td>
                <td> {randomFighter.rank === 0 ? 'C' : randomFighter.rank} </td>
                <td> {randomFighter.height}" </td>
                <td> {randomFighter.reach} </td>
                <td> {randomFighter.age} </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto', marginTop: '25px', textAlign: 'center' }}> Your guesses... </h2>

        <div style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto' }}>
          {guesses.map((guess) => {
            return <Guess key={guess.id} fighter={guess} randomFighter={randomFighter} />
          })}
        </div>

        <button style={{ display: 'block', margin: 'auto', marginTop: '50px' }} onClick={resetGame}> Play Again! </button>

        <div style={{ height: '70px' }}></div>
      </>
    )
  }
  return (
    <>
      <InputSection onChange={onChange} name={name} guesses={guessesNumber} found={found} />

      <form style={{
        width: '50%',
        minWidth: '310px',
        maxWidth: '1500px',
        margin: 'auto',
        marginTop: '30px',
      }}>
        {displayedFighters.map(fighter => {
          return <SelectionButton key={fighter.id} fighter={fighter} handleSelection={(event) => {
            event.preventDefault();
            fighter.id === randomFighter.id ? setFound(true) : setFound(false);
            setGuessesNumber(guessesNumber + 1);
            setGuesses(guesses.concat([fighter]));
            setName('');
            setDisplayedFighters([]);
          }} />
        })}
      </form>

      <div style={{ width: '50%', minWidth: '310px', maxWidth: '1500px', margin: 'auto' }}>
        {guesses.map((guess) => {
          return <Guess key={guess.id} fighter={guess} randomFighter={randomFighter} />
        })}
      </div>

      <div style={{ height: '70px' }}></div>
    </>
  )
}

export default App;
