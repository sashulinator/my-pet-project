import { MailingTemplateState, ParamsConfigState, RootState } from '@/type/state'

export const mailingTemplateState = (s: RootState): MailingTemplateState => s.mailingTemplateState
export const paramsConfigState = (s: RootState): ParamsConfigState => s.paramsConfigState
