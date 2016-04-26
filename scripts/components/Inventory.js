/**
 * Created by christianschulz1 on 26.04.16.
 */

import React from 'react';

import AddFishForm from './AddFishForm';


var Inventory = React.createClass({
    renderInventory: function (key) {
        var linkState = this.props.linkState;
        return (
            <div className="fish-edit" key={key}>
                <input type="text" valueLink={linkState('fishes.'+ key +'.name')}/>
                <input type="text" valueLink={linkState('fishes.'+ key +'.price')}/>
                <select valueLink={linkState('fishes.' + key + '.status')}>
                    <option value="unavailable">Ausverkauft</option>
                    <option value="available">Frischer Fisch!</option>
                </select>
                <textarea valueLink={linkState('fishes.' + key + '.desc')}></textarea>
                <input type="text" valueLink={linkState('fishes.' + key + '.image')}/>
                <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
            </div>
        )
    },
    render: function () {
        return (
            <div>
                <h2>Inventory</h2>
                {Object.keys(this.props.fishes).map(this.renderInventory)}
                <AddFishForm {...this.props}></AddFishForm>
                <button onClick={this.props.loadSamples}>Load Sampledata</button>
            </div>
        )
    },
    propTypes: {
        linkState: React.PropTypes.func.isRequired,
        addFish: React.PropTypes.func.isRequired,
        removeFish: React.PropTypes.func.isRequired,
        fishes: React.PropTypes.object.isRequired,
        loadSamples: React.PropTypes.func.isRequired
    }
});

export default Inventory;