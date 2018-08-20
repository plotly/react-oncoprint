import React, {Component} from 'react';
import {OncoPrint} from '../lib';

import dataset1 from './data/dataset-1';
import dataset2 from './data/dataset-2';
import dataset3 from './data/dataset-3';
import cBioPortalData from './data/cbioportal-data';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 'dataset3'
        }
        this.setProps = this.setProps.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const { value } = this.state;

        const datasets = {
            dataset1,
            dataset2,
            dataset3,
            cBioPortalData
        };

        return (
            <div
                style={{
                    fontFamily: ["helvetica", "sans-serif"],
                    padding: 16,
                    background: "#F5F5F5"
                }}
            >
                <h1>dash-oncoprint Demo</h1>
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
                    <select value={value} onChange={this.handleChange} style={{width: '100%'}}>
                        <option value="dataset1">Small dataset</option>
                        <option value="dataset2">Medium dataset</option>
                        <option value="dataset3">Large dataset</option>
                        <option value="cBioPortalData">CBioPortal Dataset</option>
                    </select>
                </div>
                <OncoPrint
                    data = {datasets[value]}
                />
            </div>
        );
    }
}
