import shortid from 'shortid'
import dayjs from 'dayjs';

const formatUser = (data) => {
  if (data.name && data.lastName) data.fullName = data.name + " " + data.lastName
  data.id = shortid.generate();
  return data
}

const handleInning = (inning) => {
  if (!inning) return {
    date: {
      day: dayjs().format('DD'),
      month: dayjs().format('MM'),
      year: dayjs().format('YYYY'),
    },
    start: dayjs().format('hh:mm:ss'),
    end: null,
    state: true,
    details: ''
  }
  inning.end = dayjs().format('hh:mm:ss');
  inning.state = false;
  return inning;
}

const  updateObject = (target, src) => {
  const res = {};
  Object.keys(target)
        .forEach(k => res[k] = (src[k] ?? target[k]));
  return res;
}

export { 
  formatUser ,
  updateObject,
  handleInning
}