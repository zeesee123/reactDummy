import { Link } from 'react-router-dom';
function Footer(){

    return(<>
    <hr />
    <footer>
        <div className="d-flex justify-content-between py-3">
            <div></div>
            <div>
               
                <Link to="/">Home</Link>&nbsp;
            <span>|</span>&nbsp;
            <Link to="/about-us">About</Link>&nbsp;
            <span>|</span>&nbsp;
            <Link to="/terms">Terms</Link>
            </div>
            <div></div>
       </div>
       <div className="d-flex justify-content-center">
        <p>
            <small className="not-format">
               &copy; {new Date().getFullYear()} RandomApp. All rights reserved.
            </small>
        </p>
       </div>
    </footer>
    </>);

}

export default Footer;