import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useExtrasStore = defineStore('ExtrasStore', () => {
  const EXTRAS_URL = 'https://s3.eu-north-1.amazonaws.com/tribemock.colorline.com/extras.json'
  const CONTENT_URL = 'https://www.colorline.no/api/rest/extras?ignoreValidation'
  const extras = ref()
  const domain = ref('no')
  const contentIds = ref([])
  const products = ref([])
  const loaded = ref(false)
  //   const quantity = ref(0) //this comes from the number of pasengers traveling on this booking
  const selectedProduct = ref()
  const selectedExtras = ref([])
  const errors = ref([])

  //toggle language. This can come from user settings if logged in or from an array of existing languages in the system that can be set to the local storage
  function setLanguage() {
    domain.value == 'no' ? (domain.value = 'en') : (domain.value = 'no')
    localStorage.setItem('language', domain.value)
  }

  async function fetchExtras() {
    if (products.value.length == 0) {
      try {
        const getExtras = await fetch(EXTRAS_URL)
        extras.value = await getExtras.json()
        //   console.log(extras.value['Extras'])
        setContentIds()

        const getContent = await fetch(CONTENT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sailingsReference: 'OOOYYY000000000000',
            domain: domain.value,
            getProducts: contentIds.value
          })
        })
        const extrasContent = await getContent.json()
        //   console.log(extrasContent)
        for (let i = 0; i < extras.value['Extras'].length; i++) {
          const obj1 = extras.value['Extras'][i]
          for (let j = 0; j < extrasContent.products.length; j++) {
            const obj2 = extrasContent.products[j]
            if (obj1.Reference === obj2.reference && obj1.Status === 'available') {
              const mergedObj = { ...obj1, ...obj2 }
              products.value.push(mergedObj)
            }
          }
        }
        loaded.value = true
      } catch (error) {
        errors.value.push(error.toString())
      }
    }
  }

  //set references of products to fetch content for
  function setContentIds() {
    extras.value['Extras'].map((extra) => {
      contentIds.value.push(extra.Reference)
    })
  }

  //set product for details modal
  function setProduct(reference) {
    // quantity.value = 1
    selectedProduct.value = products.value.find((product) => product.reference === reference)
    console.log(selectedProduct.value)
  }

  function addProduct() {
    let selected = { reference: selectedProduct.value.reference, quantity: 1 }
    let found = selectedExtras.value.find(
      (extra) => extra.reference == selectedProduct.value.reference
    )
    if (found) {
      found.quantity += 1
    } else {
      selectedExtras.value.push(selected)
    }
    console.log(selectedExtras.value)
  }

  function removeProduct() {
    // let selected = { reference: selectedProduct.value.reference, quantity: quantity.value }

    let found = selectedExtras.value.find(
      (extra) => extra.reference == selectedProduct.value.reference
    )
    found.quantity > 1
      ? (found.quantity -= 1)
      : selectedExtras.value.splice(selectedExtras.value.indexOf(found), 1)
    console.log(selectedExtras.value)
  }

  const quantity = computed(() => {
    let item = selectedExtras.value.find(
      (extra) => extra.reference == selectedProduct.value.reference
    )
    console.log(item)
    return item ? item.quantity : 0
  })

  return {
    extras,
    products,
    loaded,
    domain,
    quantity,
    selectedProduct,
    selectedExtras,
    errors,
    fetchExtras,
    setLanguage,
    setProduct,
    addProduct,
    removeProduct
  }
})
