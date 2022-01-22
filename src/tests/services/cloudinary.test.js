import cloudinary from 'cloudinary'
import { uploadImage } from 'services/cloudinary'
import { image } from 'tests/mocks/mock-image'

cloudinary.config({
    cloud_name: 'wayn3r',
    api_key: '517262149489143',
    api_secret: 'GTluLj7Vc2rRKzC0Wy7W_l352dw',
    secure: true,
})

describe('Pruebas sobre el servicio para subir imagenes a cloudinary', () => {
    test('debe devolver null', async () => {
        const file = new File([], 'chrome.png')
        const url = await uploadImage(file)
        expect(url).toBe(null)
    })
    // TODO: make this test work
    test('debe subir una imagen y devolver la url', done => {
        const url = uploadImage(image).then(url => {
            expect(typeof url).toBe('string')
            const id = url.split('/').reverse()[0].replace('.png', '')
            cloudinary.v2.uploader.destroy(id, {}, () => done())
        })
    })
})
