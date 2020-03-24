import request from 'superagent';

// quotes inside ()/* maybe */
export const getQuote = () => 
  request.get('(https://ron-swanson-quotes.herokuapp.com/v2/quotes');
