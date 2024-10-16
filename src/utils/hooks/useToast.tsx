import { ToastOptions, toast } from 'react-toastify'

export function useToast(
  defaultOptions: ToastOptions<{}> = {
    position: 'top-right',
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: 'dark',
  },
) {
  const success = (data: string) =>
    toast(data, { ...defaultOptions, type: 'success' })

  const showError = (data: string) =>
    toast(data, { ...defaultOptions, type: 'error' })

  const info = (data: string) =>
    toast(data, { ...defaultOptions, type: 'info' })

  return { success, showError, info }
}
