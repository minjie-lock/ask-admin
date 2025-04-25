
import { useLockFn } from 'ahooks';
import { message as info } from 'antd';
import { AxiosError } from 'axios';

type FetchReturn = (...args: unknown[]) => Promise<unknown>;

type FetchOptions<F extends (...args: unknown[]) => unknown> = {

  /**
   * 代表请求成功的状态码
   * 默认 200
  */
  code?: number;

  message: {
    /**
     * 成功提示语
     */
    success?: string;
    /**
     * 错误提示语
     */
    error?: string;
    /**
     * loading 等待提示语
     */
    loading?: string;
  } | string;

  /**
   * 自定义请求成功且状态码匹配执行
   * @param data 
   * @returns 
   */
  onSuccess?: (data: Awaited<ReturnType<F>>) => void;
  /**
   * 自定义处理错误
   */
  onError?: (error: BaseError) => void;
}
/**
 * @function useFetch
 * @param fn 接口函数
 * @param options 消息配置项
 * @returns 
 */
export default function useFetch<F extends (...args: any) => any>(
  fn: F,
  options?: FetchOptions<F>,
): FetchReturn {

  if (typeof fn !== 'function') throw new Error('fn is not a function');

  const key = 'create' + Math.random();

  const {
    message,
    onSuccess: successFn,
    onError,
    code = 200
  } = options ?? {};


  const {
    success = '请求成功',
    error = '请求失败',
    loading = '请求中'
  } = typeof message === 'string' ?
      {
        success: message + '成功',
        error: message + '失败',
        loading: message + '中',
      } :
      message ?? {};



  const onFetch = useLockFn(
    async (...args) => {
      info.open({
        key,
        content: loading,
        type: 'loading',
        duration: 0,
      });
      try {
        const take = await fn(...args);
        if (take.code === code) {
          successFn?.(take);
          await info.open({
            key,
            content: success,
            type: 'success',
          });
        } else {
          if (typeof onError === 'function') {
            console.log(take);
            
            onError(take)
          } else {
            await info.open({
              key,
              content: error,
              type: 'error',
            });
          }
        }
        info.destroy(key);
        return take
      } catch (error) {
        if (typeof onError === 'function') return onError(error as BaseError);
        if (error instanceof AxiosError) {
          if (error?.code === 'ECONNABORTED') {
            await info.open({
              key,
              content: '请求超时',
              type: 'error',
            });
          }
        }
        info.destroy(key);
      }
    }
  )
  return onFetch;
}