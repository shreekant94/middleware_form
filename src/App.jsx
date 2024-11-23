import './App.css'
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [response, setResponse] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://middleware-swart.vercel.app/submit', formData);
            setResponse(res.data);
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    return (
        <div>
            <h1>Form Submission</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                ></textarea>
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div style={{textAlign:'center'}}>
                    <h2>Response from Server:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
