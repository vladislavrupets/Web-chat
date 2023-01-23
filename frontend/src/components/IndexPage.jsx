import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('Token');
        if (!token) {
            navigate('/login');
        }
        else {
            navigate('/chat');
        }
    }, [0]);

    return (
      <div></div>  
    );
}

export default IndexPage;