interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    image: string;
  };
}

export default function ShareModal({ isOpen, onClose, product }: ShareModalProps) {
  if (!isOpen) return null;

  const shareToSocial = (platform: string) => {
    const url = `${window.location.origin}/producto/${product.id}`;
    const text = `¡Mira este producto! ${product.name}`;
    
    let shareUrl = '';
    
    switch(platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(text)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('¡Enlace copiado al portapapeles!');
        onClose();
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slideUp" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Compartir Producto</h3>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 text-sm truncate">{product.name}</h4>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => shareToSocial('whatsapp')}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-whatsapp-line text-xl"></i>
            <span>WhatsApp</span>
          </button>
          
          <button
            onClick={() => shareToSocial('facebook')}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-facebook-fill text-xl"></i>
            <span>Facebook</span>
          </button>
          
          <button
            onClick={() => shareToSocial('twitter')}
            className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-twitter-x-line text-xl"></i>
            <span>Twitter</span>
          </button>
          
          <button
            onClick={() => shareToSocial('pinterest')}
            className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-pinterest-fill text-xl"></i>
            <span>Pinterest</span>
          </button>
          
          <button
            onClick={() => shareToSocial('telegram')}
            className="flex items-center justify-center gap-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-telegram-fill text-xl"></i>
            <span>Telegram</span>
          </button>
          
          <button
            onClick={() => shareToSocial('email')}
            className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-mail-line text-xl"></i>
            <span>Email</span>
          </button>
          
          <button
            onClick={() => shareToSocial('copy')}
            className="col-span-2 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
          >
            <i className="ri-file-copy-line text-xl"></i>
            <span>Copiar Enlace</span>
          </button>
        </div>
      </div>
    </div>
  );
}
