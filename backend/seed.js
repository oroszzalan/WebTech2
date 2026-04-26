import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDb } from './config/db.js';
import { User } from './models/User.js';
import { Category } from './models/Category.js';
import { Asset } from './models/Asset.js';
import { Assignment } from './models/Assignment.js';

dotenv.config();
await connectDb();

async function seed() {
  await Assignment.deleteMany();
  await Asset.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();

  const password = await bcrypt.hash('admin123', 10);
  await User.create({
    name: 'Admin',
    email: 'admin@admin.hu',
    password,
    role: 'admin'
  });

  const [laptop, monitor] = await Category.create([
    { name: 'Laptop', description: 'Hordozható számítógépek' },
    { name: 'Monitor', description: 'Külső kijelzők' }
  ]);

  await Asset.create([
    {
      name: 'Dell Latitude 5420',
      serialNumber: 'DL-001',
      category: laptop._id,
      purchaseDate: new Date('2025-09-01'),
      status: 'available',
      location: '101-es iroda',
      description: 'Irodai laptop'
    },
    {
      name: 'LG 27UL500',
      serialNumber: 'LG-002',
      category: monitor._id,
      purchaseDate: new Date('2025-10-15'),
      status: 'repair',
      location: 'Szerviz',
      description: '4K monitor'
    }
  ]);

  console.log('Seed lefutott. Belépés: admin@admin.hu / admin123');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});


// kezdő adatok létrehozása a MongoDB adatbázisban