import CotizacionService from "../Servicio/CotizacionService";
import { v4 } from "uuid";

const cotizacionService = new CotizacionService();

class CotizacionController {
    static async calcularCotizacion(event: { body: string }): Promise<{ statusCode: number; body: string }> {
        try {
            const { edad, genero, plan, tipoSeguro } = JSON.parse(event.body).payload;
            const id = v4();

            // validando datos
            if (
                typeof edad !== 'number' ||
                !['M', 'F'].includes(genero) ||
                !['HIJOS', 'PADRES'].includes(plan) ||
                typeof tipoSeguro !== 'string'
            ) {
                throw new Error('Datos inválidos en la solicitud');
            }

            // Crear el objeto Payload antes de mandarlo a cotizaar
            const payload = { edad, genero, plan, tipoSeguro, id };

            // Llamamos el metodo CalcularCotizacion que espera un objeto payload
            console.log("Llamando al servicio con el siguiente payload:", payload);
            const result = await cotizacionService.calcularCotizacion(payload);

            // Retornamos respuesta exitosa y se muestran los datos ingresados a la bd dynamo
            return {
                statusCode: 200,
                body: JSON.stringify({
                    status: 200,
                    message: 'Cotización calculada correctamente',
                    data: result,
                }),
            };
        } catch (error) {

            return {
                statusCode: 400,
                body: JSON.stringify({
                    status: 400,
                    message: 'Error desconocido',
                }),
            };
        }
    }
}

export default CotizacionController;
