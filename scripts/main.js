var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');

var App = React.createClass({
    getInitialState: function () {
        return {
            fishes: {},
            order: {}
        }
    },
    addFish: function (fish) {
        var timeStamp = (new Date()).getTime();
        this.state.fishes['fish-' + timeStamp] = fish;
        this.setState({fishes : this.state.fishes});
    },
    loadSamples: function () {
        this.setState({
            fishes: require('./sample-fishes')
        });
    },
    renderFish: function (key) {
        return <Fish key={key} index={key} details={this.state.fishes[key]}></Fish>
    },
    render: function () {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market">
                        <ul className="list-of-fishes">
                            {Object.keys(this.state.fishes).map(this.renderFish)}
                        </ul>
                    </Header>
                </div>
                <Order>

                </Order>
                <Inventory addFish={this.addFish} loadSamples={this.loadSamples}>

                </Inventory>
            </div>
        )
    }
});

var Fish = React.createClass({
    render: function () {
        return (
            <li>{this.props.index}</li>
        )
    }
});

var AddFishForm = React.createClass({
    createFish: function (e) {
        e.preventDefault();
        var fish = {
            name: this.refs.name.value,
            price: this.refs.price.value,
            status: this.refs.status.value,
            desc: this.refs.desc.value,
            image: this.refs.image.value,
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
})

var Header = React.createClass({
    render: function () {
        return (
            <header className="top">
                <h1>Catch
                    <span className="ofThe">
                        <span className="of">of</span>
                        <span className="the">the</span>
                    </span>
                    Day</h1>
                <h3 className="tagline">{this.props.tagline}</h3>
            </header>
        )
    }
});

var Order = React.createClass({
    render: function () {
        return (
            <p>Order</p>
        )
    }
});

var Inventory = React.createClass({
    render: function () {
        return (
            <div>
                <h2>Inventory</h2>
                <AddFishForm {...this.props}></AddFishForm>
                <button onClick={this.props.loadSamples}>Load Sampledata</button>
            </div>
        )
    }
});

var StorePicker = React.createClass({
    mixins: [History],
    goToStore: function (e) {
        e.preventDefault();
        var storeId = this.refs.storeId.value;
        this.history.pushState(null, '/store/' + storeId);
    },
    render: function() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Enter a Store</h2>
                <input type="text" ref="storeId" defaultValue={h.getFunName()} required/>
                <input type="submit"/>
            </form>
        )
    }
});

var NotFound = React.createClass({
    render: function () {
        return <h1>Not Found!</h1>
    }
});

// Routes

var routes = (
    <Router history={createBrowserHistory()}>
        <Route path="/" component={StorePicker}></Route>
        <Route path="/store/:storeId" component={App}></Route>
        <Route path="*" component={NotFound}></Route>
    </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
