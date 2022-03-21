export default (axios) => ({
  async getAllBooks() {
    try {
      const response = await axios.get('/api/books.json/')
      return {
        response,
      }
    } catch (error) {
      const response = error.response
      return {
        response,
      }
    }
  },
  async editBook(item, id) {
    try {
      const response = await axios.put(`/api/books/${id}.json/`, item)
      return {
        response,
      }
    } catch (error) {
      const response = error.response
      return {
        response,
      }
    }
  },
  async createBook(item) {
    try {
      const response = await axios.post('/api/books.json/', item)
      return {
        response,
      }
    } catch (error) {
      const response = error.response
      return {
        response,
      }
    }
  },
  async deleteBook(id) {
    try {
      const response = await axios.delete(`/api/books/${id}.json/`)
      return {
        response,
      }
    } catch (error) {
      const response = error.response
      return {
        response,
      }
    }
  },
})
