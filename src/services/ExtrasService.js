import axios from 'axios'

const EXTRAS_URL = 'http://s3.eu-north-1.amazonaws.com/tribemock.colorline.com/extras.json'
const CONTENT_URL = 'https://www.colorline.no/api/rest/extras?ignoreValidation'

export const getExtras = () =>
  axios.get(EXTRAS_URL).then((response) => {
    if (response.data) {
      return new Promise((resolve) => resolve(response.data))
    } else {
      return Promise.reject(`Could not fetch extras`)
    }
  })

export const getExtrasContent = (products, domain) => {
  const requestBody = {
    sailingsReference: 'OOOYYY000000000000',
    domain: domain,
    getProducts: products
  }
  axios.post(CONTENT_URL, requestBody).then((response) => {
    if (response.data) {
      console.log(response.data)
      return response.data
    } else {
      return Promise.reject(`Could not fetch content`)
    }
  })
}
