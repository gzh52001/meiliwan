import axios from "axios/dist/axios"

const request = axios.create({
    baseURL: "/dev",
    timeout: 2000
})

export default request