import React, { Component } from 'react';
import { OncoPrint } from '../src';

import dataset1 from './data/dataset1.json';
import dataset2 from './data/dataset2.json';
import dataset3 from './data/dataset3.json';
import cBioPortalData from './data/cBioPortalData.json';


const DATA = {
    dataset1,
    dataset2,
    dataset3,
    cBioPortalData
};


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'dataset3',
            events: []
        }
        this.setProps = this.setProps.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
        this.handlePlotChange = this.handlePlotChange.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    handleDataChange(event) {
        this.setState({value: event.target.value});
    }

    handlePlotChange(event) {
        let events = this.state.events;
        events.unshift(JSON.stringify(event));
        this.setState({events: events});
    }

    render() {
        const { value, events } = this.state;

        return (
            <div
                style={{
                    fontFamily: ["helvetica", "sans-serif"],
                    padding: 16,
                    background: "#F5F5F5"
                }}
            >
                <h1>react-oncoprint Demo</h1>
                <div
                    style={{
                        padding: 16,
                        marginBottom: 32,
                        background: "#FFFFFF"
                    }}
                >
                    <p>
                        Selected file: {`${value}.js`}
                    </p>
                    <select value={value} onChange={this.handleDataChange} style={{width: '100%'}}>
                        <option value="dataset1">Small dataset</option>
                        <option value="dataset2">Medium dataset</option>
                        <option value="dataset3">Large dataset</option>
                        <option value="cBioPortalData">CBioPortal Dataset</option>
                    </select>
                </div>
                <div style={{height: 500}}>
                    <OncoPrint
                        data={DATA[value]}
                        onChange={this.handlePlotChange}
                    />
                </div>
                <div
                    style={{
                        padding: 16,
                        marginTop: 32,
                        background: "#FFFFFF"
                    }}
                >
                    <p>
                        Events:
                    </p>
                    <textarea
                        style={{
                            width: '100%',
                            height: 200,
                            fontSize: '14px'
                        }}
                        value={events.join('\n')}
                    >
                    </textarea>
                </div>
            </div>
        );
    }
}
