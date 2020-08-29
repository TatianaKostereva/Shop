const Debounce = (func) => {
  let debouncePromise = null;
  let debounceIds = [];

  return (ids) => {
    debounceIds = [...debounceIds, ids];
    if (!debouncePromise) {
      debouncePromise = new Promise((resolve) => {
        setTimeout(resolve, 100);
      }).then(() => {
        func(debounceIds);
        debouncePromise = null;
        debounceIds = [];
      });
    }
    return debouncePromise;
  };
};

export default Debounce;
