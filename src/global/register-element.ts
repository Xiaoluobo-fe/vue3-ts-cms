import 'element-plus/dist/index.css'
import {
  ElAlert,
  ElAside,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio
} from 'element-plus'
import { App } from 'vue'

const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElAlert,
  ElAside
]
export default function (app: App): void {
  for (const component of components) {
    if (component.name) {
      app.component(component.name, component)
    }
  }
}
