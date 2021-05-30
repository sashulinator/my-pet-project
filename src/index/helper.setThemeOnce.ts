import * as cssVariableActions from '@/store/action/cssVariable'
import { getCurrentThemeName } from '@/util/cssVariables'

import store from './redux/store'

export default function setThemeOnce(): void {
  store.dispatch(cssVariableActions.setTheme(getCurrentThemeName()))
}
