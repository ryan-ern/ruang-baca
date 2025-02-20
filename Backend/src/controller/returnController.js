const inventoryService = require("../service/inventoryService")
const returnService = require("../service/returnService")
const moment = require('moment')
const jwt = require('jsonwebtoken')
const borrowService = require("../service/borrowService")
const Holidays = require('date-holidays')
const ExcelJS = require('exceljs')

const hd = new Holidays("ID");

class returnController {
    static async getDenda(req, res) {
        try {
            const denda = await returnService.getDenda()
            if (!denda) throw new Error('Denda not found')
            const response = {
                status: 200,
                message: 'success',
                denda: denda,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async updateDenda(req, res) {
        try {
            const payload = req.body
            const denda = await returnService.updateDenda(payload.nominal, payload.text)
            const response = {
                status: 200,
                message: 'success',
                denda: denda,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }

    static isNonWorkingDay(date) {
        const dayOfWeek = moment(date).isoWeekday();
        const isSunday = dayOfWeek === 7;
        const isHoliday = hd.isHoliday(moment(date).format("YYYY-MM-DD"));
        return isSunday || isHoliday;
    }

    static calculateLateDays(dueDate, returnDate) {
        let lateDays = 0;
        let currentDate = moment(dueDate).add(1, 'days');

        while (currentDate.isBefore(returnDate, 'day')) {
            if (!this.isNonWorkingDay(currentDate)) {
                lateDays++;
            }
            currentDate.add(1, 'days');
        }

        return lateDays;
    }


    static async getReturn(req, res) {
        try {
            const datas = await returnService.getAllReturn();
            const denda = await returnService.getDenda();

            datas.forEach(data => {
                data.updated_at = moment(data.updated_at).format();
                if (data.due_date && data.due_date !== '-') {
                    data.due_date = moment(data.due_date).format();

                    if (data.pengembalian === '-') {
                        const lateDays = returnController.calculateLateDays(data.due_date, moment());
                        data.terlambat = lateDays;
                        data.denda = lateDays > 0 ? lateDays * denda.nominal : 0;
                    } else {
                        const lateDays = returnController.calculateLateDays(data.due_date, moment(data.updated_at));
                        data.terlambat = lateDays;
                    }
                } else {
                    data.due_date = '-';
                }
            });

            const response = {
                status: 200,
                message: 'success',
                data: datas,
            };
            return res.status(200).send(response);
        } catch (err) {
            const response = {
                status: 400,
                message: err.message.replace(/['"]+/g, ''),
            };
            return res.status(400).send(response);
        }
    }

    static async getReturnUser(req, res) {
        try {
            const token = req.headers.authorization
            if (!token) throw new Error("Error while get token")
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const datas = await returnService.getReturn(decodedToken.nisn)
            const denda = await returnService.getDenda()
            datas.forEach(data => {
                data.updated_at = moment(data.updated_at).format();
                if (data.due_date && data.due_date !== '-') {
                    data.due_date = moment(data.due_date).format();

                    if (data.pengembalian === '-') {
                        const lateDays = returnController.calculateLateDays(data.due_date, moment());
                        data.terlambat = lateDays;
                        data.denda = lateDays > 0 ? lateDays * denda.nominal : 0;
                    } else {
                        const lateDays = returnController.calculateLateDays(data.due_date, moment(data.updated_at));
                        data.terlambat = lateDays;
                    }
                } else {
                    data.due_date = '-';
                }
            });
            const response = {
                status: 200,
                message: 'success',
                data: datas,
                denda: denda.nominal,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async acceptReturn(req, res) {
        try {
            const data = await returnService.getReturnOne(req.params.id)
            if (!data) throw new Error('Maaf data tidak ditemukan')
            const denda = await returnService.getDenda()
            const buku = await inventoryService.findIsbn(data.book_isbn)
            if (data.due_date !== '-') {
                const lateDays = returnController.calculateLateDays(data.due_date, moment());
                data.denda = lateDays > 0 ? lateDays * denda.nominal : 0;
            }

            const pengembalian = await returnService.acceptReturn(data.denda, req.params.id, buku.ready + 1, buku.isbn)
            const response = {
                status: 200,
                message: 'success',
                data: pengembalian,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async resetPengembalian(req, res) {
        try {
            const data = await borrowService.seeOneBorrow(req.params.id)
            if (!data) throw new Error('Data Not Found')
            const buku = await inventoryService.findIsbn(data.book_isbn)
            if (!buku) throw new Error('Data Not Found')
            if (buku.ready <= 0) throw new Error('Maaf Stock Buku sudah habis')
            const count = await borrowService.countUserBorrow(data.user_id)
            if (count.count >= 3) throw new Error("Maaf sudah melebihi batas peminjaman")
            const borrow = await returnService.resetPengembalian(req.params.id, buku.ready - 1, buku.isbn)
            const response = {
                status: 200,
                message: 'success',
                data: borrow,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async searchPengembalianAdmin(req, res) {
        try {
            const date = req.params.date
            const datas = await returnService.searchPengembalianAdmin(date)
            const denda = await returnService.getDenda()
            if (Object.keys(datas).length === 0) throw new Error('Data Tidak ditemukan')
            datas.forEach(data => {
                data.updated_at = moment(data.updated_at).format()
                if (data.due_date != null && data.due_date != '-') {
                    data.due_date = moment(data.due_date).format()
                    if (data.pengembalian == '-') {
                        const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                        const many = tanggal / 24
                        data.terlambat = Math.round(many)
                        if (data.terlambat <= 0) {
                            data.denda = 0
                            data.terlambat = 0
                        } else {
                            data.denda = data.terlambat * denda.nominal
                        }
                    } else {
                        const tanggal = moment(data.updated_at).diff(data.due_date, 'hours')
                        const many = tanggal / 24
                        data.terlambat = Math.round(many)
                        if (data.terlambat <= 0) {
                            data.terlambat = 0
                        }
                    }
                } else {
                    data.due_date = '-'
                }
            })
            const response = {
                status: 200,
                message: 'success',
                data: datas,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async searchPengembalian(req, res) {
        try {
            const date = req.params.date
            const token = req.headers.authorization
            if (!token) throw new Error("Error while get token")
            const decodedToken = jwt.verify(token, process.env.JWT_TOKEN)
            const datas = await returnService.searchPengembalian(date, decodedToken.nisn)
            const denda = await returnService.getDenda()
            if (Object.keys(datas).length === 0) throw new Error('Data Tidak ditemukan')
            datas.forEach(data => {
                data.updated_at = moment(data.updated_at).format()
                if (data.due_date != null && data.due_date != '-') {
                    data.due_date = moment(data.due_date).format()
                    if (data.pengembalian == '-') {
                        const tanggal = moment(new Date().getTime()).diff(data.due_date, 'hours')
                        const many = tanggal / 24
                        data.terlambat = Math.round(many)
                        if (data.terlambat <= 0) {
                            data.denda = 0
                            data.terlambat = 0
                        } else {
                            data.denda = data.terlambat * denda.nominal
                        }
                    } else {
                        const tanggal = moment(data.updated_at).diff(data.due_date, 'hours')
                        const many = tanggal / 24
                        data.terlambat = Math.round(many)
                        if (data.terlambat <= 0) {
                            data.terlambat = 0
                        }
                    }
                } else {
                    data.due_date = '-'
                }
            })
            const response = {
                status: 200,
                message: 'success',
                data: datas,
            }
            return res.status(200).send(response)
        } catch (err) {
            const message = err.message.replace(/['"]+/g, '')
            const response = {
                status: 400,
                message: message,
            }
            return res.status(400).send(response)
        }
    }
    static async downloadReturn(req, res) {
        try {
            const token = req.headers.authorization;
            if (!token) throw new Error("Error while get token");

            const { startDate, endDate } = req.body;
            if (!startDate || !endDate) throw new Error("Invalid date range");

            const returns = await returnService.downloadReturnByDateRange(startDate, endDate);
            if (returns.length === 0) throw new Error('Data Tidak ditemukan');

            const formattedData = returns.map(returnData => ({
                ...returnData,
                updated_at: moment(returnData.updated_at).format('YYYY-MM-DD HH:mm:ss'),
                due_date: returnData.due_date ? moment(returnData.due_date).format('YYYY-MM-DD HH:mm:ss') : '-',
            }));

            // Export to Excel Logic
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Peminjaman');

            worksheet.columns = [
                { header: 'ID', key: 'id', width: 10 },
                { header: 'Nama Pengguna', key: 'name', width: 20 },
                { header: 'ISBN', key: 'book_isbn', width: 20 },
                { header: 'Judul Buku', key: 'judul', width: 30 },
                { header: 'Status Peminjaman', key: 'status', width: 15 },
                { header: 'Tanggal Peminjaman', key: 'updated_at', width: 20 },
                { header: 'Tanggal Pengembalian', key: 'due_date', width: 20 },
                { header: 'Status Pengembalian', key: 'pengembalian', width: 15 },
                { header: 'denda', key: 'denda', width: 15 },
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

module.exports = returnController