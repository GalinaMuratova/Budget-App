import React, {useState} from 'react';
import NavBar from "../../components/NavBar/NavBar";
import AddTransaction from "../../components/AddTransaction/AddTransaction";

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return (
        <div>
          <NavBar onOpen={handleOpenModal} text={'transaction'}/>
            {isModalOpen && (
                <AddTransaction onClose={handleCloseModal}/>
            )}
        </div>
    );
};

export default Home;