import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="pios.png"
                  alt="Grupo Scout Apicula"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold">Scout Apicula</span>
            </div>
            <p className="text-green-100 leading-relaxed">
           Apoya nuestras actividades comprando en nuestra tienda oficial.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'ri-instagram-line', link: '#' },
                { icon: 'ri-twitter-x-line', link: '#' },
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.link}
                  className="w-10 h-10 bg-white/10 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`${social.icon} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Enlaces Rápidos</h3>
            <ul className="space-y-3">
              {[
                { name: 'Inicio', path: '/' },
                { name: 'Polvorones', path: '/categoria/polvorones' },
                { name: 'Merchandising', path: '/categoria/merchandising' },
                { name: 'Calendario', path: '/calendario' },
                { name: 'Contacto', path: '/contacto' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-green-100 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 group cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-sm group-hover:translate-x-1 transition-transform"></i>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Atención al Cliente</h3>
            <ul className="space-y-3">
              {[
                { name: 'Mi Cuenta', icon: 'ri-user-line' },
                { name: 'Seguimiento de Pedido', icon: 'ri-map-pin-line' },
                { name: 'Política de Devolución', icon: 'ri-arrow-go-back-line' },
                { name: 'Preguntas Frecuentes', icon: 'ri-question-line' },
                { name: 'Términos y Condiciones', icon: 'ri-file-text-line' }
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href="#"
                    className="text-green-100 hover:text-yellow-400 transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <i className={`${item.icon} text-sm`}></i>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-map-pin-line text-lg"></i>
                </div>
                <div>
                  <p className="text-sm text-green-100">
                  Calle Rufino Blanco, <br />
                  12, 19002 Guadalajara (Bajos de la parroquia San Antonio de Padua)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="ri-mail-line text-lg"></i>
                </div>
                <div>
                  <p className="text-sm text-green-100">
                   pionerosapicula@gmail.com
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-green-700">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-sm text-green-200 mb-2">Métodos de Pago Seguros</p>
              <div className="flex items-center gap-4">
                {['ri-visa-line', 'ri-mastercard-line', 'ri-paypal-line', 'ri-bank-card-line'].map((icon, index) => (
                  <div key={index} className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                    <i className={`${icon} text-2xl`}></i>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-green-200 mb-2">Compra Segura</p>
              <div className="flex items-center gap-2">
                <i className="ri-shield-check-line text-2xl text-yellow-400"></i>
                <span className="text-sm text-green-100">SSL Certificado</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 bg-green-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-200">
            <p>
              © {currentYear} Pioneros Apicula. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-yellow-400 transition-colors cursor-pointer">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-yellow-400 transition-colors cursor-pointer">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
