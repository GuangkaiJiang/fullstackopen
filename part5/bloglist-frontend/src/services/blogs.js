import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(id)
  console.log(newObject)
  const response =await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}
const blogService={ getAll, create, update,deleteBlog, setToken }
export default blogService