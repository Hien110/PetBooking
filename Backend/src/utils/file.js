const getNameFromFullName = (fullName) => {
  const namearr = fullName.split(".");
  namearr.pop();
  return namearr.join("");
};

module.exports = {
  getNameFromFullName,
};
