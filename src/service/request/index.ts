import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { FWRequestInterceptors, FWRequestConfig } from './type'

class FWRequest {
  instance: AxiosInstance
  interceptors?: FWRequestInterceptors

  constructor(config: FWRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  request<T = any>(config: FWRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }

  get<T = any>(config: FWRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: FWRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
}

export default FWRequest
