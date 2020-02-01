import Api from '@/services/Api'

export default {
    convert(file) {
        return Api().post('convert', file)
    },
    sendimage(file) {
        return Api().post('sendimage', file)
    }
}