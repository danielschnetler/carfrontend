import React from 'react';
import {SERVER_URL} from '../constants.js';
import ReactTable from "react-table";
import 'react-table/react-table.css';
//import { ToastContainer, toast} from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import AddCar from './AddCar.js';
import {CSVLink} from 'react-csv';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar'


class Carlist extends React.Component {
    constructor(props){
        super(props);
        this.state={ cars: [], open: false, message: ''};
    }

    componentDidMount() {
        this.fetchCars();
    }

    fetchCars = () => {
        //Read the token from session storage and include it in the Authorization header
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars', {
            headers: {'Authorization' : token}
        })
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({cars : responseData._embedded.cars});
        })
        .catch(err => console.error(err));
    }

    confirmDelete = (link) => {
        confirmAlert({
            message: 'Are you sure you want to delete?',
            buttons: [{
                label: 'Yes', onClick: () => this.onDelClick(link)
            }, {
                label: 'No',
            }]
        })
    }

    onDelClick = (link) => {
        const token = sessionStorage.getItem("jwt");
        fetch(link, {
            method: 'DELETE',
            headers: {'Authorization' : token}
        })
        .then(res => {
            this.setState({ open: true, message: 'Car Deleted'});
            this.fetchCars();
        })
        .catch(err => {
            this.setState({ open: true, message: 'Error when deleting'}); 
            console.error(err);
        })
    }

    //Add new car
    addCar(car) {
        console.log(JSON.stringify(car));
        const token = sessionStorage.getItem("jwt");
        fetch(SERVER_URL + 'api/cars',
        {
            method: 'POST', 
            headers: { 
                'Content-Type' : 'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(car) 
        })
        .then(res => this.fetchCars())
        .catch(err => console.error(err));
        
    }

    //Update Car
    updateCar(car, link) {
        const token = sessionStorage.getItem("jwt");
        fetch(link,
        {   
            method: 'PUT',
            headers: { 
                'Content-Type' : 'application/json',
                'Authorization' : token
            },
            body: JSON.stringify(car)
        })
        .then(res => 
           this.setState( { open: true, message: 'Changes saved'})
        )
        .catch (err =>
            {
            this.setState({ open: true, message: 'Error when saving'});    
            console.error(err)}
        )
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style= {{ backgroundColor: "fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.cars];
                    data[cellInfo.index][cellInfo.column.id] = 
                        e.target.innerHTML;
                    this.setState({cars : data});
                }}
                dangerouslySetInnerHTML={{__html: this.state.cars[cellInfo.index][cellInfo.column.id]}}
            />
        );
    }

    handleClose = (event, reason) => {
        this.setState({ open: false });
    }
    render(){
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand',
                Cell: this.renderEditable
            }, {
                Header: 'Model',
                accessor: 'model',
                Cell: this.renderEditable
            }, {
                Header: 'Color',
                accessor: 'color',
                Cell: this.renderEditable
            }, {
                Header: 'Year',
                accessor: 'year',
                Cell: this.renderEditable
            }, {
                Header: 'Price',
                accessor: 'price',
                Cell: this.renderEditable
            }, {
                id: 'savebutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value, row}) => 
                    (<Button size="small" variant="text" color="primary" onClick={() => {
                        //console.log(value);
                        //console.log(row);
                        this.updateCar(row,value)}}>Save</Button>)
            }, {
                id: 'delbutton',
                sortable: false,
                filterable: false,
                width: 100,
                accessor: '_links.self.href',
                Cell: ({value}) => (<Button size="small" variant="text" onClick = {()=> {this.confirmDelete(value)}}>Delete</Button>)
            }]
        return(
            <div className="App">
               
                <Grid container>
                    <Grid item><AddCar addCar={this.addCar} fetchCars={this.fetchCars} /></Grid>
                    <Grid item><CSVLink data={this.state.cars} separator=";">Export</CSVLink></Grid>
                </Grid>        
                
                <ReactTable data={this.state.cars} columns={columns} filterable={true} pageSize={10}/>
                <Snackbar
                    style = {{width: 300, color: 'greem'}}
                    open={this.state.open} onClose={this.handleClose}
                    autoHideDuration={1500} message={this.state.message}
                />
            </div>
        );
    }
}

export default Carlist;