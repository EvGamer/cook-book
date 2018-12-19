export const STORAGE_SAVE = 'STORAGE_SAVE';
export const STORAGE_SAVE_SUCCESS = 'STORAGE_SAVE_SUCCESS';
export const STORAGE_SAVE_FAILURE = 'STORAGE_SAVE_FAILURE';

export function storageSave() {
  return {
    type: STORAGE_SAVE,
  };
}

export function storageSaveSuccess() {
  return {
    type: STORAGE_SAVE_SUCCESS,
  };
}

export function storageSaveFailure(error) {
  return {
    type: STORAGE_SAVE_FAILURE,
    error,
  };
}

export const STORAGE_LOAD = 'STORAGE_LOAD';
export const STORAGE_LOAD_SUCCESS = 'STORAGE_LOAD_SUCCESS';
export const STORAGE_LOAD_FAILURE = 'STORAGE_LOAD_FAILURE';

export function storageLoad() {
  return {
    type: STORAGE_LOAD,
  };
}

export function storageLoadSuccess(payload) {
  return {
    type: STORAGE_LOAD_SUCCESS,
    payload,
  };
}

export function storageLoadFailure(error) {
  return {
    type: STORAGE_LOAD_FAILURE,
    error,
  };
}

