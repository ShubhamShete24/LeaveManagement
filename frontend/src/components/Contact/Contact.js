import React from 'react';
import config from '../../config';

function Contact() {
  fetch(`${config.API_URL}/api`)
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
    });
  return <h1>This is contact page. Check console to see api calls</h1>;
}

export default Contact;
