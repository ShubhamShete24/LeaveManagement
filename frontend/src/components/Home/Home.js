import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginUserDetails } from '../../redux/actions/loginUserDetailsActions';

function Home() {
  const dispatch = useDispatch();
  dispatch(LoginUserDetails('Shubham'));
  return (
    <div>
      Home <Link to="/contact">Go to contact from here to preserve and access the stored data</Link>
    </div>
  );
}

export default Home;
