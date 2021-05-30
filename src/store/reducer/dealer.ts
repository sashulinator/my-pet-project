import { ReducerManager } from '@/util/reducerManager'

import * as CONSTANTS from '../constant/dealer'

const reducerManager = new ReducerManager(CONSTANTS)

export default reducerManager.reduce
