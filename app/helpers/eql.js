import Ember from 'ember';

export function eql(params) {
  console.log("params is ", params);
  if(params[0] === parseInt(params[1])){
    return true;
  }
  else{
    return false;
  }
}

export default Ember.Helper.helper(eql);
