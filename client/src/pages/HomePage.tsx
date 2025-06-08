import { useEffect, useState } from 'react';
import { getOpportunities } from '../api';
import { Opportunity } from '../types';
import ApplicationForm from '../components/ApplicationForm';
// Importa tus componentes de formulario y tarjeta aquí

export default function HomePage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await getOpportunities();
        setOpportunities(response.data);
      } catch (err) {
        setError('No se pudieron cargar las oportunidades.');
      } finally {
        setLoading(false);
      }
    };
    fetchOpportunities();
  }, []);

  if (loading) return <p>Cargando oportunidades...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Oportunidades Disponibles</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <section id="opportunity-list">
          {opportunities.map(op => (
            <div key={op.id} className="border p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold">{op.title}</h2> {/*  */}
              <p className="text-gray-600">{op.shortDescription}</p> {/*  */}
              <p className="text-sm text-gray-500 mt-2">Fecha límite: {new Date(op.deadline).toLocaleDateString()}</p> {/*  */}
            </div>
          ))}
        </section>

        <section id="application-form">
            <h2 className="text-2xl font-bold mb-4">Postúlate</h2>
            <ApplicationForm opportunities={opportunities} />
        </section>
      </div>
    </div>
  );
}