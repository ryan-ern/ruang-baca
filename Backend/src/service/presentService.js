const Database = require("../database/databaseConnect");
const QRCode = require("qrcode");
const moment = require("moment");

class presentService {
    // Generate barcode harian
    static async generateBarcode() {
        const todayDate = moment().format("YYYY-MM-DD");
        const barcodeData = `LIBRARY_PRESENT:${todayDate}`;
        const barcodeImage = await QRCode.toDataURL(barcodeData);
        return barcodeImage;
    }

    // Proses scan barcode
    static async scanBarcode(username, barcode, name) {
        const [prefix] = barcode.split(":");
        if (prefix !== "LIBRARY_PRESENT") throw new Error("Barcode tidak valid.");

        const scanTime = moment().format("YYYY-MM-DD HH:mm:ss");

        await Database.createConnection();

        // Tambahkan data ke tabel attendance
        const insertAttendanceQuery = {
            text: `
                INSERT INTO attendance (username, barcode, name, scan_time) 
                VALUES ($1, $2, $3, $4) RETURNING *
            `,
            values: [username, barcode, name, scanTime],
        };
        const insertResult = await Database.query(insertAttendanceQuery);

        await Database.close();
        return insertResult[0];
    }

    // Ambil semua data attendance
    static async getPresent() {
        await Database.createConnection();
        const query = {
            text: "SELECT * FROM attendance JOIN account ON attendance.username = account.username",
        };
        const result = await Database.query(query);
        await Database.close();
        return result;
    }

    static async downloadPresentByDateRange(startDate, endDate) {
        await Database.createConnection();

        const query = {
            text: `SELECT * FROM attendance JOIN account ON attendance.username = account.username WHERE scan_time BETWEEN $1 AND $2 ORDER BY scan_time DESC`,
            values: [startDate, endDate],
        };

        const present = await Database.query(query);
        await Database.close();

        return present;
    }

}

module.exports = presentService;
