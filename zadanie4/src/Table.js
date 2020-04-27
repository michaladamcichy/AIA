import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
import NewRow from './NewRow';

const styles = {
    table: {
    }
};

export default class Table extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className={'container'} style={styles.table}>
            <div className="row" >
                <div className="col"><p> {'Name'} </p></div>
                <div className="col"><p> {'Description'} </p></div>
                <div className="col"><p> {'Image'} </p></div>
                <div className="col"><p> {'Rating'} </p></div>
                <div className="col"></div>

            </div >
            <hr />
            {this.props.newVisible && <NewRow onAdd={row => this.props.onAdd(row)} />}
            {this.props.data &&
                this.props.data.map((row, index) => < Row
                    key={index}
                    id={index}
                    name={row.name}
                    description={row.description}
                    image={row.image}
                    rating={row.rating}
                    onRatingChange={(index, rating) => this.props.onRatingChange(index, rating)}
                    onDelete={id => this.props.onDelete(id)}
                />)
            }
        </div>
    }
}

if (document.getElementById('table')) {
    ReactDOM.render(< Table />, document.getElementById('table'));
}