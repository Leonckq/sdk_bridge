/***************************************************
 * Created by nanyuantingfeng on 2019/10/21 16:59. *
 ***************************************************/

export interface IMeInfoType {
  staff: Staff
  permissions: string[]
  home5: boolean
  isAuthorized: boolean
}

export interface Staff {
  version: number
  active: boolean
  createTime: number
  updateTime: number
  name: string
  nameSpell: string
  code: string
  corporationId: string
  userId: string
  id: string
  avatar: string
  email: null
  cellphone: string
  note: null
  departments: Department[]
  defaultDepartment: Department
  external: boolean
  order: null
  bankCardNums: BankCardNums
  corporation: Corporation
  roles: Roles
}

export interface BankCardNums {
  id: string
  values: any[]
}

export interface Corporation {
  version: number
  active: boolean
  createTime: number
  updateTime: number
  name: string
  nameSpell: string
  sourceChannel: string
  sourceId: string
  id: string
  address: string
  tel: string
  fax: string
  industry: string
  userId: null
}

export interface Department {
  version: number
  active: boolean
  createTime: number
  updateTime: number
  name: string
  nameSpell: string
  code: string
  corporationId: string
  parentId: string
  order: number
  id: string
}

export interface Roles {
  id: string
  version: number
  active: boolean
  createTime: number
  updateTime: number
  corporationId: string
  values: ValueElement[]
}

export interface ValueElement {
  roleDefId: string
  properties: Properties
  roleDef: RoleDef
}

export interface Properties {
  departmentId: string
}

export interface RoleDef {
  id: string
  version: number
  active: boolean
  createTime: number
  updateTime: number
  name: string
  nameSpell: string
  corporationId: string
  roleGroupId: string
  scope: Scope
  locked: boolean
  code: string
  type: string
  sourceType: string
  sourceTypeValue: null
  sourceName: string
  purposeType: string
  purposeTypeValue: null
  purposeName: string
  sourceChannel: string
}

export interface Scope {
  name: string
  properties: Properties
}
