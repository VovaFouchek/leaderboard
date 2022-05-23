export const storageService = () => {
  return {
    setData: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    getData: key => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (e) {
        return e;
      }
    },
    removeData: key => localStorage.removeItem(key),
  };
};
