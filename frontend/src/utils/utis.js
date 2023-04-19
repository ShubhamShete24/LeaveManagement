export const setLocalStorageItem = (key, val) => localStorage.setItem(key, val);

export const setSessionStorageItem = (key, val) => sessionStorage.setItem(key, val);

export const clearLocalStorage = () => localStorage.clear();

export const clearSessionStorage = () => sessionStorage.clear();

export const hardReload = () => window.location.reload(true);
