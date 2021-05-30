import { Action } from 'redux'

import { RootState } from '@/type/state'

import { OnFail, OnSuccess, SuccessActionParams } from '@savchenko91/rc-redux-api-mw'

export function replaceLocallyByIdAfterCRUD(
  stateName: keyof RootState,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  set: (state: any) => Action,
  onEnd?: OnSuccess | OnFail,
) {
  return (props: SuccessActionParams): void => {
    const { list } = (props.store.getState() as RootState)[stateName]

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entity = props.action.payload as any

    props.store.dispatch(
      set({
        list: list.map((i: { id: string }) => (i.id.toString() === entity.id.toString() ? entity : i)),
      }),
    )

    onEnd?.(props)
  }
}
