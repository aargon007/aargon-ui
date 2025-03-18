import {
    type BaseQueryApi,
    type BaseQueryFn,
    type DefinitionType,
    type FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import type { RootState } from '../store';
import { logoutUser, setToken } from '../features/accountSlice';

// create a new mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.EXPO_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).account.access_token;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    // wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result: any = await baseQuery(args, api, extraOptions);

    if (result?.data?.statusCode === 401) {
        // console.log(result);

        //* refresh token
        const refreshToken = (api.getState() as RootState).account.refresh_token;

        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const refreshResult: any = await baseQuery(
                    {
                        url: '/auth/token/refresh',
                        method: 'POST',
                        body: {
                            refresh_token: refreshToken,
                        },
                    },
                    api,
                    extraOptions
                );

                if (refreshResult?.data?.access_token) {
                    api.dispatch(setToken(refreshResult?.data?.access_token));

                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(logoutUser());
                }
            } catch (err) {
                console.log(err);
                api.dispatch(logoutUser());
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

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['user'],
    endpoints: () => ({}),
});
