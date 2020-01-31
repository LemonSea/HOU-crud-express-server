
module.exports = (app) => {
  app.get('/admin', (req, res) => {
    const data = {
      code: 20,
      message: 'Success',
      data: {
        name: 'admin'
      }
    }
    res.status(200).json(data)
  })
}
