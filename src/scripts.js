// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


import Dashboard from './dashBoard';
import Api from'./apiCalls';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import './images/AdobeStock_571093886.jpg'
import './images/login-button.png'
import './images/AdobeStock_wide.png'
import './images/AdobeStock_tall.png'
import './images/AdobeStock_430930840.png'

const api = new Api("http://localhost:3001/api/v1/");

api.getObj("trips")
console.log('This is the JavaScript entry file - your code begins here.');
