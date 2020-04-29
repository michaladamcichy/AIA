import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const styles = {
    image: {
        height: '100px'
    },
    row: {
        margin: '10px',
    }
};

export default class Row extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="row" style={styles.row}>
            <div className="col"><p> {this.props.name} </p></div>
            <div className="col"><p> {this.props.description} </p></div>
            <div className="col">{this.props.image && <img src={this.props.image} style={styles.image} />}</div>
            <div className="col"><input type={'number'} step={0.1} onChange={event => this.props.onRatingChange(this.props.id, event.target.value)} value={this.props.rating} className={'form-control'} /></div>
            <button onClick={() => { this.props.onDelete(this.props.id) }} className="col btn btn-danger"> Remove </button>
        </div >;
    }
}


if (document.getElementById('row')) {
    ReactDOM.render(< Row />, document.getElementById('row'));
}