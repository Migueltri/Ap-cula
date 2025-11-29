import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useAuth } from '../../contexts/AuthContext';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import ShareModal from '../../components/feature/ShareModal';
import AuthModal from '../../components/feature/AuthModal';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  badge?: string;
  fullDescription?: string;
}

const allProducts: Record<string, Product[]> = {
  polvorones: [
    {
      id: 1,
      name: 'Pack Clásico 500g',
      price: 8.50,
      image: 'https://readdy.ai/api/search-image?query=traditional%20spanish%20polvorones%20cookies%20in%20elegant%20white%20box%20with%20golden%20ribbon%20simple%20clean%20white%20background%20product%20photography%20style%20professional%20lighting%20appetizing%20presentation&width=600&height=600&seq=pol1d&orientation=squarish',
      description: 'Polvorones tradicionales de almendra',
      badge: 'Popular',
      fullDescription: 'Nuestros polvorones clásicos están elaborados con almendra de la mejor calidad, siguiendo la receta tradicional que ha pasado de generación en generación. Cada polvorón se deshace en la boca dejando un sabor inconfundible.'
    },
    {
      id: 2,
      name: 'Pack Surtido 750g',
      price: 12.00,
      image: 'https://readdy.ai/api/search-image?query=assorted%20spanish%20polvorones%20cookies%20variety%20pack%20in%20decorative%20white%20box%20with%20golden%20details%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20delicious%20presentation&width=600&height=600&seq=pol2d&orientation=squarish',
      description: 'Variedad de sabores: almendra, canela y limón',
      badge: 'Nuevo',
      fullDescription: 'Una selección perfecta para disfrutar de diferentes sabores. Incluye polvorones de almendra, canela y limón, todos elaborados con ingredientes naturales de primera calidad.'
    },
    {
      id: 3,
      name: 'Pack Familiar 1kg',
      price: 15.50,
      image: 'https://readdy.ai/api/search-image?query=large%20family%20size%20spanish%20polvorones%20cookies%20in%20premium%20white%20box%20with%20golden%20accents%20simple%20clean%20white%20background%20product%20photography%20professional%20studio%20lighting&width=600&height=600&seq=pol3d&orientation=squarish',
      description: 'Ideal para compartir en familia',
      badge: 'Oferta',
      fullDescription: 'El pack perfecto para reuniones familiares. Con 1kg de polvorones tradicionales, tendrás suficiente para compartir momentos especiales con tus seres queridos.'
    },
    {
      id: 4,
      name: 'Pack Mini 250g',
      price: 5.00,
      image: 'https://readdy.ai/api/search-image?query=small%20mini%20spanish%20polvorones%20cookies%20in%20cute%20white%20box%20with%20golden%20ribbon%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20charming%20presentation&width=600&height=600&seq=pol4d&orientation=squarish',
      description: 'Perfecto para probar',
      fullDescription: 'Si es tu primera vez probando nuestros polvorones o quieres un formato más pequeño, este pack es ideal. Calidad premium en formato reducido.'
    },
    {
      id: 5,
      name: 'Pack Premium 1.5kg',
      price: 22.00,
      image: 'https://readdy.ai/api/search-image?query=premium%20luxury%20spanish%20polvorones%20cookies%20in%20elegant%20white%20gift%20box%20with%20golden%20decorations%20simple%20clean%20white%20background%20product%20photography%20professional%20studio%20lighting&width=600&height=600&seq=pol5d&orientation=squarish',
      description: 'Selección premium de almendra',
      badge: 'Premium',
      fullDescription: 'Nuestra selección más exclusiva. Elaborados con almendra marcona de primera calidad y un proceso artesanal que garantiza el mejor sabor y textura.'
    },
    {
      id: 6,
      name: 'Pack Canela 500g',
      price: 9.00,
      image: 'https://readdy.ai/api/search-image?query=cinnamon%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20cinnamon%20sticks%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20aromatic%20presentation&width=600&height=600&seq=pol6d&orientation=squarish',
      description: 'Sabor intenso a canela',
      fullDescription: 'Para los amantes de la canela. Estos polvorones tienen un sabor intenso y aromático que te transportará a las navidades de tu infancia.'
    },
    {
      id: 7,
      name: 'Pack Chocolate 500g',
      price: 9.50,
      image: 'https://readdy.ai/api/search-image?query=chocolate%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20cocoa%20powder%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20delicious%20presentation&width=600&height=600&seq=pol7d&orientation=squarish',
      description: 'Con cacao puro',
      badge: 'Nuevo',
      fullDescription: 'Una innovación deliciosa. Combinamos la textura tradicional del polvorón con el sabor intenso del cacao puro de alta calidad.'
    },
    {
      id: 8,
      name: 'Pack Limón 500g',
      price: 8.75,
      image: 'https://readdy.ai/api/search-image?query=lemon%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20fresh%20lemon%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20refreshing%20presentation&width=600&height=600&seq=pol8d&orientation=squarish',
      description: 'Toque cítrico refrescante',
      fullDescription: 'Un toque refrescante y diferente. El limón natural aporta un sabor cítrico que equilibra perfectamente la dulzura del polvorón.'
    },
    {
      id: 9,
      name: 'Pack Naranja 500g',
      price: 8.75,
      image: 'https://readdy.ai/api/search-image?query=orange%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20orange%20slices%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20citrus%20presentation&width=600&height=600&seq=pol9d&orientation=squarish',
      description: 'Sabor a naranja natural',
      fullDescription: 'Elaborados con ralladura de naranja natural, estos polvorones ofrecen un sabor mediterráneo único y delicioso.'
    },
    {
      id: 10,
      name: 'Pack Avellana 500g',
      price: 9.25,
      image: 'https://readdy.ai/api/search-image?query=hazelnut%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20hazelnuts%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20nutty%20presentation&width=600&height=600&seq=pol10d&orientation=squarish',
      description: 'Con avellanas tostadas',
      fullDescription: 'Las avellanas tostadas aportan un sabor intenso y una textura crujiente que contrasta perfectamente con la suavidad del polvorón.'
    },
    {
      id: 11,
      name: 'Pack Coco 500g',
      price: 9.00,
      image: 'https://readdy.ai/api/search-image?query=coconut%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20coconut%20flakes%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20tropical%20presentation&width=600&height=600&seq=pol11d&orientation=squarish',
      description: 'Con coco rallado',
      fullDescription: 'Un toque tropical en cada bocado. El coco rallado aporta una textura y sabor únicos que te sorprenderán.'
    },
    {
      id: 12,
      name: 'Pack Café 500g',
      price: 9.50,
      image: 'https://readdy.ai/api/search-image?query=coffee%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20coffee%20beans%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20aromatic%20presentation&width=600&height=600&seq=pol12d&orientation=squarish',
      description: 'Sabor a café intenso',
      badge: 'Nuevo',
      fullDescription: 'Para los amantes del café. Elaborados con café de tueste natural que aporta un sabor intenso y aromático.'
    },
    {
      id: 13,
      name: 'Pack Vainilla 500g',
      price: 8.50,
      image: 'https://readdy.ai/api/search-image?query=vanilla%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20vanilla%20pods%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20sweet%20presentation&width=600&height=600&seq=pol13d&orientation=squarish',
      description: 'Vainilla natural de Madagascar',
      fullDescription: 'Utilizamos vainilla natural de Madagascar, considerada la mejor del mundo, para dar a estos polvorones un sabor suave y elegante.'
    },
    {
      id: 14,
      name: 'Pack Mixto Frutos Secos 750g',
      price: 13.00,
      image: 'https://readdy.ai/api/search-image?query=mixed%20nuts%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20assorted%20nuts%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20gourmet%20presentation&width=600&height=600&seq=pol14d&orientation=squarish',
      description: 'Almendra, avellana y nuez',
      badge: 'Popular',
      fullDescription: 'Una combinación perfecta de frutos secos. Almendra, avellana y nuez se unen para crear un polvorón con sabor y textura excepcionales.'
    },
    {
      id: 15,
      name: 'Pack Sin Azúcar 500g',
      price: 10.00,
      image: 'https://readdy.ai/api/search-image?query=sugar%20free%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20health%20label%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20healthy%20presentation&width=600&height=600&seq=pol15d&orientation=squarish',
      description: 'Endulzado con stevia',
      badge: 'Saludable',
      fullDescription: 'Pensados para quienes cuidan su salud sin renunciar al sabor. Endulzados con stevia natural, mantienen todo el sabor tradicional.'
    },
    {
      id: 16,
      name: 'Pack Integral 500g',
      price: 9.75,
      image: 'https://readdy.ai/api/search-image?query=whole%20wheat%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20wheat%20grains%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20wholesome%20presentation&width=600&height=600&seq=pol16d&orientation=squarish',
      description: 'Con harina integral',
      badge: 'Saludable',
      fullDescription: 'Elaborados con harina integral de trigo, estos polvorones aportan más fibra y nutrientes sin perder el sabor tradicional.'
    },
    {
      id: 17,
      name: 'Pack Miel 500g',
      price: 9.50,
      image: 'https://readdy.ai/api/search-image?query=honey%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20honey%20drizzle%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20golden%20presentation&width=600&height=600&seq=pol17d&orientation=squarish',
      description: 'Endulzado con miel pura',
      fullDescription: 'La miel pura de abeja aporta un dulzor natural y un sabor único a estos polvorones artesanales.'
    },
    {
      id: 18,
      name: 'Pack Jengibre 500g',
      price: 9.25,
      image: 'https://readdy.ai/api/search-image?query=ginger%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20fresh%20ginger%20root%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20spicy%20presentation&width=600&height=600&seq=pol18d&orientation=squarish',
      description: 'Con jengibre natural',
      badge: 'Nuevo',
      fullDescription: 'Un toque picante y aromático. El jengibre natural aporta propiedades beneficiosas y un sabor único.'
    },
    {
      id: 19,
      name: 'Pack Matcha 500g',
      price: 10.50,
      image: 'https://readdy.ai/api/search-image?query=matcha%20green%20tea%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20matcha%20powder%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20zen%20presentation&width=600&height=600&seq=pol19d&orientation=squarish',
      description: 'Con té matcha japonés',
      badge: 'Premium',
      fullDescription: 'Una fusión única entre tradición española y cultura japonesa. El té matcha aporta antioxidantes y un sabor sofisticado.'
    },
    {
      id: 20,
      name: 'Pack Frutos Rojos 500g',
      price: 9.75,
      image: 'https://readdy.ai/api/search-image?query=red%20berries%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20strawberries%20raspberries%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20fruity%20presentation&width=600&height=600&seq=pol20d&orientation=squarish',
      description: 'Con fresas y frambuesas',
      fullDescription: 'La combinación de fresas y frambuesas liofilizadas aporta un toque frutal y ligeramente ácido que equilibra la dulzura.'
    },
    {
      id: 21,
      name: 'Pack Pistacho 500g',
      price: 11.00,
      image: 'https://readdy.ai/api/search-image?query=pistachio%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20pistachios%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20luxurious%20presentation&width=600&height=600&seq=pol21d&orientation=squarish',
      description: 'Con pistachos de Sicilia',
      badge: 'Premium',
      fullDescription: 'Los pistachos de Sicilia son considerados los mejores del mundo. Su sabor intenso y color verde brillante hacen de estos polvorones una delicia única.'
    },
    {
      id: 22,
      name: 'Pack Caramelo 500g',
      price: 9.00,
      image: 'https://readdy.ai/api/search-image?query=caramel%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20caramel%20sauce%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20sweet%20presentation&width=600&height=600&seq=pol22d&orientation=squarish',
      description: 'Sabor a caramelo tostado',
      fullDescription: 'El caramelo tostado aporta un sabor dulce y ligeramente amargo que crea una experiencia de sabor compleja y deliciosa.'
    },
    {
      id: 23,
      name: 'Pack Nuez 500g',
      price: 9.50,
      image: 'https://readdy.ai/api/search-image?query=walnut%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20walnuts%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20rustic%20presentation&width=600&height=600&seq=pol23d&orientation=squarish',
      description: 'Con nueces de California',
      fullDescription: 'Las nueces de California aportan omega-3 y un sabor intenso que complementa perfectamente la textura del polvorón.'
    },
    {
      id: 24,
      name: 'Pack Almendra Marcona 500g',
      price: 12.00,
      image: 'https://readdy.ai/api/search-image?query=marcona%20almond%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20premium%20almonds%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20gourmet%20presentation&width=600&height=600&seq=pol24d&orientation=squarish',
      description: 'Con almendra marcona premium',
      badge: 'Premium',
      fullDescription: 'La almendra marcona es la variedad más apreciada. Su sabor dulce y textura cremosa hacen de estos polvorones una experiencia gourmet.'
    },
    {
      id: 25,
      name: 'Pack Especias Navideñas 500g',
      price: 9.75,
      image: 'https://readdy.ai/api/search-image?query=christmas%20spices%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20cinnamon%20star%20anise%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20festive%20presentation&width=600&height=600&seq=pol25d&orientation=squarish',
      description: 'Canela, anís y clavo',
      badge: 'Navidad',
      fullDescription: 'Una mezcla tradicional de especias navideñas que evoca los sabores de las fiestas. Canela, anís estrellado y clavo se combinan a la perfección.'
    },
    {
      id: 26,
      name: 'Pack Chocolate Blanco 500g',
      price: 10.00,
      image: 'https://readdy.ai/api/search-image?query=white%20chocolate%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20white%20chocolate%20chips%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20elegant%20presentation&width=600&height=600&seq=pol26d&orientation=squarish',
      description: 'Con chocolate blanco belga',
      fullDescription: 'El chocolate blanco belga de primera calidad aporta cremosidad y un sabor dulce y delicado.'
    },
    {
      id: 27,
      name: 'Pack Dulce de Leche 500g',
      price: 9.50,
      image: 'https://readdy.ai/api/search-image?query=dulce%20de%20leche%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20caramel%20cream%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20creamy%20presentation&width=600&height=600&seq=pol27d&orientation=squarish',
      description: 'Relleno de dulce de leche',
      badge: 'Nuevo',
      fullDescription: 'Una innovación deliciosa. Polvorones rellenos con auténtico dulce de leche argentino que se derrite en la boca.'
    },
    {
      id: 28,
      name: 'Pack Turrón 500g',
      price: 10.50,
      image: 'https://readdy.ai/api/search-image?query=turron%20nougat%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20almond%20nougat%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20traditional%20presentation&width=600&height=600&seq=pol28d&orientation=squarish',
      description: 'Sabor a turrón de Jijona',
      badge: 'Navidad',
      fullDescription: 'Inspirados en el famoso turrón de Jijona, estos polvorones capturan la esencia de este dulce navideño tradicional.'
    },
    {
      id: 29,
      name: 'Pack Mazapán 500g',
      price: 10.00,
      image: 'https://readdy.ai/api/search-image?query=marzipan%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20almond%20paste%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20sweet%20presentation&width=600&height=600&seq=pol29d&orientation=squarish',
      description: 'Con mazapán de Toledo',
      badge: 'Navidad',
      fullDescription: 'El auténtico mazapán de Toledo se une al polvorón tradicional en una combinación perfecta de dos clásicos españoles.'
    },
    {
      id: 30,
      name: 'Pack Mantecado 500g',
      price: 8.75,
      image: 'https://readdy.ai/api/search-image?query=mantecado%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20powdered%20sugar%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20traditional%20presentation&width=600&height=600&seq=pol30d&orientation=squarish',
      description: 'Estilo mantecado tradicional',
      badge: 'Popular',
      fullDescription: 'La receta más tradicional. Estos mantecados siguen la fórmula clásica que ha deleitado a generaciones.'
    },
    {
      id: 31,
      name: 'Pack Yogur 500g',
      price: 9.00,
      image: 'https://readdy.ai/api/search-image?query=yogurt%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20yogurt%20cream%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20fresh%20presentation&width=600&height=600&seq=pol31d&orientation=squarish',
      description: 'Con yogur natural',
      fullDescription: 'El yogur natural aporta un toque de acidez que equilibra la dulzura y crea una textura más ligera.'
    },
    {
      id: 32,
      name: 'Pack Fresa 500g',
      price: 9.25,
      image: 'https://readdy.ai/api/search-image?query=strawberry%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20fresh%20strawberries%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20fruity%20presentation&width=600&height=600&seq=pol32d&orientation=squarish',
      description: 'Con fresas naturales',
      fullDescription: 'Fresas liofilizadas que mantienen todo su sabor y aroma, aportando un toque frutal y fresco.'
    },
    {
      id: 33,
      name: 'Pack Plátano 500g',
      price: 9.00,
      image: 'https://readdy.ai/api/search-image?query=banana%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20banana%20slices%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20tropical%20presentation&width=600&height=600&seq=pol33d&orientation=squarish',
      description: 'Sabor a plátano maduro',
      fullDescription: 'El sabor dulce y cremoso del plátano maduro crea un polvorón único con un toque tropical.'
    },
    {
      id: 34,
      name: 'Pack Manzana Canela 500g',
      price: 9.50,
      image: 'https://readdy.ai/api/search-image?query=apple%20cinnamon%20spanish%20polvorones%20cookies%20in%20white%20box%20with%20apple%20slices%20cinnamon%20decoration%20simple%20clean%20white%20background%20product%20photography%20professional%20lighting%20autumn%20presentation&width=600&height=600&seq=pol34d&orientation=squarish',
      description: 'Manzana con toque de canela',
      fullDescription: 'Una combinación clásica. La manzana deshidratada y la canela se unen para crear un sabor reconfortante y delicioso.'
    }
  ],
  merchandising: [
    {
      id: 1,
      name: 'Camiseta Scout Verde',
      price: 18.00,
      image: 'https://readdy.ai/api/search-image?query=green%20scout%20t-shirt%20with%20scout%20emblem%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20casual%20wear%20cotton%20fabric&width=600&height=600&seq=merc1d&orientation=squarish',
      description: 'Camiseta oficial del grupo',
      badge: 'Popular',
      fullDescription: 'Camiseta oficial de algodón 100% con el escudo del Grupo Scout Apicula. Disponible en todas las tallas. Perfecta para actividades y campamentos.'
    },
    {
      id: 2,
      name: 'Sudadera con Capucha',
      price: 28.00,
      image: 'https://readdy.ai/api/search-image?query=green%20scout%20hoodie%20sweatshirt%20with%20embroidered%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20comfortable%20casual%20wear&width=600&height=600&seq=merc2d&orientation=squarish',
      description: 'Sudadera cálida y cómoda',
      fullDescription: 'Sudadera con capucha de alta calidad, perfecta para los días fríos. Con el logo bordado del grupo y bolsillo canguro.'
    },
    {
      id: 3,
      name: 'Cantimplora Térmica',
      price: 15.00,
      image: 'https://readdy.ai/api/search-image?query=green%20thermal%20water%20bottle%20with%20scout%20logo%20stainless%20steel%20on%20white%20background%20product%20photography%20professional%20lighting%20outdoor%20equipment&width=600&height=600&seq=merc3d&orientation=squarish',
      description: 'Mantiene la temperatura 12h',
      badge: 'Nuevo',
      fullDescription: 'Cantimplora térmica de acero inoxidable que mantiene las bebidas frías o calientes durante 12 horas. Capacidad de 750ml.'
    },
    {
      id: 4,
      name: 'Llavero Scout',
      price: 5.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20keychain%20with%20emblem%20metal%20and%20fabric%20on%20white%20background%20product%20photography%20professional%20lighting%20accessories&width=600&height=600&seq=merc4d&orientation=squarish',
      description: 'Con el escudo del grupo',
      fullDescription: 'Llavero resistente con el escudo del Grupo Scout Apicula. Perfecto como regalo o recuerdo.'
    },
    {
      id: 5,
      name: 'Gorra Scout',
      price: 12.00,
      image: 'https://readdy.ai/api/search-image?query=green%20scout%20cap%20baseball%20hat%20with%20embroidered%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20outdoor%20wear&width=600&height=600&seq=merc5d&orientation=squarish',
      description: 'Protección solar',
      fullDescription: 'Gorra ajustable con visera para protección solar. Logo bordado en la parte frontal.'
    },
    {
      id: 6,
      name: 'Chapas Pack 5 unidades',
      price: 8.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20badges%20pins%20set%20colorful%20designs%20on%20white%20background%20product%20photography%20professional%20lighting%20collectibles&width=600&height=600&seq=merc6d&orientation=squarish',
      description: 'Diseños variados',
      fullDescription: 'Pack de 5 chapas con diferentes diseños del grupo. Perfectas para personalizar mochilas y ropa.'
    },
    {
      id: 7,
      name: 'Mochila Scout 30L',
      price: 35.00,
      image: 'https://readdy.ai/api/search-image?query=green%20scout%20backpack%2030%20liter%20with%20logo%20on%20white%20background%20product%20photography%20professional%20lighting%20outdoor%20gear&width=600&height=600&seq=merc7d&orientation=squarish',
      description: 'Ideal para excursiones',
      badge: 'Popular',
      fullDescription: 'Mochila resistente de 30 litros con múltiples compartimentos. Perfecta para excursiones y campamentos.'
    },
    {
      id: 8,
      name: 'Pañoleta Scout',
      price: 10.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20neckerchief%20bandana%20green%20and%20yellow%20colors%20on%20white%20background%20product%20photography%20professional%20lighting%20traditional%20scout%20wear&width=600&height=600&seq=merc8d&orientation=squarish',
      description: 'Colores oficiales del grupo',
      fullDescription: 'Pañoleta oficial con los colores del Grupo Scout Apicula. Incluye anilla para sujeción.'
    }
  ],
  terechurro: [
    {
      id: 1,
      name: 'Terechurro Clásico',
      price: 6.50,
      image: 'https://readdy.ai/api/search-image?query=traditional%20spanish%20churros%20in%20white%20paper%20cone%20with%20sugar%20coating%20on%20white%20background%20product%20photography%20professional%20lighting%20delicious%20presentation&width=600&height=600&seq=tere1d&orientation=squarish',
      description: 'Churros tradicionales recién hechos',
      badge: 'Popular',
      fullDescription: 'Churros tradicionales recién hechos, crujientes por fuera y tiernos por dentro. Perfectos para cualquier momento del día.'
    },
    {
      id: 2,
      name: 'Terechurro con Chocolate',
      price: 8.00,
      image: 'https://readdy.ai/api/search-image?query=spanish%20churros%20with%20hot%20chocolate%20dipping%20sauce%20in%20white%20cup%20on%20white%20background%20product%20photography%20professional%20lighting%20appetizing%20presentation&width=600&height=600&seq=tere2d&orientation=squarish',
      description: 'Con chocolate caliente para mojar',
      fullDescription: 'La combinación perfecta: churros recién hechos acompañados de chocolate caliente espeso para mojar.'
    },
    {
      id: 3,
      name: 'Terechurro Relleno',
      price: 7.50,
      image: 'https://readdy.ai/api/search-image?query=filled%20churros%20with%20cream%20chocolate%20filling%20on%20white%20background%20product%20photography%20professional%20lighting%20gourmet%20presentation&width=600&height=600&seq=tere3d&orientation=squarish',
      description: 'Rellenos de crema o chocolate',
      badge: 'Nuevo',
      fullDescription: 'Churros rellenos de deliciosa crema pastelera o chocolate. Una experiencia única y deliciosa.'
    },
    {
      id: 4,
      name: 'Pack Familiar Terechurro',
      price: 15.00,
      image: 'https://readdy.ai/api/search-image?query=family%20size%20churros%20pack%20in%20white%20box%20with%20multiple%20churros%20on%20white%20background%20product%20photography%20professional%20lighting%20generous%20portion&width=600&height=600&seq=tere4d&orientation=squarish',
      description: 'Para compartir en familia',
      fullDescription: 'Pack familiar con 20 churros recién hechos. Ideal para compartir en reuniones familiares.'
    },
    {
      id: 5,
      name: 'Terechurro Mini',
      price: 5.00,
      image: 'https://readdy.ai/api/search-image?query=mini%20churros%20small%20bite%20size%20in%20white%20paper%20bag%20on%20white%20background%20product%20photography%20professional%20lighting%20cute%20presentation&width=600&height=600&seq=tere5d&orientation=squarish',
      description: 'Formato mini para picar',
      fullDescription: 'Churros en formato mini, perfectos para picar o como aperitivo. Crujientes y deliciosos.'
    },
    {
      id: 6,
      name: 'Terechurro Premium',
      price: 10.00,
      image: 'https://readdy.ai/api/search-image?query=premium%20gourmet%20churros%20with%20toppings%20and%20sauces%20on%20white%20background%20product%20photography%20professional%20lighting%20luxury%20presentation&width=600&height=600&seq=tere6d&orientation=squarish',
      description: 'Con toppings especiales',
      badge: 'Premium',
      fullDescription: 'Churros premium con toppings especiales: chocolate belga, caramelo salado, frutos secos y más.'
    }
  ],
  'trabajos-extra': [
    {
      id: 1,
      name: 'Ayuda en Eventos',
      price: 50.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20helping%20at%20community%20event%20teamwork%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=600&height=600&seq=extra1d&orientation=squarish',
      description: 'Apoyo logístico en eventos',
      badge: 'Popular',
      fullDescription: 'Nuestro grupo ofrece apoyo logístico en eventos comunitarios. Incluye montaje, organización y atención al público.'
    },
    {
      id: 2,
      name: 'Recogida Solidaria',
      price: 0.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20collecting%20donations%20charity%20work%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=600&height=600&seq=extra2d&orientation=squarish',
      description: 'Recogida de alimentos y ropa',
      fullDescription: 'Organizamos recogidas solidarias de alimentos, ropa y otros artículos para ayudar a quienes más lo necesitan.'
    },
    {
      id: 3,
      name: 'Limpieza de Espacios',
      price: 40.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20cleaning%20park%20environmental%20work%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=600&height=600&seq=extra3d&orientation=squarish',
      description: 'Limpieza de parques y espacios públicos',
      fullDescription: 'Servicio de limpieza y mantenimiento de parques, playas y espacios públicos. Compromiso con el medio ambiente.'
    },
    {
      id: 4,
      name: 'Talleres Educativos',
      price: 60.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20leaders%20teaching%20workshop%20educational%20activity%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=600&height=600&seq=extra4d&orientation=squarish',
      description: 'Talleres para niños y jóvenes',
      badge: 'Nuevo',
      fullDescription: 'Ofrecemos talleres educativos sobre valores scout, medio ambiente, primeros auxilios y más.'
    },
    {
      id: 5,
      name: 'Animación Infantil',
      price: 80.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20entertaining%20children%20games%20and%20activities%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=600&height=600&seq=extra5d&orientation=squarish',
      description: 'Juegos y actividades para fiestas',
      fullDescription: 'Servicio de animación infantil para fiestas y eventos. Juegos, dinámicas y diversión garantizada.'
    },
    {
      id: 6,
      name: 'Campañas de Sensibilización',
      price: 0.00,
      image: 'https://readdy.ai/api/search-image?query=scout%20volunteers%20awareness%20campaign%20community%20outreach%20on%20white%20background%20illustration%20style%20professional%20clean%20design&width=600&height=600&seq=extra6d&orientation=squarish',
      description: 'Campañas sobre temas sociales',
      fullDescription: 'Organizamos campañas de sensibilización sobre temas sociales, ambientales y de salud pública.'
    }
  ]
};

export default function ProductDetailPage() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    comentarios: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { user } = useAuth();

  useEffect(() => {
    if (category && id) {
      // defensiva: category debe coincidir con una key de allProducts
      const key = category.toLowerCase();
      const categoryProducts = allProducts[key] || [];
      const foundProduct = categoryProducts.find(p => p.id === parseInt(id, 10));
      setProduct(foundProduct || null);
    }
  }, [category, id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);

    const formDataToSend = new URLSearchParams();
    formDataToSend.append('producto', product?.name ?? '');
    formDataToSend.append('cantidad', quantity.toString());
    formDataToSend.append('precio_total', ((product?.price || 0) * quantity).toFixed(2));
    formDataToSend.append('nombre', formData.nombre);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('telefono', formData.telefono);
    formDataToSend.append('direccion', formData.direccion);
    formDataToSend.append('comentarios', formData.comentarios);

    try {
      const response = await fetch('https://readdy.ai/api/form/d4kvju4u6ftm2u5dbagg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSend.toString()
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          direccion: '',
          comentarios: ''
        });
        setQuantity(1);
        setTimeout(() => {
          setSubmitSuccess(false);
          setShowForm(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    await addToCart(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleToggleFavorite = async () => {
    if (!product) return;
    
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    
    await toggleFavorite(product);
  };

  const shareToSocial = (platform: string) => {
    if (!product) return;
    
    const url = window.location.href;
    const text = `¡Mira este producto! ${product.name} - ${product.price.toFixed(2)}€`;
    
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
      case 'copy':
        try {
          navigator.clipboard.writeText(url);
          alert('¡Enlace copiado al portapapeles!');
        } catch {
          // fallback
          prompt('Copia el enlace manualmente:', url);
        }
        setShowShareModal(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
      setShowShareModal(false);
    }
  };

  // Si no existe producto mostramos error controlado (no crash)
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
          <Link to="/" className="text-green-700 hover:text-green-800 font-semibold">
            Volver al inicio
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // En render usamos product.image ?? placeholder para evitar imagen rota
  const imageSrc = product.image ?? '/images/placeholder.png';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} product={{
        id: product.id.toString(),
        name: product.name,
        image: imageSrc
      }} />

      <div className="container mx-auto px-4 py-12 mt-20">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-700">Inicio</Link>
            <span>/</span>
            <Link to={`/categoria/${category}`} className="hover:text-green-700 capitalize">
              {category?.replace('-', ' ')}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Imagen del producto */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            <div className="relative w-full h-[600px]">
              <img
                src={imageSrc}
                alt={product.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/placeholder.png'; }}
              />
              {product.badge && (
                <span className={`absolute top-6 right-6 px-4 py-2 rounded-full text-sm font-bold ${
                  product.badge === 'Popular' ? 'bg-yellow-500 text-white' :
                  product.badge === 'Nuevo' ? 'bg-green-600 text-white' :
                  product.badge === 'Oferta' ? 'bg-red-500 text-white' :
                  product.badge === 'Premium' ? 'bg-purple-600 text-white' :
                  product.badge === 'Saludable' ? 'bg-teal-600 text-white' :
                  product.badge === 'Navidad' ? 'bg-red-600 text-white' :
                  'bg-blue-600 text-white'
                }`}>
                  {product.badge}
                </span>
              )}
            </div>
            
            {/* Botones de acción flotantes */}
            <div className="absolute top-6 left-6 flex flex-col gap-3">
              <button
                onClick={handleToggleFavorite}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg backdrop-blur-sm ${
                  isFavorite(product.id.toString())
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                }`}
                title={isFavorite(product.id.toString()) ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <i className={`${isFavorite(product.id.toString()) ? 'ri-heart-fill' : 'ri-heart-line'} text-xl`}></i>
              </button>
              
              <button
                onClick={() => setShowShareModal(true)}
                className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:bg-green-700 hover:text-white text-gray-700"
                title="Compartir producto"
              >
                <i className="ri-share-line text-xl"></i>
              </button>
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>
            
            {product.fullDescription && (
              <div className="bg-green-50 border-l-4 border-green-700 p-6 mb-6 rounded-r-lg">
                <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
              </div>
            )}

            <div className="mb-8">
              <span className="text-5xl font-bold text-green-700">{product.price.toFixed(2)}€</span>
              <span className="text-gray-600 ml-2">/ unidad</span>
            </div>

            {/* Selector de cantidad */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Cantidad</label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-subtract-line text-xl"></i>
                </button>
                <span className="text-2xl font-bold text-gray-900 w-16 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-12 h-12 flex items-center justify-center bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="ri-add-line text-xl"></i>
                </button>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-700">Total:</span>
                <span className="text-3xl font-bold text-green-700">
                  {(product.price * quantity).toFixed(2)}€
                </span>
              </div>
            </div>

            {addedToCart && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center animate-slideDown">
                <i className="ri-checkbox-circle-line text-2xl mr-2"></i>
                <span className="font-semibold">¡Producto añadido al carrito!</span>
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-700 text-white py-4 rounded-lg text-lg font-bold hover:bg-green-800 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                Añadir al Carrito
              </button>
              
              <button
                onClick={() => setShowForm(true)}
                className="flex-1 bg-yellow-600 text-white py-4 rounded-lg text-lg font-bold hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-shopping-bag-line text-xl"></i>
                Comprar Ahora
              </button>
            </div>

            <Link
              to={`/categoria/${category}`}
              className="w-full bg-gray-200 text-gray-700 py-4 rounded-lg text-lg font-bold hover:bg-gray-300 transition-colors text-center whitespace-nowrap cursor-pointer"
            >
              Volver a la Categoría
            </Link>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Modal del formulario */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Completa tu Pedido</h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <div className="p-6">
              {/* Resumen del pedido */}
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold text-gray-900 mb-2">Resumen del Pedido</h3>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{product.name}</span>
                  <span className="font-semibold">{product.price.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700">Cantidad:</span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                <div className="border-t border-green-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-green-700 text-lg">
                      {(product.price * quantity).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>

              {submitSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                  <div className="flex items-center">
                    <i className="ri-checkbox-circle-line text-2xl mr-2"></i>
                    <span className="font-semibold">¡Pedido enviado con éxito! Nos pondremos en contacto contigo pronto.</span>
                  </div>
                </div>
              )}

              {/* Formulario */}
              <form onSubmit={handleSubmit} id="order-form" data-readdy-form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="600 123 456"
                    />
                  </div>

                  <div>
                    <label htmlFor="direccion" className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección de Entrega *
                    </label>
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      placeholder="Calle, número, piso, ciudad, código postal"
                    />
                  </div>

                  <div>
                    <label htmlFor="comentarios" className="block text-sm font-semibold text-gray-700 mb-2">
                      Comentarios Adicionales
                    </label>
                    <textarea
                      id="comentarios"
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleInputChange}
                      maxLength={500}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                      placeholder="Instrucciones especiales, preferencias de entrega, etc. (máximo 500 caracteres)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.comentarios.length}/500 caracteres
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-green-700 text-white py-3 rounded-lg font-bold hover:bg-green-800 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Confirmar Pedido'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
