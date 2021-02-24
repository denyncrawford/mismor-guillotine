import shortid from 'shortid'
import dayjs from 'dayjs';

const formatUser = (data) => {
  if (data.name && data.lastName) data.fullName = data.name + " " + data.lastName
  data.id = shortid.generate();
  data.innings = []
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
    state: true
  }
  inning.end = dayjs().format('hh:mm:ss');
  inning.state = false;
  return inning;
}

export { 
  formatUser ,
  handleInning
}