import { watch, ref } from 'vue'
export default function (key: string, value?: string) {
  const data = ref(value)
  if (value) {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    data.value = JSON.parse(localStorage.getItem(key)!)
  }
  watch(data, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  })
  return data
}
