
const handleError = (err,req,res,next) => {
  if (err.message == 'Item not found') {
    return res.status(404).json({ message : err.message })
  }
  else
  {
    return res.status(500).json({message : err.message})
  }
}

module.exports = handleError