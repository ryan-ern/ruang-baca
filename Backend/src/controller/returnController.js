const returnService = require("../service/returnService")

class returnController {
    static async getDenda(req, res) {
        try {
            const denda = await returnService.getDenda()
            const response = {
                status: 200,
                message: 'Menampilkan Denda Sukses',
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
                message: 'Edit Denda Sukses',
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
}

module.exports = returnController