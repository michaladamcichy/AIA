import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StyleSheet from 'react';

const styles = {
    row: {
        margin: '10px',
    }
};

export default class NewRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            image: '',
            rating: '',
        };
    }

    onAdd() {
        if (this.state.name && this.state.description && this.state.rating)
            this.props.onAdd({ name: this.state.name, description: this.state.description, image: this.state.image, rating: this.state.rating });
    }

    render() {
        return <div className="row" style={styles.row}>
            <div className="col"> <input onChange={event => this.setState({ name: event.target.value })} className={'form-control'} /></div>
            <div className="col"> <input onChange={event => this.setState({ description: event.target.value })} className={'form-control'} /></div>
            <div className="col"> <input onChange={event => this.setState({ image: event.target.value })} className={'form-control'} placeholder={'Paste url'} /></div>
            <div className="col"> <input onChange={event => this.setState({ rating: event.target.value })} className={'form-control'} /></div>
            <button onClick={() => { this.onAdd() }} className="col btn btn-success"> Add! </button>

        </div >;
    }
}


if (document.getElementById('newRow')) {
    ReactDOM.render(< NewRow />, document.getElementById('newRow'));
}