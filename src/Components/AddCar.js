import React from 'react';
import SkyLight from 'react-skylight';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AddCar extends React.Component {
    constructor(props){
        super(props);
        this.state = {brand: '', model: '', year: '', color: '', price: ''};        
    }
    //Save Car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var newCar = { brand: this.state.brand, model: this.state.model, color: this.state.color, year : this.state.year,
            price: this.state.price};
        this.props.addCar(newCar);
        this.refs.addDialog.hide();

    }
    //Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.refs.addDialog.hide();
        
    }

    handleOnChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render () {
        return (
            <div>                
                 <SkyLight hideOnOverlayClicked ref="addDialog" title="New Car">
                    <h1> New Car </h1>   
                        <TextField label="Brand" placeholder="Brand" name="brand" onChange={this.handleOnChange}/>
                        <TextField label="Model" placeholder="Model" name="model" onChange={this.handleOnChange}/>
                        <TextField label="Color" placeholder="Color" name="color" onChange={this.handleOnChange}/>
                        <TextField label="Year" placeholder="Year" name="year" onChange={this.handleOnChange}/>
                        <TextField label="Price" placeholder="Price" name="price" onChange={this.handleOnChange}/>
                        <Button variant="outlined" color="primary" onClick={this.handleSubmit}>Save</Button>
                        <Button variant="outlined" color="secondary" onClick={this.cancelSubmit}>Cancel</Button>
                </SkyLight>
                <div>
                    <Button variant="contained" color="primary" style={{'margin': '10px'}} onClick={() => 
                    this.refs.addDialog.show()}>New Car</Button>
                </div>
            </div>
        );
    }
}

export default AddCar;