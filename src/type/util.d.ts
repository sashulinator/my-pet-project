import { Moment } from 'moment'
import { PageableRow } from './type'

export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> }

export type ExcludePagination<Filter> = Exclude<Filter, PageableRow>

export type Filter<T, U> = T extends U ? T : never

export type ValueOf<T> = T[keyof T]

export type ExtractArrayType<T> = T extends (infer U)[] ? U : never

type StringIfString<T> = T extends string ? string : T

type FormDataField = Record<string, string, string[], Moment>

export type FormSchema<T extends FormDataField> = {
  [P in keyof T]: T[P] extends Moment
    ? {
        name: P
        label?: string
      }
    : T[P] extends string
    ? {
        name: P
        label?: string
        value: {
          [K in T[P]]: K
        }
      }
    : {
        name: P
        label?: string
        value: StringIfString<
          {
            [K in ExtractArrayType<Filter<T[P], string[]>>]: K
          }
        >
      }
}
