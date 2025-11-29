import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { user, signOut } = useAuth();
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const categories = [
    { name: 'Polvorones', slug: 'polvorones', icon: 'ri-cake-3-line' },
    { name: 'Merchandising', slug: 'merchandising', icon: 'ri-shirt-line' },
    { name: 'Telechurro', slug: 'telechurro', icon: 'ri-compass-3-line' },
    { name: 'Sábados Temáticos', slug: 'sábados temáticos', icon: 'ri-hand-heart-line' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/images/pios.png"
                  alt="Pioneros Apícula"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="hidden lg:block">
                <span className={`text-xl font-bold transition-colors ${
                  isScrolled ? 'text-green-900' : 'text-green-900'
                }`}>
                  Pioneros Apícula
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link 
                to="/" 
                className={`font-semibold transition-all duration-300 hover:text-yellow-600 relative group cursor-pointer ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                Inicio
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              
              {categories.map((category) => (
                <Link 
                  key={category.slug}
                  to={`/categoria/${category.slug}`}
                  className={`font-semibold transition-all duration-300 hover:text-yellow-600 relative group cursor-pointer ${
                    isScrolled ? 'text-gray-700' : 'text-gray-900'
                  }`}
                >
                  {category.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              <Link 
                to="/calendario" 
                className={`font-semibold transition-all duration-300 hover:text-yellow-600 relative group cursor-pointer ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                Calendario
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link 
                to="/contacto" 
                className={`font-semibold transition-all duration-300 hover:text-yellow-600 relative group cursor-pointer ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                Contacto
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:block relative">
                {isSearchOpen ? (
                  <div className="flex items-center gap-2 animate-slideDown">
                    <input 
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar productos..."
                      className="w-64 px-4 py-2 rounded-full border-2 border-gray-300 focus:border-yellow-600 focus:outline-none text-sm"
                      autoFocus
                    />
                    <button 
                      onClick={() => setIsSearchOpen(false)}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-gray-900 cursor-pointer"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsSearchOpen(true)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 cursor-pointer ${
                      isScrolled ? 'text-gray-700' : 'text-gray-900'
                    }`}
                  >
                    <i className="ri-search-line text-xl"></i>
                  </button>
                )}
              </div>

              {/* Favorites */}
              <Link 
                to="/favoritos"
                className={`hidden md:flex w-10 h-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 cursor-pointer relative ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                <i className="ri-heart-line text-xl"></i>
                {favoritesCount > 0 && (
                  <span className="notification-badge animate-pulse-slow">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 cursor-pointer ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                {cartCount > 0 && (
                  <span className="notification-badge animate-pulse-slow">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User */}
              {user ? (
                <div className="hidden md:block relative">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 cursor-pointer ${
                      isScrolled ? 'text-gray-700' : 'text-gray-900'
                    }`}
                  >
                    {user.user_metadata?.avatar_url ? (
                      <img 
                        src={user.user_metadata.avatar_url} 
                        alt={user.user_metadata?.name || 'Usuario'}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <i className="ri-user-line text-xl"></i>
                    )}
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-slideDown z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-semibold text-gray-900">{user.user_metadata?.name || 'Usuario'}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                      </div>
                      <Link 
                        to="/favoritos"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <i className="ri-heart-line text-lg text-gray-600"></i>
                        <span className="text-gray-700">Mis Favoritos</span>
                        {favoritesCount > 0 && (
                          <span className="ml-auto bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-1 rounded-full">
                            {favoritesCount}
                          </span>
                        )}
                      </Link>
                      <button 
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors cursor-pointer text-left"
                      >
                        <i className="ri-logout-box-line text-lg text-red-600"></i>
                        <span className="text-red-600">Cerrar Sesión</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className={`hidden md:flex w-10 h-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 cursor-pointer ${
                    isScrolled ? 'text-gray-700' : 'text-gray-900'
                  }`}
                >
                  <i className="ri-user-line text-xl"></i>
                </button>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-gray-100 cursor-pointer ${
                  isScrolled ? 'text-gray-700' : 'text-gray-900'
                }`}
              >
                <i className={`text-2xl ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl animate-slideDown">
            <div className="max-w-7xl mx-auto px-6 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-3 rounded-full border-2 border-gray-300 focus:border-yellow-600 focus:outline-none text-sm"
                />
                <i className="ri-search-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              </div>

              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-home-line mr-3"></i>
                Inicio
              </Link>
              
              {categories.map((category) => (
                <Link 
                  key={category.slug}
                  to={`/categoria/${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors cursor-pointer"
                >
                  <i className={`${category.icon} mr-3`}></i>
                  {category.name}
                </Link>
              ))}

              <Link 
                to="/calendario" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-calendar-line mr-3"></i>
                Calendario
              </Link>

              <Link 
                to="/contacto" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                <i className="ri-mail-line mr-3"></i>
                Contacto
              </Link>

              <div className="pt-4 border-t border-gray-200 flex gap-4">
                <Link
                  to="/favoritos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors cursor-pointer text-center relative"
                >
                  <i className="ri-heart-line mr-2"></i>
                  Favoritos
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
                {user ? (
                  <button 
                    onClick={handleSignOut}
                    className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <i className="ri-logout-box-line mr-2"></i>
                    Salir
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="flex-1 py-3 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    <i className="ri-user-line mr-2"></i>
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="h-20"></div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[60]">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full">
            <CartSidebarContent onClose={() => setIsCartOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

// Componente interno para el contenido del carrito
function CartSidebarContent({ onClose }: { onClose: () => void }) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product_price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div className="w-full md:w-[420px] h-full bg-white shadow-2xl animate-slideInRight">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-yellow-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Tu Carrito
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'}
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
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-float">
                <i className="ri-shopping-cart-line text-5xl text-gray-400"></i>
              </div>
              <p className="text-gray-600 font-medium">Tu carrito está vacío</p>
              <p className="text-sm text-gray-500 mt-2">Añade productos para comenzar</p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Ir a la Tienda
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src={item.product_image || 'https://via.placeholder.com/80'}
                      alt={item.product_name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">{item.product_name}</h3>
                    <p className="text-green-700 font-bold mb-2">{item.product_price.toFixed(2)}€</p>
                    {item.size && <p className="text-xs text-gray-500">Talla: {item.size}</p>}
                    {item.color && <p className="text-xs text-gray-500">Color: {item.color}</p>}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-7 h-7 rounded-full bg-white border border-gray-300 hover:border-green-700 hover:bg-green-50 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <i className="ri-subtract-line text-sm"></i>
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white border border-gray-300 hover:border-green-700 hover:bg-green-50 flex items-center justify-center transition-all cursor-pointer"
                      >
                        <i className="ri-add-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="w-8 h-8 flex-shrink-0 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors cursor-pointer group"
                  >
                    <i className="ri-delete-bin-line text-lg text-red-500 group-hover:scale-110 transition-transform"></i>
                  </button>
                </div>
              ))}
              
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-red-600 hover:text-red-700 font-medium py-2 cursor-pointer whitespace-nowrap"
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
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
              className="w-full text-gray-600 hover:text-gray-900 font-medium py-2 transition-colors cursor-pointer whitespace-nowrap"
            >
              Seguir Comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
