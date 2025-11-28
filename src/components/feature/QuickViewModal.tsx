import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';

interface QuickViewModalProps {
  product: {
    id: number;
    name: string;
    price: string;
    originalPrice?: string;
    image: string;
    description: string;
    category: string;
    badge?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleAddToCart = async () => {
    if (!user) {
      alert('Por favor, inicia sesión para añadir al carrito');
      return;
    }

    await addToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('€', '')),
      image: product.image,
      category: product.category,
    }, quantity);
    
    onClose();
  };

  const handleToggleFavorite = async () => {
    if (!user) {
      alert('Por favor, inicia sesión para añadir a favoritos');
      return;
    }

    await toggleFavorite({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('€', '')),
      image: product.image,
      category: product.category,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image */}
          <div className="relative">
            <div className="relative w-full h-96 rounded-xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                  product.badge === 'Oferta' ? 'bg-red-500 text-white' :
                  product.badge === 'Popular' ? 'bg-yellow-500 text-white' :
                  product.badge === 'Nuevo' ? 'bg-green-600 text-white' :
                  'bg-purple-600 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 uppercase mb-2">{product.category}</p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-green-700">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Cantidad</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-subtract-line text-xl"></i>
                </button>
                <span className="text-xl font-bold text-gray-900 w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-add-line text-xl"></i>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                Añadir al Carrito
              </button>

              <button
                onClick={handleToggleFavorite}
                className={`w-full font-bold py-4 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2 ${
                  isFavorite(product.id.toString())
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <i className={`${isFavorite(product.id.toString()) ? 'ri-heart-fill' : 'ri-heart-line'} text-xl`}></i>
                {isFavorite(product.id.toString()) ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
