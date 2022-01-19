import {
  AsyncThunkFulfilledActionCreator,
  AsyncThunkRejectedActionCreator,
} from "@reduxjs/toolkit/dist/createAsyncThunk";

export function asyncThunkIsRejected<Returned, ThunkArg, ThunkApiConfig>(
  asyncThunk:
    | ReturnType<AsyncThunkFulfilledActionCreator<Returned, ThunkArg>>
    | ReturnType<AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>>,
  typePrefix: string
): asyncThunk is ReturnType<
  AsyncThunkRejectedActionCreator<ThunkArg, ThunkApiConfig>
> {
  return asyncThunk.type === `${typePrefix}/rejected`;
}
