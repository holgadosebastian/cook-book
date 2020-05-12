import validate from './validate';

describe('validate', () => {
  describe('username', () => {
    it('returns error if it is empty', () => {
      const username = '';
      const error = validate('username', username);
      expect(typeof error).toBe('string');
    });

    it('returns error if it is less than 6 characters', () => {
      const username = 'four';
      const error = validate('username', username);
      expect(typeof error).toBe('string');
    });

    it('does not return error if it is longer than 5 characters', () => {
      const username = 'validusername';
      const error = validate('username', username);
      expect(error).toBe(null);
    });
  });

  describe('password', () => {
    it('returns error if it is empty', () => {
      const password = '';
      const error = validate('password', password);
      expect(typeof error).toBe('string');
    });

    it('returns error if it is less than 6 characters', () => {
      const password = 'four';
      const error = validate('password', password);
      expect(typeof error).toBe('string');
    });

    it('does not return error if it is longer than 5 characters', () => {
      const password = 'validpassword';
      const error = validate('password', password);
      expect(error).toBe(null);
    });
  });

  describe('password2', () => {
    it('returns error if passwords do not match', () => {
      const password = '123456';
      const password2 = '1234567';
      const error = validate('password2', password2, { password });
      expect(typeof error).toBe('string');
    });

    it('does not return error if passwords match', () => {
      const password = '1234567';
      const password2 = '1234567';
      const error = validate('password2', password2, { password });
      expect(error).toBe(null);
    });
  });

  describe('secret', () => {
    it('returns error if it is empty', () => {
      const secret = '';
      const error = validate('secret', secret);
      expect(typeof error).toBe('string');
    });

    it('does not return error if it is not empty', () => {
      const secret = 'validsecret';
      const error = validate('secret', secret);
      expect(error).toBe(null);
    });
  });

  describe('title', () => {
    it('returns error if it is empty', () => {
      const title = '';
      const error = validate('title', title);
      expect(typeof error).toBe('string');
    });

    it('does not return error if it is not empty', () => {
      const title = 'Valid Recipe Title';
      const error = validate('title', title);
      expect(error).toBe(null);
    });
  });

  describe('ingredients', () => {
    it('returns error if it is empty', () => {
      const ingredients = [];
      const error = validate('ingredients', ingredients);
      expect(typeof error).toBe('string');
    });

    it('does not return error if it is not empty', () => {
      const ingredients = [
        {
          id: 1,
          name: 'Ingredient'
        }
      ];
      const error = validate('ingredients', ingredients);
      expect(error).toBe(null);
    });
  });

  describe('instructions', () => {
    it('returns error if it is empty', () => {
      const instructions = '';
      const error = validate('instructions', instructions);
      expect(typeof error).toBe('string');
    });

    it('does not return error if username is it is not empty', () => {
      const instructions = 'validinstructions';
      const error = validate('instructions', instructions);
      expect(error).toBe(null);
    });
  });
});
