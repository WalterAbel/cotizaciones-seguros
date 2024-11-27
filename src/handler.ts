import CotizacionController from './Controlador/CotizacionController';

export const calcular = async (event: { body: string }): Promise<{ statusCode: number; body: string }> => {
    return await CotizacionController.calcularCotizacion(event);
};
