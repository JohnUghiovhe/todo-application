function errorHandler(err, req, res, next) {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  res.status(500).render('error', { error: err });
}

module.exports = errorHandler;
