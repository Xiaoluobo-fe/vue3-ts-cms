import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

export interface FWRequestInterceptors {
  // 请求拦截：入参/出参都用 InternalAxiosRequestConfig
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

export interface FWRequestConfig extends AxiosRequestConfig {
  interceptors?: FWRequestInterceptors
}
