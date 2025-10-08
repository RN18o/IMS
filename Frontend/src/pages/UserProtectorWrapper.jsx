import React, {useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'

const UserProtectorWrapper = ({
    children
}) => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
         if(!token){
        navigate('/login');
    }
    },[navigate, token]);
  return (
    <>
    {children}
    </>
  )
}

export default UserProtectorWrapper;
