import { Store } from '@/store';// path to store file
import { UILogic } from '@/UILogic';// path to store file

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
    $UILogic: UILogic;
  }
}
