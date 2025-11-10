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
| Explicación C# opcional | ✅ |

---

## 👨‍💻 Autor

**Camilo Flórez**  
Desarrollador Full Stack  
📧 [camilo.florez@example.com](mailto:camilo.florez@example.com)  
📍 Medellín, Colombia  

Proyecto desarrollado como parte de la **Prueba Técnica Developer Full Stack – Igloolab**.

---

## 🧠 Nota Final
> Este proyecto fue implementado siguiendo buenas prácticas de arquitectura, separación de responsabilidades, y tipado fuerte en todas las capas.  
> Se utilizó Zod para garantizar integridad de datos, y Swagger para documentar la API de forma interactiva.
