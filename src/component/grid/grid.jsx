import React from 'react';
import classnames from 'classnames';
import './grid.scss'


export default class Grid extends React.Component {
    render() {
        const playerClassName = classnames({
            "grid-item": true,

        })
        const { player1, player2 } = this.props;
        console.log(player2.path)
        return (
            <div className="grid-wrapper">
                {
                    this.props.initArr.map(item => (
                        <div id={item} key={item} className={classnames({
                            'grid-item': true,
                            'line-player1': player1.path.includes(item),
                            'line-player2': player2.path.includes(item)
                        })}></div>
                    ))
                }
            </div>
        )
    }
}