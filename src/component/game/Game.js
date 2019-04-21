import React, { Component } from 'react';

const DIRECTION_UP = 'up';
const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';
const DIRECTION_DOWN = 'down';

const mapPlayerToKeyToDirection = {
  player1: {
    w: DIRECTION_UP,
    a: DIRECTION_LEFT,
    d: DIRECTION_RIGHT,
    s: DIRECTION_DOWN
  },
  player2: {
    ArrowUp: DIRECTION_UP,
    ArrowLeft: DIRECTION_LEFT,
    ArrowRight: DIRECTION_RIGHT,
    ArrowDown: DIRECTION_DOWN
  }
};

const player1Keys = Object.keys(mapPlayerToKeyToDirection.player1);
const player2Keys = Object.keys(mapPlayerToKeyToDirection.player2);

const boxPerRow = 10;

const getNextIndex = currentIndex => direction => {
  let nextIndex = currentIndex;

  switch (direction) {
    case 'left':
      nextIndex = nextIndex - 1;
      break;
    case 'right':
      nextIndex = nextIndex + 1;
      break;
    case 'up':
      nextIndex = nextIndex - boxPerRow;
      break;
    case 'down':
      nextIndex = nextIndex + boxPerRow;
      break;
    default:
      nextIndex = nextIndex + 1;
  }

  return nextIndex;
};

const getLastIndex = array => array[array.length - 1];

const calculateBorder = (gridWidth, gridHeight) => {
  const border = [];
  for (var i = 0; i < gridWidth; i++) {
    border.push(i);
    border.push(gridWidth * (gridHeight - 1) + i);
  }
  for (var i = 0; i < gridHeight - 2; i++) {
    border.push(gridWidth * (i + 1));
    border.push(gridWidth * (i + 1) + gridWidth - 1);
  }
  return border;
};

class Game extends Component {
  constructor(props) {
    super(props);

    let map = [];

    for (let i = 0; i < boxPerRow * boxPerRow; i++) {
      map.push(i);
    }

    this.state = {
      timerId: null,
      map: map,
      player1: {
        path: [11],
        direction: 'right'
      },
      player2: {
        path: [20],
        direction: 'down'
      }
    };
  }

  updateIndex = () => {
    if (this.props.stop) {
      return this.cancelInterval();
    }

    this.setState(
      prevState => {
        const player1NextIndex = getNextIndex(
          getLastIndex(prevState.player1.path)
        )(prevState.player1.direction);
        const player2NextIndex = getNextIndex(
          getLastIndex(prevState.player2.path)
        )(prevState.player2.direction);

        return {
          player1: {
            ...prevState.player1,
            path: [...prevState.player1.path, player1NextIndex]
          },
          player2: {
            ...prevState.player2,
            path: [...prevState.player2.path, player2NextIndex]
          }
        };
      },
      () => {
        this.checkCollision();
      }
    );
  };

  checkCollision = () => {
    console.log(this.state);
    // const lastPlayer1 = getLastIndex(prevState.player1.path);
    // // const lastPlayer2 = getLastIndex(prevState.player2.path);

    // if (this.state.border.includes(lastPlayer1)) {

    // }
    // //
  };

  componentWillMount() {
    document.addEventListener(
      'keydown',
      e => {
        if (e.key === 'p') {
          this.cancelInterval();
        } else {
          if (player1Keys.includes(e.key)) {
            const newDirection = mapPlayerToKeyToDirection['player1'][e.key];
            this.updatePlayerDirection('player1', newDirection);
          } else if (player2Keys.includes(e.key)) {
            const newDirection = mapPlayerToKeyToDirection['player2'][e.key];
            this.updatePlayerDirection('player2', newDirection);
          }
        }
      },
      false
    );
  }

  componentDidMount() {
    this.setState({
      border: calculateBorder(boxPerRow, boxPerRow)
    });

    const timerId = setInterval(this.updateIndex, 1000);
    this.setState({
      timerId
    });
  }

  cancelInterval = () => {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
  };

  updatePlayerDirection = (playerId, direction) => {
    this.setState(prevState => ({
      [playerId]: {
        ...prevState[playerId],
        direction
      }
    }));
  };

  render() {
    return <div className="Game" />;
  }
}

export default Game;
