import React from 'react';
import {Link} from "react-router-dom";

interface Props {
    onOpen: () => void;
    text: string
}

const NavBar:React.FC<Props> = ({onOpen, text}) => {
    return (
        <header className='bg-body-tertiary' >
            <div className='container'>
                <nav className="navbar">
                    <div className="container-fluid">
                        <Link className="navbar-brand mb-0 h1" to='/'>Home</Link>
                        <div>
                            <Link className="navbar-brand" to='/categories'>Categories</Link>
                            <button onClick={onOpen} className='btn btn-primary mx-5'>Add {text}</button>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;