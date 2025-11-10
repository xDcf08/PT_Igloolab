# 🧱 Gestión de Productos | Prueba Técnica Developer Full Stack

Esta aplicación implementa una gestión básica de productos (**CRUD: Crear, Listar y Eliminar**), desarrollada como parte de la prueba técnica para **Igloolab**.  
El proyecto cumple todos los requisitos funcionales y técnicos solicitados, incluyendo backend con validación, frontend interactivo y conexión con base de datos relacional.

---

## 🚀 Stack Tecnológico

### 🖥️ **Frontend**
- **Framework:** React + TypeScript  
- **Estado global:** Zustand  
- **Formularios y validación:** React Hook Form  
- **Consumo de API:** Axios  
- **Estilos:** CSS personalizado  

✅ **Requisitos cumplidos:**
- Listar productos  
- Crear productos  
- Eliminar productos  
- Consumo correcto del API REST  

---

### ⚙️ **Backend**
- **Entorno:** Node.js + TypeScript  
- **Framework:** Express  
- **ORM:** TypeORM  
- **Validación:** Zod (middleware personalizado)  
- **Documentación:** Swagger UI  

✅ **Requisitos cumplidos:**
- Endpoints REST (`GET`, `POST`, `DELETE`)  
- Validación de datos en el endpoint `POST`  
- Conexión con PostgreSQL vía TypeORM  
- Migraciones automatizadas  

---

### 🗃️ **Base de Datos**
- **Motor:** PostgreSQL  
- **ORM:** TypeORM  
- **Migraciones:** Crean automáticamente la tabla `products`

✅ **Requisitos cumplidos:**
- Esquema `products` creado mediante migración  
- Conexión gestionada desde `.env`  

---

## 📱 Versión Móvil (React Native)

Como parte opcional de la prueba técnica, se desarrolló una versión **estática** de la aplicación móvil en **React Native con TypeScript**, cumpliendo con la funcionalidad de listar y eliminar productos, sin conexión a la API.

### 📦 Estructura

```
GestionProductos-Mobile/
 ├── src/
 │   ├── data/
 │   │   └── products.ts       # Datos estáticos locales
 │   └── components/
 │       └── ProductList.tsx   # Pantalla principal con listado y modal de detalle
 ├── App.tsx
 └── package.json
```

### ⚙️ Características
- Implementado con **React Native + TypeScript**
- **Lista de productos estáticos** (`staticProducts`)
- **Modal de detalle** con opción para eliminar del listado local
- **Diseño responsivo y limpio** usando `StyleSheet` nativo

### 🖼️ Interacciones
- **Tocar un producto:** abre un modal con su descripción y precio  
- **Botón “Eliminar”:** remueve el producto de la lista local  
- **Botón “Cerrar”:** cierra el modal sin modificar datos  

### 🧠 Nota
Esta versión no consume el backend, ya que su propósito es **demostrar la estructura y funcionalidad visual** del módulo móvil, como se especificó en el requerimiento de la prueba.

Ejemplo de datos utilizados (`src/data/products.ts`):
```ts
export const staticProducts = [
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
  }
];
```

## ⚙️ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión LTS recomendada)
- **pnpm** (o npm / yarn)
- **PostgreSQL** o **MySQL** en ejecución local

---

## 💾 Configuración de la Base de Datos

### 1️⃣ Archivo `.env` en la raíz del backend (`/GestionProductos-Backend-Node`)
Ejemplo:

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=123456
DB_DATABASE=IgloolabDB
```

### 2️⃣ Aplicar las migraciones con TypeORM

```bash
cd GestionProductos-Backend-Node
pnpm install
pnpm run typeorm migration:run
```

Esto crea automáticamente la tabla `products` en la base de datos configurada.

---

## 🏁 Ejecución del Proyecto

### 🔹 Iniciar el Backend (API REST)
```bash
cd GestionProductos-Backend-Node
pnpm install
pnpm run start
```

> El servidor se iniciará en: **http://localhost:6505**

### 🔹 Iniciar el Frontend (React)
```bash
cd GestionProductos-Front
pnpm install
pnpm run dev
```

> La aplicación estará disponible en: **http://localhost:5173**

### 🔹 Iniciar la App Móvil (React Native)
```bash
cd GestionProductos-Mobile
pnpm install
pnpm run start
```
> Puedes ejecutar la app con **Expo** o **React Native CLI**.

---

## 🔗 Endpoints de la API

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/v1/product/get-all` | Obtiene todos los productos |
| `POST` | `/v1/product/create` | Crea un nuevo producto |
| `DELETE` | `/v1/product/delete/:id` | Elimina un producto por ID |

### 📘 Ejemplo de Request `POST /v1/product/create`

```bash
curl -X POST http://localhost:6505/v1/product/create \
 -H "Content-Type: application/json" \
 -d '{
  "name": "Camiseta Azul",
  "description": "Camiseta deportiva de algodón",
  "price": 49.99
 }'
```

---

## 🧩 Estructura del Proyecto

```
GestionProductos-Backend-Node/
 ├── src/
 │   ├── controllers/
 │   ├── routes/
 │   ├── models/
 │   ├── middlewares/
 │   ├── config/
 │   └── server/
 ├── ormconfig.ts
 ├── package.json
 └── tsconfig.json

GestionProductos-Front/
 ├── src/
 │   ├── components/
 │   ├── models/
 │   ├── store/
 │   ├── pages/
 │   └── services/
 └── package.json
```

---

## 📚 Documentación Swagger

Swagger UI está disponible en:

👉 **http://localhost:6505/doc**

Allí podrás probar directamente los endpoints `GET`, `POST`, y `DELETE`.

---

## 🧱 Esquema de Base de Datos

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);
```

---

## 🧠 (Opcional) Replicación en C# con ASP.NET Core

Se describe cómo replicar la API REST en **C# con ASP.NET Core Web API** y **Entity Framework Core (EF Core)**.

### 🧩 Arquitectura propuesta

- Capa de Dominio / Modelos: Entidad `Product`
- Capa de Persistencia: `ApplicationDbContext` y patrón Repositorio
- Capa de Servicio: Lógica de negocio
- Capa de Presentación: Controladores HTTP (MVC)

### 📦 Modelo (Product.cs)
```csharp
public class Product
{
    [Key]
    public int Id { get; set; }

    [Required, StringLength(255)]
    public string Name { get; set; }

    [Required]
    public string Description { get; set; }

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }
}
```

### 🌐 Controlador
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _service;

    public ProductsController(IProductService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts() =>
        Ok(await _service.ListProducts());

    [HttpPost]
    public async Task<ActionResult<Product>> PostProduct(Product product)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var newProduct = await _service.CreateProduct(product);
        return CreatedAtAction(nameof(GetProducts), new { id = newProduct.Id }, newProduct);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var result = await _service.DeleteProduct(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
```

---

## 🧾 Evaluación Técnica (Autoanálisis)

| Aspecto | Cumplimiento |
|----------|---------------|
| CRUD completo (GET, POST, DELETE) | ✅ |
| Validación de datos (Zod + middleware) | ✅ |
| Migraciones con TypeORM | ✅ |
| Frontend React + TS + Zustand | ✅ |
| Documentación Swagger | ✅ |
| Versión móvil en React Native (estática) | ✅ |
| Explicación C# opcional | ✅ |

---

## 👨‍💻 Autor

**Camilo Flórez**  
Desarrollador Full Stack  
📧 [camilo.florez@example.com](mailto:camilo.florez@example.com)  
📍 Bucaramanga, Colombia  

Proyecto desarrollado como parte de la **Prueba Técnica Developer Full Stack – Igloolab**.

---

## 🧠 Nota Final
> Este proyecto fue implementado siguiendo buenas prácticas de arquitectura, separación de responsabilidades, y tipado fuerte en todas las capas.  
> Se utilizó Zod para garantizar integridad de datos, y Swagger para documentar la API de forma interactiva.
