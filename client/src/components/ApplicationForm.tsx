import React, { useState } from 'react';
import { createApplication } from '../api';
import { useUtmParams } from '../hooks/useUtmParams';
import { ApplicationPayload, Opportunity } from '../types';

// Definimos los props que el componente recibirá
interface ApplicationFormProps {
  opportunities: Opportunity[];
}

export default function ApplicationForm({ opportunities }: ApplicationFormProps) {
  // Estado para manejar los datos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    opportunityId: '', // Selecciona la primera oportunidad por defecto
  });
  
  // Estado para manejar el proceso de envío
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  // Hook personalizado para obtener los parámetros UTM de la URL
  const utmParams = useUtmParams();

  // Manejador para actualizar el estado cuando el usuario escribe
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Manejador para el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.opportunityId) {
        alert('Por favor, selecciona una oportunidad.');
        return;
    }

    setStatus('loading');
    setError(null);

    const payload: ApplicationPayload = {
      ...formData,
      opportunityId: parseInt(formData.opportunityId, 10),
      ...utmParams, // Captura y envío de parámetros UTM desde la URL. 
    };

    try {
        console.log('Enviando datos de postulación:', payload); // Para depuración
      // Llamada a la API para crear la postulación
      await createApplication(payload); // Este endpoint crea una postulación. 
      setStatus('success');
      // Opcional: limpiar el formulario tras el éxito
      setFormData({ name: '', email: '', message: '', opportunityId: opportunities[0]?.id.toString() || '' });
    } catch (err: any) {
      setStatus('error');
      setError(err.response?.data?.message || 'Ocurrió un error al enviar tu postulación.');
    }
  };
  
  // Si el envío fue exitoso, mostramos un mensaje de agradecimiento
  if (status === 'success') {
    return (
      <div className="p-6 text-center bg-green-100 border-l-4 border-green-500 rounded-lg">
        <h3 className="text-xl font-bold text-green-800">¡Gracias por postular!</h3>
        <p className="text-green-700 mt-2">Hemos recibido tu información y nos pondremos en contacto pronto.</p>
        <button onClick={() => setStatus('idle')} className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Hacer otra postulación
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 border rounded-lg shadow-md">
      {/* Campo de Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
        <input
          type="text"
          name="name"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Campo de Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      {/* Selector de Oportunidad */}
      <div>
        <label htmlFor="opportunityId" className="block text-sm font-medium text-gray-700">Oportunidad Seleccionada</label>
        <select
          name="opportunityId"
          id="opportunityId"
          value={formData.opportunityId}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="" disabled>-- Seleccione una oportunidad --</option>
          {opportunities.length > 0 ? (
            opportunities.map(op => (
              <option key={op.id} value={op.id}>{op.title}</option>
            ))
          ) : (
            <option disabled>No hay oportunidades disponibles</option>
          )}
        </select>
      </div>

      {/* Campo de Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje (Opcional)</label>
        <textarea
          name="message"
          id="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      {/* Botón de envío y mensaje de error */}
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300"
        >
          {status === 'loading' ? 'Enviando...' : 'Postular ahora'}
        </button>
        {status === 'error' && <p className="mt-2 text-sm text-center text-red-600">{error}</p>}
      </div>
    </form>
  );
}