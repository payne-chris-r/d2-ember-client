import Ember from 'ember';

export function range(values) {
  let start = values[0];
  let end = values[1];

  let ret = [];
  for(let i = start; i < end; i++) {
    ret.push(i);
  }
  return ret;
}

export default Ember.Helper.helper(range);
