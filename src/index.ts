import { SequelizeAdapter } from './adapter.js'
import type { SequelizeAdapterParams } from './declarations.js'
import type {
  Id,
  Paginated,
  Params,
  ServiceMethods,
} from '@feathersjs/feathers'
import type { PaginationOptions } from '@feathersjs/adapter-commons'
import type { PaginatedOrArray } from './internal.types.js'

export * from './declarations.js'
export * from './adapter.js'
export * from './hooks/index.js'
export { ERROR, errorHandler } from './utils.js'

export class SequelizeService<
    Result = any,
    Data = Partial<Result>,
    ServiceParams extends Params<any> = SequelizeAdapterParams,
    PatchData = Partial<Data>,
  >
  extends SequelizeAdapter<Result, Data, ServiceParams, PatchData>
  implements
    ServiceMethods<Result | Paginated<Result>, Data, ServiceParams, PatchData>
{
  async find<
    P extends ServiceParams & { paginate?: PaginationOptions | false },
  >(params?: P): Promise<PaginatedOrArray<Result, P>> {
    return this._find(params) as any
  }

  async get(id: Id, params?: ServiceParams): Promise<Result> {
    return this._get(id, params)
  }

  async create(data: Data, params?: ServiceParams): Promise<Result>
  async create(data: Data[], params?: ServiceParams): Promise<Result[]>
  async create(
    data: Data | Data[],
    params?: ServiceParams,
  ): Promise<Result | Result[]>
  async create(
    data: Data | Data[],
    params?: ServiceParams,
  ): Promise<Result | Result[]> {
    return this._create(data, params)
  }

  async update(id: Id, data: Data, params?: ServiceParams): Promise<Result> {
    return this._update(id, data, params)
  }

  async patch(id: Id, data: PatchData, params?: ServiceParams): Promise<Result>
  async patch(
    id: null,
    data: PatchData,
    params?: ServiceParams,
  ): Promise<Result[]>
  async patch(
    id: Id | null,
    data: PatchData,
    params?: ServiceParams,
  ): Promise<Result | Result[]> {
    return this._patch(id as any /** fighting overloads */, data, params)
  }

  async remove(id: Id, params?: ServiceParams): Promise<Result>
  async remove(id: null, params?: ServiceParams): Promise<Result[]>
  async remove(
    id: Id | null,
    params?: ServiceParams,
  ): Promise<Result | Result[]> {
    return this._remove(id as any /** fighting overloads */, params)
  }
}
