export default {
  getError(errors, propertyName) {
    try {
      const error = errors.errors.find((error) => error.path === propertyName);
      return error ? error.msg : "";
    } catch (err) {
      return "";
    }
  },
};
