import { useState } from 'react';

function HomeGuest({prop}){

    const[username,setUsername] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

    return(<>
     <div className="row mt-3">
        <div className="col-lg-6">
            <h1>Remember Writing?</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque at officia accusamus eligendi, mollitia totam omnis maxime laudantium quisquam molestias cum asperiores iusto quasi ipsa voluptate impedit velit esse. Maxime?</p>
        </div>
        <div className="col-lg-6">
            <h2>Registration Form</h2>
            <form onSubmit={prop}>
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
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    </div></>)
}

export default HomeGuest;