import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError]= useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile=async ()=>{
   
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }
 try{
    const response=await fetch('https://drawing-board-1.onrender.com/users/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    const data=await response.json();
    if(response.ok){
        setProfile(data.user);
    }
    else{
        setError(data.message || 'Failed to fetch profile');
        navigate('/login');
    }
} catch(err ) {
      setError('An error occured while fetching the profile');
      navigate('/login');
    }

};  

fetchProfile();
  }, [navigate]);
  
  if(error){
    return <p style={{color: 'red', textAlign:'center'}}>{error}</p>;
  }

  if(!profile){
    return <p style={{textAlign: 'center'}}>Loading...</p>;
  }

  return (
       <div style={{textAlign: 'center', marginTop: '50px'}}>
        
        <h1 >Hello ,{profile.name}</h1>

       </div>
  );
}

export default Profile;
