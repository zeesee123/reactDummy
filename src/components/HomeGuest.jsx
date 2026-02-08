import { useState } from 'react';
import Page from './Page';
import axios from 'axios';
import Swal from 'sweetalert2';

function HomeGuest({ onSubmit }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function handleRegister(e) {
        e.preventDefault();
        axios
            .post('http://localhost:3000/api/auth/register', { username, email, password, confirmPassword })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Registered!',
                    text: res.data.message || 'You can now log in.',
                });
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
            })
            .catch((err) => {
                const message = err.response?.data?.message || err.message || 'Registration failed';
                alert(message);
            });
    }
    return (
        <Page row title="Random App">
            <div className="col-lg-6">
            <h1>Remember Writing?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at officia accusamus eligendi, mollitia totam omnis maxime laudantium quisquam molestias cum asperiores iusto quasi ipsa voluptate impedit velit esse. Maxime?</p>
        </div>
        <div className="col-lg-6">
            <h2>Registration Form</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword((p) => !p)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                        </button>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className="form-control"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                            <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
        </Page>
    );
}

export default HomeGuest;