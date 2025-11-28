import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ShareModal from '../../components/feature/ShareModal';
import AuthModal from '../../components/feature/AuthModal';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareProduct, setShareProduct] = useState<any>(null);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  // Productos por categoría
  const allProducts: Record<string, any[]> = {
    polvorones: [
      {
        id: 1,
        name: 'Pack Clásico 500g',
        price: 8.50,
        image: 'https://readdy.ai/api/search-image?query=traditional%20spanish%20polvorones%20cookies%20in%20elegant%20white%20box%20with%20golden%20ribbon%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting%20appetizing%20presentation&width=400&height=500&seq=pol1&orientation=portrait',
        description: 'Polvorones tradicionales de almendra',
        badge: 'Popular',
        category: 'polvorones'
      },
      {
        id: 2,
        name: 'Pack Surtido 750g',
        price: 12.00,
        image: 'https://readdy.ai/api/search-image?query=assorted%20spanish%20polvorones%20cookies%20variety%20pack%20in%20decorative%20white%20box%20with%20golden%20details%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20delicious%20presentation&width=400&height=500&seq=pol2&orientation=portrait',
        description: 'Variedad de sabores: almendra, canela y limón',
        badge: 'Nuevo',
        category: 'polvorones'
      },
      {
        id: 3,
        name: 'Pack Familiar 1kg',
        price: 15.50,
        image: 'https://readdy.ai/api/search-image?query=large%20family%20size%20spanish%20polvorones%20cookies%20in%20premium%20white%20box%20with%20golden%20accents%20simple%20clean%20white%20background%20product%20photography%20professional%20studio%20lighting&width=400&height=500&seq=pol3&orientation=portrait',
        description: 'Ideal para compartir en familia',
        badge: 'Oferta',
        category: 'polvorones'
      },
      {
        id: 4,
        name: 'Pack Mini 250g',
        price: 5.00,
        image: 'https://readdy.ai/api/search-image?query=small%20mini%20spanish%20polvorones%20cookies%20in%20cute%20white%20box%20with%20golden%20ribbon%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20charming%20presentation&width=400&height=500&seq=pol4&orientation=portrait',
        description: 'Perfecto para probar',
        category: 'polvorones'
      },
      {
        id: 5,
        name: 'Pack Premium 1.5kg',
        price: 22.00,
        image: 'https://readdy.ai/api/search-image?query=premium%20luxury%20spanish%20polvorones%20cookies%20in%20elegant%20white%20gift%20box%20with%20golden%20decorations%20simple%20clean%20white%20background%20product%20photography%20professional%20studio%20lighting&width=400&height=500&seq=pol5&orientation=portrait',
        description: 'Selección premium de almendra',
        badge: 'Premium',
        category: 'polvorones'
      },
      {
        id: 6,
        name: 'Pack Canela 500g',
        price: 9.00,
        image: 'https://readdy.ai/api/search-image?query=cinnamon%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20cinnamon%20sticks%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20aromatic%20presentation&width=400&height=500&seq=pol6&orientation=portrait',
        description: 'Sabor intenso a canela',
        category: 'polvorones'
      },
      {
        id: 7,
        name: 'Pack Chocolate 500g',
        price: 9.50,
        image: 'https://readdy.ai/api/search-image?query=chocolate%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20cocoa%20powder%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20delicious%20presentation&width=400&height=500&seq=pol7&orientation=portrait',
        description: 'Con cacao puro',
        badge: 'Nuevo',
        category: 'polvorones'
      },
      {
        id: 8,
        name: 'Pack Limón 500g',
        price: 8.75,
        image: 'https://readdy.ai/api/search-image?query=lemon%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20fresh%20lemon%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20refreshing%20presentation&width=400&height=500&seq=pol8&orientation=portrait',
        description: 'Toque cítrico refrescante',
        category: 'polvorones'
      }
    ],
    merchandising: [
      {
        id: 1,
        name: 'Camiseta Scout Verde',
        price: 18.00,
        image: 'https://readdy.ai/api/search-image?query=green%20scout%20t-shirt%20with%20scout%20emblem%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20casual%20wear%20cotton%20fabric&width=400&height=500&seq=merc1&orientation=portrait',
        description: 'Camiseta oficial del grupo',
        badge: 'Popular',
        category: 'merchandising'
      },
      {
        id: 2,
        name: 'Sudadera con Capucha',
        price: 28.00,
        image: 'https://readdy.ai/api/search-image?query=green%20scout%20hoodie%20sweatshirt%20with%20embroidered%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20comfortable%20casual%20wear&width=400&height=500&seq=merc2&orientation=portrait',
        description: 'Sudadera cálida y cómoda',
        category: 'merchandising'
      },
      {
        id: 3,
        name: 'Cantimplora Térmica',
        price: 15.00,
        image: 'https://readdy.ai/api/search-image?query=green%20thermal%20water%20bottle%20with%20scout%20logo%20stainless%20steel%20on%20white%20background%20product%20photography%20professional%20lighting%20outdoor%20equipment&width=400&height=500&seq=merc3&orientation=portrait',
        description: 'Mantiene la temperatura 12h',
        badge: 'Nuevo',
        category: 'merchandising'
      },
      {
        id: 4,
        name: 'Llavero Scout',
        price: 5.00,
        image: 'https://readdy.ai/api/search-image?query=scout%20keychain%20with%20emblem%20metal%20and%20fabric%20on%20white%20background%20product%20photography%20professional%20lighting%20accessories&width=400&height=500&seq=merc4&orientation=portrait',
        description: 'Con el escudo del grupo',
        category: 'merchandising'
      },
      {
        id: 5,
        name: 'Gorra Scout',
        price: 12.00,
        image: 'https://readdy.ai/api/search-image?query=green%20scout%20cap%20baseball%20hat%20with%20embroidered%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20outdoor%20wear&width=400&height=500&seq=merc5&orientation=portrait',
        description: 'Protección solar',
        category: 'merchandising'
      },
      {
        id: 6,
        name: 'Mochila Scout 30L',
        price: 35.00,
        image: 'https://readdy.ai/api/search-image?query=green%20scout%20backpack%2030%20liter%20with%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20outdoor%20gear&width=400&height=500&seq=merc6&orientation=portrait',
        description: 'Ideal para excursiones',
        badge: 'Popular',
        category: 'merchandising'
      }
    ],
    terechurro: [
      {
        id: 1,
        name: 'Terechurro Clásico',
        price: 6.50,
        image: 'https://readdy.ai/api/search-image?query=traditional%20spanish%20churros%20in%20white%20paper%20cone%20with%20sugar%20coating%20on%20white%20background%20product%20photography%20professional%20lighting%20delicious%20presentation&width=400&height=500&seq=tere1&orientation=portrait',
        description: 'Churros tradicionales recién hechos',
        badge: 'Popular',
        category: 'terechurro'
      },
      {
        id: 2,
        name: 'Terechurro con Chocolate',
        price: 8.00,
        image: 'https://readdy.ai/api/search-image?query=spanish%20churros%20with%20hot%20chocolate%20dipping%20sauce%20in%20white%20cup%20on%20white%20background%20product%20photography%20professional%20lighting%20appetizing%20presentation&width=400&height=500&seq=tere2&orientation=portrait',
        description: 'Con chocolate caliente para mojar',
        category: 'terechurro'
      },
      {
        id: 3,
        name: 'Terechurro Relleno',
        price: 7.50,
        image: 'https://readdy.ai/api/search-image?query=filled%20churros%20with%20cream%20chocolate%20filling%20on%20white%20background%20product%20photography%20professional%20lighting%20gourmet%20presentation&width=400&height=500&seq=tere3&orientation=portrait',
        description: 'Rellenos de crema o chocolate',
        badge: 'Nuevo',
        category: 'terechurro'
      },
      {
        id: 4,
        name: 'Pack Familiar Terechurro',
        price: 15.00,
        image: 'https://readdy.ai/api/search-image?query=family%20size%20churros%20pack%20in%20white%20box%20with%20multiple%20churros%20on%20white%20background%20product%20photography%20professional%20lighting%20generous%20portion&width=400&height=500&seq=tere4&orientation=portrait',
        description: 'Para compartir en familia',
        category: 'terechurro'
      }
    ],
    'trabajos-extra': [
      {
        id: 1,
        name: 'Ayuda en Eventos',
        price: 50.00,
        image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20helping%20at%20community%20event%20teamwork%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=400&height=500&seq=extra1&orientation=portrait',
        description: 'Apoyo logístico en eventos',
        badge: 'Popular',
        category: 'trabajos-extra'
      },
      {
        id: 2,
        name: 'Recogida Solidaria',
        price: 0.00,
        image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20collecting%20donations%20charity%20work%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=400&height=500&seq=extra2&orientation=portrait',
        description: 'Recogida de alimentos y ropa',
        category: 'trabajos-extra'
      },
      {
        id: 3,
        name: 'Limpieza de Espacios',
        price: 40.00,
        image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20cleaning%20park%20environmental%20work%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=400&height=500&seq=extra3&orientation=portrait',
        description: 'Limpieza de parques y espacios públicos',
        category: 'trabajos-extra'
      },
      {
        id: 4,
        name: 'Talleres Educativos',
        price: 60.00,
        image: 'https://readdy.ai/api/search-image?query=scout%20leaders%20teaching%20workshop%20educational%20activity%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=400&height=500&seq=extra4&orientation=portrait',
        description: 'Talleres para niños y jóvenes',
        badge: 'Nuevo',
        category: 'trabajos-extra'
      }
    ]
  };

  const categoryInfo: Record<string, { title: string; description: string; icon: string }> = {
    polvorones: {
      title: 'Polvorones Artesanales',
      description: 'Deliciosos polvorones elaborados con recetas tradicionales',
      icon: 'ri-cake-3-line'
    },
    merchandising: {
      title: 'Merchandising Scout',
      description: 'Productos oficiales del Grupo Scout Apicula',
      icon: 'ri-shirt-line'
    },
    terechurro: {
      title: 'Terechurro',
      description: 'Churros y productos especiales',
      icon: 'ri-compass-3-line'
    },
    'trabajos-extra': {
      title: 'Trabajos Extra',
      description: 'Servicios y actividades solidarias',
      icon: 'ri-hand-heart-line'
    }
  };

  const currentCategory = slug || 'polvorones';
  const products = allProducts[currentCategory] || [];
  const info = categoryInfo[currentCategory] || categoryInfo.polvorones;

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
    setShowShareModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/" className="text-white/80 hover:text-white transition-colors">
                Inicio
              </Link>
              <i className="ri-arrow-right-s-line text-white/60"></i>
              <span className="font-semibold">{info.title}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <i className={`${info.icon} text-4xl`}></i>
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-2">{info.title}</h1>
                <p className="text-xl text-white/90">{info.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Mostrando <span className="font-semibold text-gray-900">{products.length}</span> productos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-product-shop>
            {products.map((product, index) => (
              <Link
                key={product.id}
                to={`/producto/${currentCategory}/${product.id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative w-full h-80 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                        product.badge === 'Popular' ? 'bg-yellow-500 text-white' :
                        product.badge === 'Nuevo' ? 'bg-green-600 text-white' :
                        product.badge === 'Oferta' ? 'bg-red-500 text-white' :
                        'bg-purple-600 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => handleToggleFavorite(product, e)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg ${
                        isFavorite(product.id.toString())
                          ? 'bg-red-500 text-white'
                          : 'bg-white/95 hover:bg-red-500 hover:text-white'
                      }`}
                    >
                      <i className={`${isFavorite(product.id.toString()) ? 'ri-heart-fill' : 'ri-heart-line'} text-lg`}></i>
                    </button>
                    <button
                      onClick={(e) => handleShare(product, e)}
                      className="w-10 h-10 bg-white/95 rounded-full flex items-center justify-center hover:bg-green-700 hover:text-white transition-all shadow-lg cursor-pointer"
                    >
                      <i className="ri-share-line text-lg"></i>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-green-700">
                      {product.price.toFixed(2)}€
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-12 h-12 bg-green-700 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
                    >
                      {addedToCart === product.id ? (
                        <i className="ri-check-line text-xl"></i>
                      ) : (
                        <i className="ri-shopping-cart-line text-xl"></i>
                      )}
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-inbox-line text-6xl text-gray-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No hay productos disponibles</h2>
              <p className="text-gray-600 mb-8">Vuelve pronto para ver nuevos productos</p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white font-bold px-8 py-4 rounded-full transition-all cursor-pointer"
              >
                <i className="ri-home-line"></i>
                Volver al Inicio
              </Link>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Modal de compartir */}
      {showShareModal && shareProduct && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          product={{
            id: shareProduct.id.toString(),
            name: shareProduct.name,
            image: shareProduct.image
          }}
        />
      )}
    </div>
  );
};

export default CategoryPage;
