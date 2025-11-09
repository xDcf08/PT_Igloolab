import 'reflect-metadata'
import app from "./server/server";
import { AppDataSource } from './db/AppDataSource';

async function main() {
  const PORT = process.env.PORT || 6505;
  
  await AppDataSource.initialize();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
  });
}

main();