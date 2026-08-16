const Database = require("better-sqlite3");

const db = new Database("dreamhomes.db");

db.prepare(`
    CREATE TABLE IF NOT EXISTS inquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        property TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();
// ===============================
// Property Visit Bookings Table
// ===============================

db.prepare(`
    CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        property TEXT NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
`).run();
db.prepare(`
    CREATE TABLE IF NOT EXISTS properties (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        location TEXT NOT NULL,
        bedrooms INTEGER NOT NULL
    )
`).run();
// ===============================
// ADD IMAGE COLUMN TO PROPERTIES
// ===============================

try {

    db.prepare(`
        ALTER TABLE properties
        ADD COLUMN image TEXT DEFAULT 'house1.jpg'
    `).run();

} catch (error) {

    // Column already exists
    console.log("ℹ️ Property image column already exists.");

}
db.prepare(`
INSERT OR IGNORE INTO properties
(id, name, price, location, bedrooms)
VALUES
(1,'Luxury Villa',8500000,'Bangalore',4),
(2,'Modern Apartment',6500000,'Hyderabad',3),
(3,'Family Home',7500000,'Chennai',5)
`).run();
// ===============================
// USERS TABLE
// ===============================

db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'user',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();
console.log("✅ Dream Homes database is ready.");

module.exports = db;
