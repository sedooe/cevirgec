// @flow
import * as actions from './constants'

export const createDictionary = (dictionary: Object) => ({
  type: actions.CREATE_DICTIONARY,
  dictionary
})

export const editDictionary = (dictionary: Object) => ({
  type: actions.EDIT_DICTIONARY,
  dictionary
})

export const deleteDictionary = (dictionaryId: number) => ({
  type: actions.DELETE_DICTIONARY,
  dictionaryId
})

export const changeActivenessOfDictionary = (dictionaryId: number) => ({
  type: actions.CHANGE_ACTIVENESS_OF_DICTIONARY,
  dictionaryId
})

// export function incrementAsync(delay: number = 1000) {
//   return (dispatch: Function) => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
