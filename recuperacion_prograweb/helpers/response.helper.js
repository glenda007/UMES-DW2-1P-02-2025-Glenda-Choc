export default {
    success: (res, data, message = 'Operación exitosa', statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    },
    error: (res, message = 'Error interno del servidor', statusCode = 500, details = null) => {
        const response = { success: false, message };
        if (details) response.details = details;
        return res.status(statusCode).json(response);
    },
    validationError: (res, details) => {
        return res.status(400).json({
            success: false,
            message: 'Error de validación',
            details
        });
    },
    conflict: (res, message = 'Conflicto', details = null) => {
        const response = { success: false, message };
        if (details) response.details = details;
        return res.status(409).json(response);
    }
};