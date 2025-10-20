const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'restaurant.db');

class Database {
  constructor() {
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Database connection error:', err);
      } else {
        console.log('Connected to SQLite database');
        this.initDatabase();
      }
    });
  }

  // TODO: สร้าง initDatabase method
  // - ใช้ fs.readFileSync อ่าน init.sql
  // - รัน db.exec(sql) เพื่อสร้าง tables
  initDatabase() {
    // ✅ เขียนโค้ดด้านล่าง
    const fs = require('fs');
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');
    
    this.db.exec(sql, (err) => {
      if (err) {
        console.error('Error initializing database:', err);
      } else {
        console.log('Database initialized');
      }
    });
  }

  // TODO: สร้าง run method (สำหรับ INSERT, UPDATE, DELETE)
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, changes: this.changes });
      });
    });
  }

  // TODO: สร้าง get method (สำหรับ SELECT 1 row)
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // TODO: สร้าง all method (สำหรับ SELECT multiple rows)
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows || []);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

module.exports = new Database();