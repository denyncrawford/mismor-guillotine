import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRETUVWXYZ', 10)
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'

dayjs.extend(duration)
dayjs.extend(customParseFormat)

const formatUser = (data) => {
  if (data.name && data.lastName) data.fullName = data.name + " " + data.lastName
  data.id = nanoid();
  return data
}

const handleInning = (owner, inning) => {
  if (!inning) return {
    owner,
    date: {
      day: dayjs().format('DD'),
      month: dayjs().format('MM'),
      year: dayjs().format('YYYY'),
    },
    dateString: dayjs().format('DD/MM/YYYY') ,
    start: dayjs().format('hh:mm:ss A'),
    end: null,
    totalTime: 0,
    state: true,
    details: '',
    id: nanoid()
  }
  inning.end = dayjs().format('hh:mm:ss A');
  const date1 = dayjs(inning.start, 'hh:mm:ss A')
  const date2 = dayjs(inning.end, 'hh:mm:ss A')
  inning.totalTime = Math.abs(date1.diff(date2, 'hours', true)).toFixed(2);
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