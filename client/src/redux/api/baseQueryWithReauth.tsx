import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { login, logout } from "../slices";
import { Mutex } from "async-mutex";

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3002/",
  prepareHeaders: (headers, { getState }) => {
    const userAuthData = localStorage.getItem("userAuthData");
    const parsedUserAuthData = userAuthData && JSON.parse(userAuthData);

    if (parsedUserAuthData?.access_token) {
      headers.set(
        "Authorization",
        `Bearer ${parsedUserAuthData.access_token}`
      );
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          "/refresh-token",
          api,
          extraOptions
        );
        if (refreshResult.data) {
          localStorage.setItem(
            "userAuthData",
            JSON.stringify(refreshResult.data)
          );
          // api.dispatch(login(refreshResult.data as IAuth));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        } else {
          localStorage.setItem("userAuthData", JSON.stringify(null));
          api.dispatch(logout());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
