import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import QuickViewModal from '../../components/feature/QuickViewModal';
import ShareModal from '../../components/feature/ShareModal';
import AuthModal from '../../components/feature/AuthModal';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 8,
    minutes: 23,
    seconds: 45
  });
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null);
  const [shareProduct, setShareProduct] = useState<any>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    setIsVisible(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: 'Pack Familiar Polvorones',
      price: 12.50,
      originalPrice: 15.00,
      category: 'Polvorones',
      image: 'https://readdy.ai/api/search-image?query=artisan%20traditional%20spanish%20polvorones%20cookies%20in%20elegant%20gift%20box%20packaging%20with%20simple%20clean%20white%20background%20product%20photography%20style%20warm%20lighting%20appetizing%20presentation&width=400&height=500&seq=1&orientation=portrait',
      description: '24 unidades de polvorones artesanales',
      badge: 'Oferta',
      discount: '-17%',
      rating: 4.8
    },
    {
      id: 2,
      name: 'Camiseta Oficial Scout',
      price: 18.00,
      category: 'Merchandising',
      image: 'https://readdy.ai/api/search-image?query=green%20scout%20uniform%20tshirt%20with%20scout%20emblem%20badge%20folded%20neatly%20on%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting%20high%20quality%20fabric%20texture&width=400&height=500&seq=2&orientation=portrait',
      description: 'Disponible en varios colores y tallas',
      badge: 'Popular',
      rating: 4.8
    },
    {
      id: 3,
      name: 'Cantimplora Térmica',
      price: 15.00,
      category: 'Merchandising',
      image: 'https://readdy.ai/api/search-image?query=modern%20stainless%20steel%20thermal%20water%20bottle%20with%20scout%20logo%20standing%20upright%20on%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting%20metallic%20finish&width=400&height=500&seq=3&orientation=portrait',
      description: 'Mantiene temperatura 12 horas',
      badge: 'Nuevo',
      rating: 5.0
    },
    {
      id: 4,
      name: 'Kit Supervivencia Scout',
      price: 25.00,
      category: 'Terechurro',
      image: 'https://readdy.ai/api/search-image?query=outdoor%20survival%20kit%20with%20compass%20rope%20flashlight%20and%20tools%20arranged%20neatly%20in%20organized%20display%20on%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting&width=400&height=500&seq=4&orientation=portrait',
      description: 'Todo lo necesario para aventuras',
      badge: 'Premium',
      rating: 4.9
    }
  ];

  const categories = [
    {
      name: 'Polvorones',
      slug: 'polvorones',
      count: '34 productos',
      icon: 'ri-cake-3-line',
      image: 'https://readdy.ai/api/search-image?query=variety%20of%20traditional%20spanish%20polvorones%20cookies%20in%20different%20boxes%20and%20packages%20arranged%20beautifully%20on%20simple%20clean%20warm%20beige%20background%20appetizing%20food%20photography%20style%20natural%20lighting&width=800&height=450&seq=5&orientation=landscape'
    },
    {
      name: 'Merchandising',
      slug: 'merchandising',
      count: '8 productos',
      icon: 'ri-shirt-line',
      image: 'https://readdy.ai/api/search-image?query=scout%20merchandise%20collection%20with%20tshirts%20caps%20bottles%20and%20accessories%20displayed%20together%20on%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting%20organized%20layout&width=800&height=450&seq=6&orientation=landscape'
    },
    {
      name: 'Terechurro',
      slug: 'terechurro',
      count: '6 productos',
      icon: 'ri-compass-3-line',
      image: 'https://readdy.ai/api/search-image?query=outdoor%20camping%20and%20adventure%20gear%20equipment%20including%20survival%20tools%20and%20scout%20supplies%20on%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting%20organized%20display&width=800&height=450&seq=7&orientation=landscape'
    },
    {
      name: 'Trabajos Extra',
      slug: 'trabajos-extra',
      count: '6 servicios',
      icon: 'ri-hand-heart-line',
      image: 'https://readdy.ai/api/search-image?query=group%20of%20young%20scouts%20in%20green%20uniforms%20doing%20community%20service%20and%20volunteer%20work%20helping%20others%20on%20simple%20clean%20warm%20background%20positive%20atmosphere%20teamwork%20and%20solidarity&width=800&height=450&seq=8&orientation=landscape'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      rating: 5,
      comment: 'Los polvorones son deliciosos y el servicio excelente. ¡Totalmente recomendado!',
      avatar: 'https://readdy.ai/api/search-image?query=happy%20woman%20smiling%20portrait%20professional%20headshot%20on%20white%20background&width=100&height=100&seq=test1&orientation=squarish'
    },
    {
      name: 'Carlos Ruiz',
      rating: 5,
      comment: 'Compré merchandising para mi hijo scout y la calidad es increíble.',
      avatar: 'https://readdy.ai/api/search-image?query=happy%20man%20smiling%20portrait%20professional%20headshot%20on%20white%20background&width=100&height=100&seq=test2&orientation=squarish'
    },
    {
      name: 'Ana Martínez',
      rating: 5,
      comment: 'Excelente atención y productos de primera calidad. Volveré a comprar.',
      avatar: 'https://readdy.ai/api/search-image?query=happy%20woman%20smiling%20portrait%20professional%20headshot%20on%20white%20background&width=100&height=100&seq=test3&orientation=squarish'
    }
  ];

  const benefits = [
    {
      icon: 'ri-truck-line',
      title: 'Envío Gratis',
      description: 'En pedidos superiores a 30€'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Pago Seguro',
      description: '100% protegido y encriptado'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Soporte 24/7',
      description: 'Atención personalizada siempre'
    },
    {
      icon: 'ri-arrow-go-back-line',
      title: 'Devolución Fácil',
      description: '30 días para devoluciones'
    }
  ];

  const handleAddToCart = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    await addToCart(product, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const handleToggleFavorite = async (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    await toggleFavorite(product);
  };

  const handleShare = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareProduct(product);
  };

  const handleQuickView = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formBody = new URLSearchParams();
      formBody.append('email', newsletterEmail);

      const response = await fetch('https://readdy.ai/api/form/d4kvg6it20jieso0pr10', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 5000);
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-yellow-50 to-green-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`w-full space-y-8 ${isVisible ? 'animate-slideUp' : 'opacity-0'}`}>
              <div className="space-y-6">
                <div className="inline-block">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    <i className="ri-shield-star-line"></i>
                    Tienda Oficial
                  </span>
                </div>
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-green-900 leading-tight">
                  Grupo Scout
                  <span className="block gradient-text">Apicula</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light">
                  Apoya nuestras actividades comprando productos oficiales y participando y colaborando en nuestras actividades
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/categoria/polvorones" 
                  className="group inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-pointer"
                >
                  <span>Explorar Tienda</span>
                  <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link 
                  to="/calendario" 
                  className="inline-flex items-center gap-2 border-2 border-yellow-600 text-yellow-700 hover:bg-yellow-50 font-bold px-8 py-4 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-calendar-line text-xl"></i>
                  <span>Ver Calendario</span>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { number: '500+', label: 'Productos Vendidos' },
                  { number: '150+', label: 'Miembros Activos' },
                  { number: '20+', label: 'Años de Historia' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-3xl lg:text-4xl font-bold text-green-800">{stat.number}</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right box (image removed) */}
            <div className="relative w-full h-96 lg:h-[600px] bg-gray-100 rounded-3xl shadow-2xl flex items-center justify-center">
              <p className="text-gray-600">Imagen eliminada</p>
            </div>

          </div>
        </div>
      </section>

      {/* Benefits Bar */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-600">Beneficios eliminados temporalmente (sin imágenes)</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold mb-4">
              Lo Más Popular
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-green-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestros productos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-product-shop>
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-80 overflow-hidden bg-gray-50">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.badge && (
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        product.badge === 'Oferta' ? 'bg-red-500 text-white' :
                        product.badge === 'Popular' ? 'bg-yellow-500 text-white' :
                        product.badge === 'Nuevo' ? 'bg-green-600 text-white' :
                        'bg-purple-600 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    {product.discount && (
                      <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-black text-white shadow-lg">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => handleToggleFavorite(product, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isFavorite(product.id.toString()) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <i className={`${isFavorite(product.id.toString()) ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
                    </button>
                    <button 
                      onClick={(e) => handleShare(product, e)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-700 hover:text-white transition-all shadow-lg cursor-pointer"
                    >
                      <i className="ri-share-line text-lg"></i>
                    </button>
                  </div>

                  {/* Quick View */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button 
                      onClick={(e) => handleQuickView(product, e)}
                      className="w-full bg-white/95 backdrop-blur-sm text-gray-900 font-bold py-3 rounded-xl hover:bg-white transition-all shadow-lg cursor-pointer"
                    >
                      Vista Rápida
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 uppercase">{product.category}</span>
                    {product.rating && (
                      <div className="flex items-center gap-1">
                        <i className="ri-star-fill text-yellow-500 text-sm"></i>
                        <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-700 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-700">{product.price.toFixed(2)}€</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">{product.originalPrice.toFixed(2)}€</span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-12 h-12 bg-green-700 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer relative"
                    >
                      {addedToCart === product.id ? (
                        <i className="ri-check-line text-xl"></i>
                      ) : (
                        <i className="ri-shopping-cart-line text-xl"></i>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/categoria/polvorones"
              className="inline-flex items-center gap-2 border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white font-bold px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
            >
              <span>Ver Todos los Productos</span>
              <i className="ri-arrow-right-line text-xl"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold mb-4">
              Nuestras Categorías
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-green-900 mb-4">
              Explora Nuestra Tienda
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={category.slug}
                to={`/categoria/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 w-full h-full">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-300"></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-yellow-500 transition-all duration-300">
                    <i className={`${category.icon} text-3xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform duration-300">{category.name}</h3>
                  <p className="text-sm text-white/80 mb-4">{category.count}</p>
                  <div className="flex items-center gap-2 text-yellow-400 font-semibold group-hover:gap-4 transition-all duration-300">
                    <span>Ver productos</span>
                    <i className="ri-arrow-right-line text-xl"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-3 text-gray-600">
              <i className="ri-shield-check-fill text-3xl text-green-600"></i>
              <div>
                <p className="font-bold text-gray-900">Pago Seguro</p>
                <p className="text-sm">SSL Encriptado</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <i className="ri-verified-badge-fill text-3xl text-yellow-600"></i>
              <div>
                <p className="font-bold text-gray-900">Calidad Garantizada</p>
                <p className="text-sm">Productos Certificados</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <i className="ri-customer-service-fill text-3xl text-green-600"></i>
              <div>
                <p className="font-bold text-gray-900">Soporte 24/7</p>
                <p className="text-sm">Siempre Disponibles</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-green-700 via-green-600 to-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-mail-line text-4xl"></i>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            ¡No Te Pierdas Nuestras Ofertas!
          </h2>
          
          {newsletterStatus === 'success' ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-xl mx-auto animate-slideUp">
              <i className="ri-checkbox-circle-line text-5xl mb-3"></i>
              <p className="text-xl font-bold">¡Gracias por suscribirte!</p>
              <p className="text-sm opacity-90 mt-2">Revisa tu correo para obtener tu descuento</p>
            </div>
          ) : (
            <form id="newsletter-form" onSubmit={handleNewsletterSubmit} data-readdy-form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email"
                name="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-yellow-400 text-base"
                required
              />
              <button 
                type="submit"
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap cursor-pointer"
              >
                Suscribirme
              </button>
            </form>
          )}
          
          {newsletterStatus === 'error' && (
            <p className="text-red-200 mt-4 animate-slideUp">
              Hubo un error. Por favor, inténtalo de nuevo.
            </p>
          )}
          
          <p className="text-sm mt-4 opacity-75">
            <i className="ri-lock-line mr-1"></i>
            Tus datos están protegidos. No compartimos información.
          </p>
        </div>
      </section>

      {/* Modals */}
      {quickViewProduct && (
        <QuickViewModal
          product={{
            ...quickViewProduct,
            price: quickViewProduct.price.toFixed(2) + '€',
            originalPrice: quickViewProduct.originalPrice ? quickViewProduct.originalPrice.toFixed(2) + '€' : undefined
          }}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {shareProduct && (
        <ShareModal
          isOpen={!!shareProduct}
          onClose={() => setShareProduct(null)}
          product={{
            id: shareProduct.id.toString(),
            name: shareProduct.name,
            image: shareProduct.image
          }}
        />
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

  {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
