import { ReducerManager } from '@/util/reducerManager'
import { getAll } from '@/util/cssVariables'

import * as CONSTANTS from '../constant/cssVariable'

export const initState = getAll()

const reducerManager = new ReducerManager(CONSTANTS, initState)

export default reducerManager.reduce
