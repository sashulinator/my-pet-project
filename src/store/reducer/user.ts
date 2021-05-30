import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/user'

const reducerManager = new ReducerManager(CONSTANTS)

export default reducerManager.reduce
