// backend/controllers/affiliateController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
    try {
        const affiliates = await prisma.affiliate.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json({ success: true, data: affiliates });
    } catch (error) {
        console.error('Get all affiliates error:', error);
        res.status(500).json({ success: false, message: 'Database error, please try again' });
    }
};

exports.create = async (req, res) => {
    try {
        const data = req.body;
        // Basic validation for required fields
        if (!data.name || !data.email || !data.country || !data.growthStatus) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newAffiliate = await prisma.affiliate.create({ data });
        res.status(201).json({ success: true, data: newAffiliate });
    } catch (error) {
        console.error('Create affiliate error:', error);
        res.status(500).json({ success: false, message: 'Database error, please try again' });
    }
};

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const affiliate = await prisma.affiliate.findUnique({ where: { id: parseInt(id) } });
        if (!affiliate) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        const updatedAffiliate = await prisma.affiliate.update({
            where: { id: parseInt(id) },
            data
        });
        res.json({ success: true, data: updatedAffiliate });
    } catch (error) {
        console.error('Update affiliate error:', error);
        res.status(500).json({ success: false, message: 'Database error, please try again' });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const affiliate = await prisma.affiliate.findUnique({ where: { id: parseInt(id) } });
        if (!affiliate) {
            return res.status(404).json({ success: false, message: 'Record not found' });
        }

        await prisma.affiliate.delete({ where: { id: parseInt(id) } });
        res.json({ success: true, message: 'Record deleted successfully' });
    } catch (error) {
        console.error('Delete affiliate error:', error);
        res.status(500).json({ success: false, message: 'Database error, please try again' });
    }
};
