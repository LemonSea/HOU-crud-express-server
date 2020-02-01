
module.exports = (app) => {
  app.get('/test', (req, res) => {
    const data = {
      code: 20,
      message: 'Success',
      data: {
        name: 'test'
      }
    }
    res.status(200).json(data)
  })
}
