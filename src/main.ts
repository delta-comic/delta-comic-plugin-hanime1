import "@/index.css"
import { definePlugin, Utils } from "delta-comic-core"
import { pluginName } from "./symbol"
import { inRange } from 'es-toolkit/compat'
import axios from 'axios'
const testAxios = axios.create({
  timeout: 10000,
  method: 'GET',
  validateStatus(status) {
    return inRange(status, 199, 499)
  },
})
testAxios.interceptors.response.use(undefined, Utils.request.utilInterceptors.createAutoRetry(testAxios, 2))
definePlugin({
  name: pluginName,
  api:{
    hm1: {
      forks: () => ['https://hanime1.me'],
      test: (fork, signal) => testAxios.get(fork, { signal })
    }
  },
  onBooted: async ins => {
    if (!isString(ins.api?.eh)) throw new Error('api not resolved')
    await initCookie()
    ehStore.api.value = Utils.request.createAxios(() => ins.api!.eh!.toString()!, {
      withCredentials: true,
      responseType: 'document'
    })
    Utils.eventBus.SharedFunction.define(signal => eh.api.search.getRandomComic(signal), pluginName, 'getRandomProvide')
  },
})
