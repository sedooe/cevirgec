// @flow

export const CREATE_DICTIONARY = 'CREATE_DICTIONARY';
export const EDIT_DICTIONARY = 'EDIT_DICTIONARY';
export const DELETE_DICTIONARY = 'DELETE_DICTIONARY';
export const CHANGE_ACTIVENESS_OF_DICTIONARY = 'CHANGE_ACTIVENESS_OF_DICTIONARY';

export function createDictionary(dictionary) {
  return {
    type: CREATE_DICTIONARY,
    dictionary
  };
}

export function editDictionary(dictionary) {
  return {
    type: EDIT_DICTIONARY,
    dictionary
  };
}

export function deleteDictionary(dictionaryId) {
  return {
    type: DELETE_DICTIONARY,
    dictionaryId
  };
}

export function changeActivenessOfDictionary(dictionaryId) {
  return {
    type: CHANGE_ACTIVENESS_OF_DICTIONARY,
    dictionaryId
  }
}

export function incrementAsync(delay: number = 1000) {
  return (dispatch: Function) => {
    setTimeout(() => {
      dispatch(increment());
    }, delay);
  };
}
