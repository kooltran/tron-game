import React from 'react';
import './grid.scss'


export default class Grid extends React.Component {
    render() {
        let initArr = [];
        for (let i = 0; i < 400; i++) {
            initArr.push(i)
        }
        const breakNum = 5;
        return (
            <div className="grid-wrapper">
                {
                    initArr.map(item => (
                        <div key={item} className="grid-item">{item}</div>
                    ))
                }
            </div>
        )
    }
}