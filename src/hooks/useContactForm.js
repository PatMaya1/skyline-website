import { useState } from 'react';

// URL del API Gateway - actualizar después del despliegue
const API_ENDPOINT = import.meta.env.VITE_CONTACT_API_URL || 'https://kb9i36e9ue.execute-api.us-east-1.amazonaws.com/prod/contact';

export const useContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const submitForm = async (formData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Error ${response.status}: ${response.statusText}`);
      }

      setIsSuccess(true);
      return result;
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err.message || 'Error al enviar el formulario. Por favor intenta más tarde.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSuccess(false);
    setError(null);
  };

  return {
    submitForm,
    isLoading,
    isSuccess,
    error,
    resetForm,
  };
};
