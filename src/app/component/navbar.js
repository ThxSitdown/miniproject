'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Function to check login status
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
        };

        // Initial check
        checkLoginStatus();

        // Optional: Add event listener to detect localStorage changes
        window.addEventListener('storage', checkLoginStatus);

        // Clean up the event listener on component unmount
        return () => window.removeEventListener('storage', checkLoginStatus);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Navbar</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="/">Tem</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/about">Graph</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/service">Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
