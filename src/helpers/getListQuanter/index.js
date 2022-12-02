import moment from "moment";

const getQuarter = (d) => {
  const quan = Math.floor(moment(d).month() / 3) + 1;
  return `Q${quan}/${moment(d).year()}`;
};
export const getListQuanter = () => {
  const arr = [];
  [-1, 0, 1, 2, 3, 4, 5, 6].forEach((element, index) => {
    if (index === 0) {
      arr.push(moment(new Date()));
    } else {
      const month = moment(arr[element]).subtract(3, "months");
      arr.push(month);
    }
  });
  const newQuater = arr.map((element) => {
    return getQuarter(element);
  });
  return newQuater;
};
