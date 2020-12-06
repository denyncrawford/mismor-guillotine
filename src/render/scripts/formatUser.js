import shortid from 'shortid'

const formatUser = (data) => {
  data.id = shortid.generate();
  return data
}

export default formatUser