// errorHandler.js
// errorHandler.js
export const errorHandler = (err, req, res, next) => {
    // Asegúrate de que 'res' esté definido y tiene el método 'status'
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

