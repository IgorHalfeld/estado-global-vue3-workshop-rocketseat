export default httpClient => ({
  searchUsers: async ({ q = '' } = {}) => {
    try {
      const response = await httpClient.get('/search/users', { params: { q } })
      return response.data
    } catch (_) {
      throw new Error('Github search users error')
    }
  },
  getUserByUsername: async ({ username = '' } = {}) => {
    try {
      const response = await httpClient.get(`/users/${username}`)
      return response.data
    } catch (_) {
      throw new Error('Github get user by username error')
    }
  }
})
