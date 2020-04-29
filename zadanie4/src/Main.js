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
        let data = this.withUniqueIds(file.file);
        this.state = {
            newVisible: false,
            data: data,
            searchText: '',
            filteredData: data,
            sortMode: 'name',
        };

    }

    withUniqueIds(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].id = data[i].name + (new Date()).getTime().toString() + i.toString();
        }

        return data;
    }

    onNewRowVisibilityChange() {
        this.setState({ newVisible: !this.state.newVisible });
    }

    onAdd(row) {
        row.id = row.name + (new Date()).getTime().toString();

        let data = this.state.data;
        data.push(row);
        this.setState({ data, filteredData: data });
        this.onNewRowVisibilityChange();
    }

    onDelete(id) {
        let data = this.state.data;
        data = data.filter(element => element.id != id);
        this.setState({ data, filteredData: data });
    }

    onRatingChange(id, rating) {
        let rows = this.state.data;
        rows.find(element => element.id == id).rating = rating;
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