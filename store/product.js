export const strict = false
export const state = () => ({
  product: {
    authors: [''],
    categories: [''],
    avg_rating: '0.0',
    book_price: '',
    sale: null,
    final_price: '',
    isbn: '',
    longDescription: '',
    shortDescription: '',
    pageCount: '',
    publishedDate: {
      date: '',
    },
    status: 'PUBLISH',
    thumbnailUrl: '',
    title: '',
  },
  tempProduct: {},
  quantity: '0',
  order: {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  },
})

export const mutations = {
  setTemp(state, payload) {
    state.tempProduct = { ...payload }
  },
  setProduct(state, payload) {
    state.product = { ...payload }
  },
  setQuantity(state, payload) {
    state.quantity = payload
  },
}
