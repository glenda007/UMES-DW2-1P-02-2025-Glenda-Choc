import { responseSuccess, responseError } from '../helpers/response.helper.js';
import { getDb } from '../configs/mongodb.config.js';

const getClientesHandler = async (req, res) => {
  try{
    const db = getDb();
    const clientes = await db.collection('clientes').find().toArray();
    
    if (!clientes)
      return res.status(404).json(responseError("No se encontraron clientes"));

    const response = responseSuccess("Clientes obtenidos exitosamente",clientes);

    res.status(200).json(response);
  }catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor"
    });
  }
}

export { 
  getClientesHandler
};
