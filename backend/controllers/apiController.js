const pool = require('../config/db');

const apiController = {
    // Controladores para Compras
    getAllPurchases: async (req, res) => {
        try {
            const [rows] = await pool.query(`
                SELECT p.*, c.name as customer_name, c.email as customer_email
                FROM purchases p
                JOIN customers c ON p.customer_id = c.id
            `);
            res.json(rows);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controladores para Recibos
    confirmReceipt: async (req, res) => {
        const { purchaseId } = req.params;
        const { receiver, notes } = req.body;
        
        try {
            await pool.query(
                'UPDATE receipts SET received = TRUE, receiver_name = ?, notes = ?, received_at = NOW() WHERE purchase_id = ?',
                [receiver, notes, purchaseId]
            );
            
            await pool.query(
                'UPDATE purchases SET shipping_status = ? WHERE id = ?',
                ['delivered', purchaseId]
            );
            
            res.json({ message: 'Receipt confirmed successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controladores para Envíos
    updateShippingAddress: async (req, res) => {
        const { customerId } = req.params;
        const { street, city, state, zipCode } = req.body;
        
        try {
            await pool.query(
                'UPDATE addresses SET street = ?, city = ?, state = ?, zip_code = ? WHERE customer_id = ?',
                [street, city, state, zipCode, customerId]
            );
            
            res.json({ message: 'Shipping address updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

module.exports = apiController;