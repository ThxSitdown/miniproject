'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:3001/api/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await res.json();

            if (result.token) {
                localStorage.setItem('token', result.token);

                // Dispatch custom event to notify other parts of the application
                window.dispatchEvent(new Event('storage'));

                router.push('/');
            } else {
                setError('Login failed: Invalid credentials');
            }
        } catch (error) {
            setError(`Login failed: ${error.message}`);
        }
    };

    return (
        <>
        <br /><br /><br />
        <div className="container">
        <div className="card">
            <div className="card-header bg-success text-white">
                Login Form
            </div>
            <div className="card-body">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label htmlFor="basic-url" className="form-label">Username</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon3"><i className="bi bi-person-vcard"></i></span>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="basic-url" className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon3"><i className="bi bi-person-vcard-fill"></i></span>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassWord(e.target.value)} required />
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-success"><i className="bi bi-box-arrow-in-right"></i> Login</button>
                    </div>
                    {error && (
                        <div className="col-12 mt-3">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
        </div>
        </>
    );
}
