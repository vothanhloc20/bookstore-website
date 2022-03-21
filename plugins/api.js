import Books from '@/api/books.js'

export default (context, inject) => {
  const factories = {
    books: Books(context.$axios),
  }
  inject('api', factories)
}
