
module.exports = (app) => {
  app.get('/user', (req, res) => {
    const data = {
      code: 20,
      message: 'Success',
      data: {
        name: 'user'
      }
    }
    res.status(200).json(data)
  })
}
