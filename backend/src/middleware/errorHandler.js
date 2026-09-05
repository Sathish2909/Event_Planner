
function errorHandler(err, req, res, next) { 
  console.error(err);

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(' ');
    return res.status(400).json({ success: false, message });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: `Invalid id: ${err.value}` });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Something went wrong on the server.'
  });
}

module.exports = errorHandler;
