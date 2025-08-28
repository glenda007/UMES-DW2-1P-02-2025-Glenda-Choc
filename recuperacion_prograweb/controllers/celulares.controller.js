import Joi from 'joi';
import celularesService from '../services/celulares.service.js';
import responseHelper from '../helpers/response.helper.js';

const celularSchema = Joi.object({
    nombreAlumno: Joi.string().required().messages({
        'string.empty': 'El nombre del alumno es obligatorio',
        'any.required': 'El nombre del alumno es obligatorio'
    }),
    pantalla: Joi.number().min(4).max(7).required().messages({
        'number.base': 'La pantalla debe ser un número',
        'number.min': 'La pantalla debe ser como mínimo 4',
        'number.max': 'La pantalla debe ser como máximo 7',
        'any.required': 'La pantalla es obligatoria'
    }),
    marca: Joi.string().min(2).required().messages({
        'string.empty': 'La marca es obligatoria',
        'string.min': 'La marca debe tener al menos 2 caracteres',
        'any.required': 'La marca es obligatoria'
    }),
    color: Joi.string().optional().allow('')
});

const celularesController = {
    getAll: async (req, res) => {
        try {
            const celulares = await celularesService.getAll();
            return responseHelper.success(res, celulares, 'Celulares obtenidos correctamente');
        } catch (error) {
            console.error('Error en getAll:', error);
            return responseHelper.error(res, 'Error al obtener los celulares');
        }
    },
    
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const celular = await celularesService.getById(id);
            
            if (!celular) {
                return responseHelper.error(res, 'Celular no encontrado', 404);
            }
            
            return responseHelper.success(res, celular, 'Celular obtenido correctamente');
        } catch (error) {
            console.error('Error en getById:', error);
            return responseHelper.error(res, 'Error al obtener el celular');
        }
    },
    
    create: async (req, res) => {
        try {
            const { error, value } = celularSchema.validate(req.body);
            
            if (error) {
                return responseHelper.validationError(res, error.details);
            }
            
            const exists = await celularesService.checkDuplicate(value.nombreAlumno);
            if (exists) {
                return responseHelper.conflict(res, 'Ya existe un celular registrado para este alumno');
            }
            
            const nuevoCelular = await celularesService.create(value);
            return responseHelper.success(res, nuevoCelular, 'Celular creado correctamente', 201);
        } catch (error) {

            console.error('Error en create:', error);
            return responseHelper.error(res, 'Error al crear el celular');
        }
    }
};

export default celularesController;