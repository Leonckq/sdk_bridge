/***************************************************
 * Created by nanyuantingfeng on 2019/10/18 18:04. *
 ***************************************************/
import { Fetch } from '@ekuaibao/fetch'
import { IResponseObjectData } from '../../model-types/IResponseType'
import { IMeInfoType } from '../../model-types/IMeInfoType'

export async function getMeInfo(): Promise<IMeInfoType> {
  const data: IResponseObjectData<IMeInfoType> = await Fetch.GET('/api/v1/organization/staffs/me')
  return data.value
}
