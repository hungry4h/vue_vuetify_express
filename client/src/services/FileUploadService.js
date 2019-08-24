import Api from '@/services/Api'

export default {
    index (search) {
        return Api().get('files', {
            params: {
                search: search
            }
        })
    },
    show (fileId) {
        return Api().get(`file/${fileId}`)
    },
    post (formData) {
        return Api().post('fileupload', formData)
    }
}
