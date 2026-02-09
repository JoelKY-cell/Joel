
import React, { useState } from 'react';
import { ICONS, MOCK_PRODUCTS } from '../constants';
import { Card, Badge, Button, Overlay } from '../components/Shared';

export const Marketplace: React.FC = () => {
  const [cart, setCart] = useState<string[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);

  const addToCart = (id: string) => {
    setCart([...cart, id]);
  };

  const cartTotal = cart.reduce((acc, id) => {
    const prod = MOCK_PRODUCTS.find(p => p.id === id);
    return acc + (prod?.price || 0);
  }, 0);

  const renderCheckout = () => {
    if (checkoutStep === 1) {
      return (
        <div className="space-y-8">
          <div className="space-y-4">
            {cart.map((id, i) => {
              const p = MOCK_PRODUCTS.find(prod => prod.id === id);
              return (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <img src={p?.image} className="w-16 h-16 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{p?.name}</p>
                    <p className="text-sm text-blue-600 font-bold">{p?.price}€</p>
                  </div>
                  <button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="p-2 text-gray-400 hover:text-red-500">
                    {ICONS.X}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="pt-6 border-t border-gray-100 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{cartTotal}€</span>
            </div>
            {/* Fixed setEnrollStep error: using setCheckoutStep instead */}
            <Button className="w-full py-4 text-lg" onClick={() => setCheckoutStep(2)}>
              {ICONS.CreditCard} Payer maintenant
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
          {ICONS.Check}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Commande confirmée !</h3>
        <p className="text-gray-500 mb-10">Votre matériel sera expédié sous 48h. Il apparaîtra automatiquement dans votre dashboard.</p>
        <Button className="w-full" onClick={() => { setIsCheckoutOpen(false); setCart([]); }}>Retour à la boutique</Button>
      </div>
    );
  };

  return (
    <div className="space-y-12">
      <div className="relative h-72 rounded-[32px] overflow-hidden bg-gray-900 flex items-center p-12">
        <div className="absolute inset-0 opacity-40">
           <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
        <div className="relative z-10 text-white max-w-xl">
          <Badge variant="purple" className="mb-4">Solutions Entreprise</Badge>
          <h1 className="text-5xl font-bold mb-4 leading-tight">Étendez votre infrastructure</h1>
          <p className="text-gray-300 text-lg">Matériel haute précision, plug-and-play, garantie à vie.</p>
        </div>
        <div className="absolute right-12 bottom-12">
           <Button variant="secondary" className="px-6 py-3 bg-white hover:bg-white/90 text-gray-900 shadow-2xl" onClick={() => setIsCheckoutOpen(true)}>
             {/* Fixed ICONS.ShoppingCart error: changed to ICONS.Marketplace */}
             {ICONS.Marketplace} Panier ({cart.length})
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PRODUCTS.map(product => (
          <Card key={product.id} className="group flex flex-col">
            <div className="aspect-[4/3] overflow-hidden rounded-t-[16px] relative">
              <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={product.name} />
              {product.badge && <div className="absolute top-4 left-4"><Badge variant="blue">{product.badge}</Badge></div>}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                {'★'.repeat(Math.floor(product.rating))}
                <span className="text-gray-400 font-bold ml-1">{product.rating} ({product.reviews} avis)</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-8 line-clamp-2">{product.description}</p>
              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-gray-900">{product.price}€</p>
                  {product.originalPrice && <p className="text-xs text-gray-400 line-through">{product.originalPrice}€</p>}
                </div>
                <Button onClick={() => addToCart(product.id)}>
                  {ICONS.Plus} Ajouter
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Overlay isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} title="Votre Panier" maxWidth="max-w-md">
        {cart.length > 0 ? renderCheckout() : (
           <div className="text-center py-10">
              {/* Fixed ICONS.ShoppingCart error: changed to ICONS.Marketplace */}
              <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">{ICONS.Marketplace}</div>
              <p className="text-gray-500 font-bold">Votre panier est vide</p>
              <Button variant="outline" className="mt-6 mx-auto" onClick={() => setIsCheckoutOpen(false)}>Continuer les achats</Button>
           </div>
        )}
      </Overlay>
    </div>
  );
};
