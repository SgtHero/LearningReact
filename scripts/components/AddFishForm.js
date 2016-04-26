/**
 * Created by christianschulz1 on 26.04.16.
 */

import React from 'react';


var AddFishForm = React.createClass({
    createFish: function (e) {
        e.preventDefault();
        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.desc.value,
            image: this.refs.image.value
        };
        this.props.addFish(fish);
        this.refs.fishForm.reset();
    },
    render: function () {
        return (
            <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
                <input type="text" ref="name" placeholder="Fishname"/>
                <input type="text" ref="price" placeholder="Preis"/>
                <select ref="status">
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" ref="desc" placeholder="Desc"></textarea>
                <input type="text" ref="image" placeholder="Place URL for Image"/>
                <button type="submit">+ Add Item</button>
            </form>
        )
    }
});

export default AddFishForm;