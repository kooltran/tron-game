import React from 'react';
import './homepage.scss'


export default class HomePage extends React.Component {
    state = {
        player1Info: null,
        player2Info: null,
    }

    onChangeInputName = (player) => {
        console.log(player)
    }

    render() {
        return (
            <div className="honme--wrapper">
                <div className="home--form">
                    <h2>Input players names</h2>
                    <div className="home--item home--item__one">
                        <span className="player-color"></span>
                        <input type="text" className="player-name" onChange={this.onChangeInputName('player1')} />
                        <span className="player-control"></span>
                    </div>
                    <div className="home--item home--item__two">
                        <span className="player-color"></span>
                        <input type="text" className="player-name" onChange={this.onChangeInputName('player2')} />
                        <span className="player-control"></span>
                    </div>
                    <button className="btn-start" onClick={() => this.props.onPageChange('game')}>Start Game</button>
                </div>
            </div>
        )
    }
}