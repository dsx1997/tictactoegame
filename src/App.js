import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
  return (
    <div className="App">
      
      
      <header className="App-header">
        <Game />
           <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>     
      </header>      
      
    </div>
  );
}

// class Square extends React.Component {
//   // constructor(props) {
//   //   super(props);
//   //   this.state = {
//   //     value2 : null,
//   //   };
//   // }
//   render() {
//     return (
      
//       // <button className="square" onClick={() => this.setState({value2 : 'X'})}>
//       <button className="square" onClick={() => this.props.funProps1()}>
//         {this.props.valProps1}
//         {/* {this.state.value2} */}
//       </button>
//     );
//   }
// }

function Square(props) {
  return (
    <button className="square" onClick={props.funProps1}>
      {props.valProps1}
    </button>
  );
}


class Board extends React.Component {
  
  renderSquare(i) {
    return <Square valProps1={this.props.valProps2[i]} funProps1={() => this.props.funProps2(i)}/>;
  }

  render() {
  
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props)  {
    super(props);
    this.state = {
      history : [{
        squares : Array(9).fill(null)
      }],
      stepNumber : 0,
      xIsNext : true,
    }
  }

  handleClick(i) {
    
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares1 = current.squares.slice();
    if (calculateWinner(squares1) || squares1[i]) {
      return;
    }
    
    squares1[i] = this.state.xIsNext ? 'X' : 'O';
    console.log('history in handleClick');
    console.log(history)
    this.setState({
      history: history.concat([{
        squares: squares1,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber : history.length,
    });
  }

  jumpTo(move) {
    this.setState({
      stepNumber : move,
      xIsNext : (move % 2) === 0,
    });
  }
  
  render() {
    
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    console.log('history in render');
    console.log(history);
    
    const moves = history.map((step, move) => {    
      console.log(step);  
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} >{desc}</button>
        </li>
      );
    });
    let status;
    if(winner) {
      status = 'The Winner is : ' + winner;
    } else {
      status = 'Next Player is : ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board valProps2={current.squares} funProps2={(i) => this.handleClick(i) }/>
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for(let i = 0; i < lines.length; i++) {
    let [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================


export default App;
