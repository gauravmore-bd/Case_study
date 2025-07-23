require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3000;

app.use(express.json());

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306
};

let db;
mysql.createConnection(dbConfig)
    .then((connection) => {
        db = connection;
        console.log('Connected to MySQL database');
    })
    .catch((err) => {
        console.error('MySQL connection error:', err);
        process.exit(1);
    });

app.get('/api/companies/:company_id/alerts/low-stock', async(req, res) => {
    const companyId = req.params.company_id;

    try {
        // Step 1: Get all warehouses of this company
        const [warehouses] = await db.query(
            'SELECT id, name FROM warehouses WHERE company_id = ?', [companyId]
        );

        let alerts = [];

        // Step 2: Loop through each warehouse
        for (let warehouse of warehouses) {
            // Step 3: Get inventory with product info
            const [inventory] = await db.query(`
                SELECT i.quantity, p.id AS product_id, p.name, p.sku,
                       pt.threshold, s.id AS supplier_id, s.name AS supplier_name, s.contact_email
                FROM inventory i
                JOIN products p ON i.product_id = p.id
                JOIN product_thresholds pt ON pt.product_id = p.id
                JOIN product_suppliers ps ON ps.product_id = p.id
                JOIN suppliers s ON s.id = ps.supplier_id
                WHERE i.warehouse_id = ? AND i.quantity < pt.threshold
            `, [warehouse.id]);

            // Step 4: For each product, check if it had recent sales
            for (let item of inventory) {
                const [recentSales] = await db.query(`
                    SELECT COUNT(*) AS count FROM sales
                    WHERE product_id = ? AND sale_date >= NOW() - INTERVAL 30 DAY
                `, [item.product_id]);

                if (parseInt(recentSales[0].count) > 0) {
                    alerts.push({
                        product_id: item.product_id,
                        product_name: item.name,
                        sku: item.sku,
                        warehouse_id: warehouse.id,
                        warehouse_name: warehouse.name,
                        current_stock: item.quantity,
                        threshold: item.threshold,
                        days_until_stockout: 7, // hardcoded estimate
                        supplier: {
                            id: item.supplier_id,
                            name: item.supplier_name,
                            contact_email: item.contact_email
                        }
                    });
                }
            }
        }

        res.json({
            alerts: alerts,
            total_alerts: alerts.length
        });

    } catch (err) {
        console.error(' Error fetching alerts:', err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});