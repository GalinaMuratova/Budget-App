import React from 'react';
import NavBar from "../../components/NavBar/NavBar";

const Categories = () => {
    return (
        <div>
            <NavBar onOpen={() => console.log('eeee')} text={'category'}/>
        </div>
    );
};

export default Categories;