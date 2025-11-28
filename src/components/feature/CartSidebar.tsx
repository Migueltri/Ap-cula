import { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  category?: string;
}

const CartSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setItems(cart);
    };

    const handleOpenCart = () => {
      setIsOpen(true);
    };

    window.addEventListener('openCart', handleOpenCart);
    window.addEventListener('cartUpdated', loadCart);
    
    loadCart();

    return () => {
      window.removeEventListener('openCart', handleOpenCart);
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onClose = () => {
    setIsOpen(false);
  };

  const onUpdateQuantity = (id: number, quantity: number) => {
    const updatedCart = items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const onRemoveItem = (id: number) => {
    const updatedCart = items.filter(item => item.id !== id);
    setItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace('€', '').replace(',', '.'));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity animate-fadeIn"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-yellow-50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Tu Carrito
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl text-gray-700"></i>
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-float">
                  <i className="ri-shopping-cart-line text-5xl text-gray-400"></i>
                </div>
                <p className="text-gray-600 font-medium">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500 mt-2">Añade productos para comenzar</p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Ir a la Tienda
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{item.name}</h3>
                      <p className="text-green-700 font-bold mb-2">{item.price}</p>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="w-7 h-7 rounded-full bg-white border border-gray-300 hover:border-green-700 hover:bg-green-50 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-white border border-gray-300 hover:border-green-700 hover:bg-green-50 flex items-center justify-center transition-all cursor-pointer"
                        >
                          <i className="ri-add-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="w-8 h-8 flex-shrink-0 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer group"
                    >
                      <i className="ri-delete-bin-line text-lg text-red-500 group-hover:scale-110 transition-transform"></i>
                    </button>
                  </div>
                ))}
                
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2 cursor-pointer"
                  >
                    Vaciar carrito
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-200 space-y-4 bg-gray-50">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">{calculateTotal()}€</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-semibold text-green-700">Gratis</span>
                </div>
                <div className="border-t border-gray-300 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-2xl text-green-700">{calculateTotal()}€</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl whitespace-nowrap cursor-pointer">
                Finalizar Compra
              </button>
              <button 
                onClick={onClose}
                className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors cursor-pointer"
              >
                Seguir Comprando
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
