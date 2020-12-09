import shortid from 'shortid'

const formatUser = (data) => {
  if (data.name && data.lastName) data.fullName = data.name + " " + data.lastName
  data.id = shortid.generate();
  return data
}

export default formatUser