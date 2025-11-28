import { Link } from 'react-router-dom';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useCart } from '../../contexts/CartContext';
import { useState } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ShareModal from '../../components/feature/ShareModal';

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [shareProduct, setShareProduct] = useState<any>(null);

  const handleAddToCart = async (favorite: any) => {
    await addToCart({
      id: favorite.product_id,
      name: favorite.product_name,
      price: favorite.product_price,
      image: favorite.product_image,
      category: favorite.product_category,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full mb-4">
              <i className="ri-heart-fill text-3xl text-white"></i>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Mis Favoritos
            </h1>
            <p className="text-gray-600">
              {favorites.length} {favorites.length === 1 ? 'producto guardado' : 'productos guardados'}
            </p>
          </div>

          {/* Favorites Grid */}
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-float">
                <i className="ri-heart-line text-6xl text-gray-400"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No tienes favoritos aún</h2>
              <p className="text-gray-600 mb-8">Empieza a guardar tus productos favoritos</p>
              <a
                href="/"
                className="px-8 py-4 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer"
              >
                Explorar Productos
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite, index) => (
                <div
                  key={favorite.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-slideUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={favorite.product_image || 'https://via.placeholder.com/300'}
                      alt={favorite.product_name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Quick Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => removeFavorite(favorite.product_id)}
                        className="w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all cursor-pointer group/btn"
                      >
                        <i className="ri-heart-fill text-lg text-red-500 group-hover/btn:text-white"></i>
                      </button>
                      <button
                        onClick={() => setShareProduct({
                          id: favorite.product_id,
                          name: favorite.product_name,
                          image: favorite.product_image,
                        })}
                        className="w-10 h-10 flex items-center justify-center bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-teal-500 hover:text-white transition-all cursor-pointer"
                      >
                        <i className="ri-share-line text-lg"></i>
                      </button>
                    </div>

                    {/* Category Badge */}
                    {favorite.product_category && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full">
                          {favorite.product_category}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                      {favorite.product_name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-700">
                        {favorite.product_price.toFixed(2)}€
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(favorite)}
                        className="flex-1 bg-gradient-to-r from-green-700 to-green-600 hover:from-green-800 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-shopping-cart-line mr-2"></i>
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Share Modal */}
      {shareProduct && (
        <ShareModal
          isOpen={!!shareProduct}
          onClose={() => setShareProduct(null)}
          product={shareProduct}
        />
      )}
    </div>
  );
}
