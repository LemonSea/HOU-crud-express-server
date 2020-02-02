const IUser =  {
  _id: string,
  name: string,
  email: string,
  password: string,
  salt: string,
}

const IUserInputDTO = {
  name: string,
  email: string,
  password: string
}

module.exports = {
  IUser,
  IUserInputDTO
}