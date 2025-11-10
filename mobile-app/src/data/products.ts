export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const staticProducts: Product[] = [
  { 
    id: '1', 
    name: 'Laptop Gaming', 
    price: 1200.00,
    description: 'Potente laptop para juegos de alta gama con tarjeta gráfica de última generación.' 
  },
  { 
    id: '2', 
    name: 'Monitor Curvo 32"', 
    price: 450.50,
    description: 'Monitor curvo de 32 pulgadas con resolución 4K y 144Hz de tasa de refresco.' 
  },
  { 
    id: '3', 
    name: 'Mouse Inalámbrico', 
    price: 35.99,
    description: 'Mouse ergonómico inalámbrico con sensor óptico de alta precisión.' 
  },
];