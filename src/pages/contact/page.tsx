import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('subject', formData.subject);
      formBody.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d4kvg6it20jieso0pr00', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-green-900 mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Contacta con Nosotros
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Tienes alguna pregunta o sugerencia? Estamos aquí para ayudarte
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-0 rounded-3xl overflow-hidden shadow-2xl">
            {/* Left Side - Contact Info */}
            <div className="lg:col-span-2 bg-green-800 text-white p-12 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-white rounded-full"></div>
              </div>

              <div className="relative z-10 space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Información de Contacto
                  </h2>
                  <p className="text-white/80">
                    Estamos disponibles para responder tus consultas
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-mail-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-white/80">contacto@scoutapicula.org</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-phone-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Teléfono</h3>
                      <p className="text-white/80">+34 123 456 789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="ri-map-pin-line text-2xl"></i>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Dirección</h3>
                      <p className="text-white/80">
                        Calle Scout, 123<br />
                        28001 Madrid, España
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Síguenos en Redes Sociales</h3>
                  <div className="flex gap-3">
                    {[
                      { icon: 'ri-facebook-circle-line', link: '#' },
                      { icon: 'ri-instagram-line', link: '#' },
                      { icon: 'ri-twitter-x-line', link: '#' },
                      { icon: 'ri-youtube-line', link: '#' }
                    ].map((social) => (
                      <a 
                        key={social.icon}
                        href={social.link}
                        className="w-12 h-12 rounded-full border-2 border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <i className={`${social.icon} text-2xl`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="lg:col-span-3 bg-white p-12">
              <form id="contact-form" onSubmit={handleSubmit} data-readdy-form className="space-y-8">
                <div className="space-y-6">
                  <div className="relative">
                    <input 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-green-700 focus:outline-none text-gray-900 placeholder-transparent peer"
                      placeholder="Nombre"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
                      Nombre
                    </label>
                  </div>

                  <div className="relative">
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-green-700 focus:outline-none text-gray-900 placeholder-transparent peer"
                      placeholder="Email"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <input 
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-0 py-3 border-0 border-b-2 border-gray-300 focus:border-green-700 focus:outline-none text-gray-900 placeholder-transparent peer"
                      placeholder="Asunto"
                    />
                    <label className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
                      Asunto
                    </label>
                  </div>

                  <div className="relative">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={500}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-700 focus:outline-none text-gray-900 resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {formData.message.length}/500 caracteres
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-100 border border-green-500 text-green-700 rounded-xl text-center animate-fadeIn">
                    ¡Mensaje enviado con éxito! Te responderemos pronto.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-100 border border-red-500 text-red-700 rounded-xl text-center animate-fadeIn">
                    Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;