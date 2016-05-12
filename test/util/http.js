import expect from 'expect';

import {camelizeProps} from '../../src/util/http.js';

describe('camelizeProps', () => {
  it('should remove underscores and capitalize letters following them', () => {
    const underscored = {
      'a_b': 1
    };
    const camelized = {
      aB: 1
    };
    expect(camelizeProps(underscored)).toEqual(camelized);
  });

  it('should preserve single word keys', () => {
    const orig = {
      'a': 1,
      'a_b': 2
    };
    const camelized = {
      a: 1,
      aB: 2
    };
    expect(camelizeProps(orig)).toEqual(camelized);
  });

  it('should work for any delimiter', () => {
    const orig = {
      'a-b': 1
    };
    const camelized = {
      aB: 1
    };
    expect(camelizeProps(orig, "-")).toEqual(camelized);
  });

  it('should work for nested objects', () => {
    const orig = {
      'a_b': {
        'b_c': {
          'c_d': 1
        }
      }
    };
    const camelized = {
      aB: {
        bC: {
          cD: 1
        }
      }
    };
    expect(camelizeProps(orig)).toEqual(camelized);
  });
});
