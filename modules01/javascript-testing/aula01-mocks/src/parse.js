const parseUser = ({ id, name, profession, age }) => {
  return {
    id: parseInt(id),
    name,
    profession,
    age: parseInt(age)
  }
}

module.exports = {
  parseUser
}