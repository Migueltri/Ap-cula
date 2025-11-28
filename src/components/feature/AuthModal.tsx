import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onClose();
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
        >
          <i className="ri-close-line text-xl"></i>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-green-500 to-yellow-500 rounded-full mx-auto mb-4">
            <i className="ri-user-line text-3xl text-white"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h2>
          <p className="text-gray-600">Inicia sesión o regístrate para continuar</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="font-medium text-gray-700 group-hover:text-green-600">
              {loading ? 'Iniciando sesión...' : 'Continuar con Google'}
            </span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">¿Por qué registrarte?</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 bg-green-100 rounded-full mt-0.5">
                <i className="ri-heart-line text-sm text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Guarda tus favoritos</p>
                <p className="text-xs text-gray-500">Accede a tus productos favoritos desde cualquier dispositivo</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 bg-green-100 rounded-full mt-0.5">
                <i className="ri-shopping-cart-line text-sm text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Carrito sincronizado</p>
                <p className="text-xs text-gray-500">Tu carrito se guarda automáticamente en todos tus dispositivos</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 bg-green-100 rounded-full mt-0.5">
                <i className="ri-gift-line text-sm text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ofertas exclusivas</p>
                <p className="text-xs text-gray-500">Recibe descuentos especiales solo para miembros registrados</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 bg-green-100 rounded-full mt-0.5">
                <i className="ri-shield-check-line text-sm text-green-600"></i>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Compra segura</p>
                <p className="text-xs text-gray-500">Tus datos están protegidos con la máxima seguridad</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad
        </p>
      </div>
    </div>
  );
}
