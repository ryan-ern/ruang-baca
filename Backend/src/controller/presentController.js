const presentService = require("../service/presentService");
const moment = require('moment')
const ExcelJS = require('exceljs')

class presentController {
    // Generate barcode harian
    static async generateBarcode(_, res) {
        try {
            const barcode = await presentService.generateBarcode();
            const response = {
                status: 200,
                message: "Barcode berhasil dibuat.",
                data: barcode,
            };
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: 500,
                message: error.message,
            };
            return res.status(500).send(response);
        }
    }

    // Proses scan barcode oleh siswa
    static async scanBarcode(req, res) {
        const { username, barcode, name } = req.body;

        if (!username || !barcode) {
            return res.status(400).send({
                status: 400,
                message: "Username dan barcode wajib diisi.",
            });
        }

        try {
            await presentService.scanBarcode(username, barcode, name);
            const response = {
                status: 200,
                message: "Kehadiran berhasil dicatat.",
            };
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: 400,
                message: error.message,
            };
            return res.status(400).send(response);
        }
    }

    // Ambil data kehadiran
    static async getPresent(req, res) {
        try {
            const present = await presentService.getPresent();
            const response = {
                status: 200,
                message: "Data kehadiran berhasil diperoleh.",
                data: present,
            };
            return res.status(200).send(response);
        } catch (error) {
            const response = {
                status: 500,
                message: error.message,
            };
            return res.status(500).send(response);
        }
    }

    static async downloadPresent(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Error while get token");

            const { startDate, endDate } = req.body;
            if (!startDate || !endDate) throw new Error("Invalid date range");

            const presents = await presentService.downloadPresentByDateRange(startDate, endDate);
            if (presents.length === 0) throw new Error('Data Tidak ditemukan');

            const formattedData = presents.map(presentData => ({
                ...presentData,
                scan_time: moment(presentData.scan_time).format('DD-MM-YYYY HH:mm'),
            }));

            // Export to Excel Logic
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Peminjaman');

            worksheet.columns = [
                { header: 'Nama Pengguna', key: 'name', width: 20 },
                { header: 'Waktu Hadir', key: 'scan_time', width: 20 },
                { header: 'Jurusan', key: 'jurusan', width: 30 },
            ];

            worksheet.addRows(formattedData);

            const buffer = await workbook.xlsx.writeBuffer();

            res.setHeader('Content-Disposition', `attachment; filename="Peminjaman_${startDate}_${endDate}.xlsx"`);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
            return res.send(buffer);
        } catch (err) {
            const response = {
                status: 400,
                message: err.message || 'Gagal download data',
            };

            return res.status(400).send(response);
        }
    }
}

module.exports = presentController;
