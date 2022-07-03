const arr = Array.from(Array(50).keys()).map((val, idx) => {
  const arrObj = {};
  Array.from(Array(50).keys()).forEach((element, index) => {
    arrObj[`quarter_${index}`] = Math.floor(Math.random() * 10) + 1;
  });
  return {
    ...arrObj,
    key: `${idx}`,
  };
});
const dataTable = arr;

export default dataTable;
