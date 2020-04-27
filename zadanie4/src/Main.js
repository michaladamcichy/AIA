import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';

const styles = {
    buttonsContainer: {
        padding: '10px'
    },
    button: {
        margin: '10px'
    }
};

export default class Main extends Component {
    constructor(props) {
        super(props);

        let file = require('./mock.json');
        this.state = {
            newVisible: false,
            data: file.file,
            searchText: '',
            filteredData: file.file,
            sortMode: 'name',
        };

    }

    onNewRowVisibilityChange() {
        this.setState({ newVisible: !this.state.newVisible });
    }

    onAdd(row) {
        let data = this.state.data;
        data.push(row);
        this.setState({ data, filteredData: data });
        this.onNewRowVisibilityChange();
    }

    onDelete(id) {
        let data = this.state.data;
        delete data[id];
        this.setState({ data, filteredData: data });
    }

    onRatingChange(index, rating) {
        let rows = this.state.data;
        rows[index].rating = rating;
        this.setState({ data: rows });
    }

    filter(searchText) {
        if (searchText != '') {
            return this.state.data.filter(element => element.name.toLowerCase().includes(searchText.toLowerCase()) ||
                element.description.toLowerCase().includes(searchText.toLowerCase()) ||
                element.image.toLowerCase().includes(searchText.toLowerCase()) ||
                element.rating.toLowerCase().includes(searchText.toLowerCase()));
        } else {
            return this.state.data;
        }
    }

    onSortByName() {
        this.setState({ sortMode: 'name', filteredData: this.sort(this.state.filteredData, 'name') });
    }

    onSortByRating() {
        this.setState({ sortMode: 'rating', filteredData: this.sort(this.state.filteredData, 'rating') });
    }

    sort(data, mode) {
        if (mode == 'name') {
            return data.sort((element1, element2) => {
                if (element1.name.toLowerCase() < element2.name.toLowerCase()) {
                    return -1;
                } else if (element1.name.toLowerCase() > element2.name.toLowerCase()) {
                    return 1;
                } else return 0;
            });
        } else {
            return data.sort((element1, element2) => {
                if (parseFloat(element1.rating) < parseFloat(element2.rating)) {
                    return 1;
                } else if (parseFloat(element1.rating) > parseFloat(element2.rating)) {
                    return -1;
                } else return 0;
            });
        }
    }

    render() {
        return <div className={'container'}>
            <div className={'row buttonsContainer'} style={styles.buttonsContainer}>
                <button onClick={() => { this.setState({ newVisible: true }) }} className="col btn btn-success" style={styles.button}> Add </button>
                <button onClick={() => this.onSortByName()} className="col btn btn-success" style={styles.button}> Sort by name </button>
                <button onClick={() => this.onSortByRating()} className="col btn btn-success" style={styles.button}> Sort by rating </button>
                <input onChange={event => { this.setState({ searchText: event.target.value, filteredData: this.filter(event.target.value) }); console.log(this.state); }} className="col form-control" id="filterInput" style={styles.button} placeholder={'Filter by anything'} />
            </div>
            <Table
                onAdd={row => this.onAdd(row)}
                onDelete={id => this.onDelete(id)}
                data={this.sort(this.state.filteredData, this.state.sortMode)}
                onRatingChange={(index, rating) => this.onRatingChange(index, rating)}
                newVisible={this.state.newVisible}
                onNewRowVisibilityChange={() => this.onNewRowVisibilityChange()} />
        </div >;
    }
}

if (document.getElementById('main')) {
    ReactDOM.render(< Main />, document.getElementById('main'));
}