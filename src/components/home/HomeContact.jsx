import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import { useContactForm } from '../../hooks/useContactForm';
import ReCaptcha from '../ReCaptcha';

export default function HomeContact() {
  const { submitForm, isLoading, isSuccess, error } = useContactForm();
  const recaptchaRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    tamanoEmpresa: '',
    desafio: '',
    mensaje: '',
    acceptTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      return;
    }

    try {
      let captchaToken = null;
      if (recaptchaRef.current) {
        captchaToken = await recaptchaRef.current.executeAsync();
      }

      await submitForm({ ...formData, captchaToken });

      setFormData({
        nombre: '',
        empresa: '',
        email: '',
        telefono: '',
        tamanoEmpresa: '',
        desafio: '',
        mensaje: '',
        acceptTerms: false,
      });

      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (err) {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  const inputClasses = "w-full px-4 py-3 text-base border border-navy/10 bg-white text-navy outline-none focus:border-accent transition-colors";
  const labelClasses = "block text-sm font-medium text-navy/70 mb-2";

  return (
    <section id="contact" className="bg-page py-16 md:py-[120px]">
      <div className="max-w-[1076px] mx-auto px-4 xl:px-0">
        <div className="grid grid-cols-12 gap-6 md:gap-10">
          {/* Left: Info */}
          <motion.div
            className="col-span-12 lg:col-span-5 flex flex-col gap-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-5">
              <p className="text-navy/60 text-base uppercase">Contacto</p>
              <h2 className="text-navy font-semibold text-3xl md:text-[40px] leading-tight">
                Agenda tu diagnóstico estratégico sin costo
              </h2>
              <p className="text-navy/60 text-base leading-relaxed">
                Cuéntanos sobre tu empresa y tus desafíos. En menos de 24 horas te contactamos para programar tu diagnóstico.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-navy font-medium text-base">contacto@skylineit.mx</p>
                  <p className="text-navy/50 text-sm">Respuesta en menos de 24h</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-navy font-medium text-base">+52 (844) 770 4939</p>
                  <p className="text-navy/50 text-sm">Lun - Vie: 9:00 - 18:00</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-navy font-medium text-base">Ciudad de México | Monterrey | Remoto</p>
                  <p className="text-navy/50 text-sm">Servicio en México y EE.UU.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 bg-accent/10 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-navy font-medium text-base">Diagnóstico gratuito</p>
                  <p className="text-navy/50 text-sm">Sin compromiso de contratación</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/528447704939?text=Hola%2C%20me%20interesa%20un%20diagnóstico%20estratégico%20para%20mi%20empresa"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white font-semibold text-base h-12 flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors w-full lg:w-auto lg:px-8"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Escribir por WhatsApp
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="col-span-12 lg:col-span-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-8 md:p-10 shadow-sm">
              <h3 className="text-navy font-semibold text-xl mb-6">
                Solicita tu diagnóstico estratégico
              </h3>

              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {isSuccess && (
                  <div className="bg-green-50 border border-green-200 p-4 flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-green-800 font-medium">Solicitud enviada correctamente</p>
                      <p className="text-green-600 text-sm mt-1">Te contactaremos en las próximas 24 horas.</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-800 font-medium">Error al enviar</p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Nombre *</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Tu nombre completo"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Empresa *</label>
                    <input
                      type="text"
                      name="empresa"
                      value={formData.empresa}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="Nombre de tu empresa"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="tu@email.com"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className={inputClasses}
                      placeholder="+52 (555) 123-4567"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClasses}>Tamaño de empresa</label>
                    <select
                      name="tamanoEmpresa"
                      value={formData.tamanoEmpresa}
                      onChange={handleInputChange}
                      className={inputClasses}
                      disabled={isLoading}
                    >
                      <option value="">Selecciona</option>
                      <option value="1-10 empleados">1-10 empleados</option>
                      <option value="11-50 empleados">11-50 empleados</option>
                      <option value="51-200 empleados">51-200 empleados</option>
                      <option value="200+ empleados">200+ empleados</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Principal desafío</label>
                    <select
                      name="desafio"
                      value={formData.desafio}
                      onChange={handleInputChange}
                      className={inputClasses}
                      disabled={isLoading}
                    >
                      <option value="">Selecciona</option>
                      <option value="Eficiencia operativa">Eficiencia operativa</option>
                      <option value="Adopción de tecnología">Adopción de tecnología</option>
                      <option value="Crecimiento de ingresos">Crecimiento de ingresos</option>
                      <option value="Reducción de costos">Reducción de costos</option>
                      <option value="Cumplimiento regulatorio">Cumplimiento regulatorio</option>
                      <option value="Adopción de IA">Adopción de IA</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Cuéntanos sobre tu empresa y tus desafíos *</label>
                  <textarea
                    rows={4}
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className={`${inputClasses} resize-none`}
                    placeholder="Describe brevemente tu negocio, tu industria y los principales desafíos que enfrentas..."
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="contact-terms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 accent-accent"
                    required
                    disabled={isLoading}
                  />
                  <label htmlFor="contact-terms" className="text-sm text-navy/50">
                    Acepto que Skyline se comunique conmigo para coordinar el diagnóstico y proporcionar información sobre sus servicios de consultoría.
                  </label>
                </div>

                <ReCaptcha ref={recaptchaRef} />

                <motion.button
                  type="submit"
                  className="w-full bg-accent text-white font-semibold text-lg h-[50px] flex items-center justify-center gap-2 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.01 } : {}}
                  whileTap={!isLoading ? { scale: 0.99 } : {}}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Solicitar Diagnóstico Estratégico</span>
                      <span className="sm:hidden">Solicitar Diagnóstico</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-navy/40 text-center">
                  * Campos obligatorios. Tu información está 100% protegida.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
