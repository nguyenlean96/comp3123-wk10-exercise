import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const log = whatever => console.log(whatever);

const INITIAL_VALUE = {
    form: {
        email: "",
        fname: "",
        address_1: "",
        address_2: "",
        city: "",
        province: "",
        post_code: "",
        agreement: false
    },
    view: {},
    records: []
};
const PLACEHOLDER_VALUES = {
    email: "lean@mail.com",
    fname: "Le An",
    address_1: "223 Lake Shore Blvd W.",
    address_2: "East Tower, Suite 100",
    city: "Toronto",
    province: "Ontario",
    post_code: "M5E 1B5",
    agreement: true
}
export default class FormEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {...PLACEHOLDER_VALUES},
            view: {},
            records: [],
            show: false,
            setShow: false
        };
        
        this.provinces = ["Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Manitoba", "British Columbia", "Prince Edward Island", "Saskatchewan", "Alberta", "Newfoundland and Labrador", "Northwest Territories", "Nunavut", "Yukon"];
        this.provinces.sort();
    }
    handleClose = () => this.setState({show: false});
    handleShow = event => {
        event.preventDefault();
        let id = event.target.value;
        this.setState({view: this.state.records[id]});
        this.setState({show: true});
    }

    onClearForm = event => {
        event.preventDefault();
        this.setState({form: INITIAL_VALUE.form});
    }

    onSubmitForm = event => {
        event.preventDefault();
        let values=event.target.form;
        let savedRecords = this.state.records;
        savedRecords.push({
            email: values[0].value,
            fname: values[1].value,
            address_1: values[2].value,
            address_2: values[3].value,
            city: values[4].value,
            province: values[5].value,
            post_code: values[6].value,
            agreement: values[7].value
        });
        this.setState({records: savedRecords});
        log("Form submitted by " + JSON.stringify({
            email: values[0].value,
            fname: values[1].value
        }));
        log(this.state);
    }
    onViewInvoke = event => {
        event.preventDefault();
        log(event.target.value);
        let id = event.target.value;
        this.setState({view: {id: id,
            data: this.state.records[id]}});
    }
    onValueChanged = event => {
        event.preventDefault();
        if (event.target.name === "agreement") {
            let current_state=this.state.form.agreement;
            this.setState(
                {
                    form: {
                        [event.target.name]: !(current_state)
                    }
                }
            );
        } else {
            this.setState({form: {[event.target.name]: event.target.value}})
        }
    }
    
    render() {
        return (
            <>
                <div className='text-center mt-3 mb-0'>
                    <h2>Data Entry Form</h2>
                </div>
                <div className='bg-white shadow rounded p-4 m-5'>
                    <form>
                        <div className='row'>
                            <div className="form-floating mb-3 col-md-6">
                                <input value={this.state.form.email}
                                onChange={e => this.onValueChanged(e)} 
                                type="email" className="form-control" id="email_input" placeholder="name@example.com" name="email" />
                                <label htmlFor="email_input">Email address</label>
                            </div>
                            <div className="form-floating mb-3 col-md-6">
                                <input type="text" value={this.state.form.fname} onChange={e => this.onValueChanged(e)} className="form-control" id="fulllname_input" placeholder="Full Name" name="fname" />
                                <label htmlFor="fulllname_input">Full Name</label>
                            </div>
                        </div>
                        <div>
                            <div className="form-floating mb-3 col-12">
                                <input type="text" value={this.state.form.address_1} onChange={e => this.onValueChanged(e)} className="form-control" id="address_1_input" placeholder="Address" name="address_1" />
                                <label htmlFor="address_1_input">Address</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-floating mb-3 col-12">
                                <input type="text" value={this.state.form.address_2} onChange={e => this.onValueChanged(e)} className="form-control" id="address_2" placeholder="Apt. or Suit (Opt.)" name="address_2" />
                                <label htmlFor="address_2_input">Apt. or Suit {'('}Opt.{')'}</label>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-floating mb-3 col-md-4">
                                <input type="text" value={this.state.form.city} onChange={e => this.onValueChanged(e)} className="form-control" id="city_input" placeholder="City" name="city" />
                                <label htmlFor="city_input">City</label>
                            </div>
                            <div className="form-floating col-md-4">
                                <select 
                                    className='form-select'     
                                    id="province_input" 
                                    name='province' 
                                    aria-label="Floating label select example" value={this.state.form.province}
                                    onChange={this.onValueChanged}
                                >
                                    { 
                                        this.provinces.map((prov, index) => (
                                            <option key={index} value={prov}>{prov}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="province_input">Province</label>
                            </div>
                            <div className="form-floating mb-3 col-md-4">
                                <input type="text" value={this.state.form.post_code} onChange={e => this.onValueChanged(e)} className="form-control" id="postcode_input" placeholder="Postal Code" name="post_code" />
                                <label htmlFor="postcode_input">Postal Code</label>
                            </div>
                        </div>
                        <div>
                            <div className='form-check'>
                                <input className='form-check-input' type="checkbox" onChange={e => this.onValueChanged(e)} name="agreement" checked={this.state.form.agreement} id="agreed_check" />
                                <label class="form-check-label" htmlFor="agreed_check">
                                <a>Agree Terms and Condition</a>
                                </label>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button onClick={e => this.onSubmitForm(e)} className='btn btn-primary me-2 col-3' type="submit">Submit</button>
                            <button onClick={this.onClearForm} className='btn btn-secondary col-2' type="reset">Clear</button>
                        </div>
                    </form>
                </div>
                <div className='d-flex justify-content-center'>
                    {this.state.records.length == 0 ? '' : 
                        <table className='mt-2 table w-75 bg-white shadow p-3'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Email</th>
                                    <th>Fullname</th>
                                    <th>City</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.records.map((record, index) => (
                                    <tr key={index}>
                                        <th>{index}</th>
                                        <td>{record.email}</td>
                                        <td>{record.fname}</td>
                                        <td>{record.city}</td>
                                        <td>
                                            <Button value={index} variant="primary" onClick={e => this.handleShow(e)}>View</Button>
                                        </td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    }
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Information</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6'>
                                    <h4>Email:</h4>
                                </div>
                                <div className='col-6'>
                                    <h4>{this.state.view.email}</h4>
                                </div>

                                <div className='col-6'>
                                    <h4>Fullname:</h4>
                                </div>
                                <div className='col-6'>
                                    <h4>{this.state.view.fname}</h4>
                                </div>
                                
                                <div className='col-6'>
                                    <h4>Address:</h4>
                                </div>
                                <div className='col-6'>
                                    <h4>{this.state.view.address_1 + ' - ' + this.state.view.address_2}</h4>
                                </div>
                                
                                <div className='col-6'>
                                    <h4>City:</h4>
                                </div>
                                <div className='col-6'>
                                    <h4>{this.state.view.city}</h4>
                                </div>
                                
                                <div className='col-6'>
                                    <h4>Province:</h4>
                                </div>
                                <div className='col-6'>{this.state.view.province}</div>
                                
                                <div className='col-6'>
                                    <h4>Postal Code:</h4>
                                </div>
                                <div className='col-6'>{this.state.view.post_code}</div>
                            </div>
                        </div>
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
