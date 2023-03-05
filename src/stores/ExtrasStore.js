import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useExtrasStore = defineStore('ExtrasStore', () => {
  const EXTRAS_URL = 'https://s3.eu-north-1.amazonaws.com/tribemock.colorline.com/extras.json'
  const CONTENT_URL = 'https://www.colorline.no/api/rest/extras?ignoreValidation'
  const extras = ref()
  const domain = ref('no')
  const contentIds = ref([])
  let products = ref([])
  const loaded = ref(false)
  const selectedProduct = ref()
  const selectedExtras = ref([])
  const errors = ref([])
  const noStrings = ["Extras om bord",
    "Min reise",
    "Pris pr stk. ",
    "Serveres i",
    "Sushi, trening, bading, golf - fordi det å slappe av på et cruise ikke alltid er nok!",
    "Lukk og tilbake",
    "Voksne",
    "Totalt"
  ]
  const comStrings = ["Extras on board",
    "My trip",
    "Price ",
    "Served in",
    "Sushi, training, pool, golf - because sometimes lounging on a cruise ship just isn't enough. Join us for some extra fun in the sun!",
    "Close and back",
    "Adults",
    "Total"
  ]

  function setLanguage() {
    domain.value === 'no' ? (domain.value = 'en') : (domain.value = 'no')
    localStorage.setItem('language', domain.value)
    fetchExtras().then(r => { return r});
  }

  function toggleDomain() {
    this.domain = this.domain === "no" ? "com" : "no"
    localStorage.setItem('language', this.domain.value)
  }
  function getDomain() {
    return this.domain === "no" ? "Norwegian" : "English";
  }
  function getStaticStrings() {
    return this.domain === "no" ? noStrings : comStrings;
  }
  function getNoStrings() {
    return noStrings;
  }
  function getComStrings() {
    return comStrings;
  }

  async function fetchExtras() {
      products.value.splice(0);
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
            domain: this.domain,
            getProducts: contentIds.value
          })
        })
        const extrasContent = await getContent.json()
        //   console.log(extrasContent)
        /*
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
        */
         products.value = mergeLists(extras.value, extrasContent);
        loaded.value = true
      } catch (error) {
        errors.value.push(error.toString())
      }

  }

  function mergeLists(extras, content) {
    let extrasList = JSON.parse(JSON.stringify(extras));
    return extrasList.Extras.map((extra, i) => Object.assign({}, extra, content.products[i]));
  }

  //set references of products to fetch content for
  function setContentIds() {
    extras.value['Extras'].map((extra) => {
      contentIds.value.push(extra.Reference)
    })
  }

  //set product for details modal
  function setProduct(reference) {
    selectedProduct.value = products.value.find((product) => product.reference === reference)
  }

  function getQuantity(reference) {
    return selectedExtras.value.find((extra) => extra.reference == reference)?.quantity || 0;
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
  }

  function removeProduct() {
    // let selected = { reference: selectedProduct.value.reference, quantity: quantity.value }

    let found = selectedExtras.value.find(
      (extra) => extra.reference == selectedProduct.value.reference
    )
    found.quantity > 1
      ? (found.quantity -= 1)
      : selectedExtras.value.splice(selectedExtras.value.indexOf(found), 1)
  }

  const quantity = computed(() => {
    let item = selectedExtras.value.find(
      (extra) => extra.reference == selectedProduct.value.reference
    )
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
    getStaticStrings,
    getNoStrings,
    getComStrings,
    getDomain,
    toggleDomain,
    setProduct,
    getQuantity,
    addProduct,
    removeProduct
  }
})
