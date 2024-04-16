import React, { useState } from 'react';
import './FeesCalculator.css';
import axios from 'axios';
export default function FeesCalculator() {
    const [formData, setFormData] = useState({
        month: '',
        date: '',
        checked: false,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.checked) {
            console.log(formData);
            try {
                const response = await axios.post("http://localhost:4500/formsubmit", formData);
                if (response.data.status === "ok") {
                    alert("Successfully added");
                    console.log("Successfully added");
                } else {
                    alert("Failed to add. Server returned an error.");
                    console.log("Failed to add. Server returned an error.");
                }
            } catch (error) {
                alert("Failed to add. An error occurred.");
                console.error("Failed to add. An error occurred:", error);
            }
        }
        else {
            alert("Please check the 'Check me out' checkbox to submit the form.");
        }
    }
    

    return (
        <div className='container-fluid'>
            <form onSubmit={handleSubmit}>
                <div className='containerBox mt-4'>
                    <div className='row'>
                        <div className='col-lg-4 md-4 sm-12'>
                            <div className="mb-3">
                                <label htmlFor="month" className="form-label">Month</label>
                                <input
                                    type="month"
                                    className="form-control"
                                    id="month"
                                    aria-describedby="emailHelp"
                                    name="month"
                                    onChange={handleChange}
                                    value={formData.month}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-4 md-4 sm-12'>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name='date'
                                    onChange={handleChange}
                                    value={formData.date}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-4 md-4 sm-12'>
                            <div className="mb-3 form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    name="checked"
                                    onChange={handleChange}
                                    checked={formData.checked}
                                />
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-lg-4 md-4 sm-12'>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
