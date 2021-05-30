import { getСurrent } from '@/util/route-constant'

import ROUTES from '@/constant/routes'

export default function setPageTitle(): void {
  document.title = `Gaz Dealer | ${getСurrent({ ...ROUTES })?.NAME || ''}`
}
