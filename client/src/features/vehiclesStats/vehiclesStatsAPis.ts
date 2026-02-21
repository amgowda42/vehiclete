import apiSlice from '@/app/apiSlice';

export interface IVehicleStats {
  available: number;
  total: number;
  unavailable: number;
}

export interface IVehicleSummary {
  totalAvailable: number;
  totalUnavailable: number;
  totalVehicles: number;
}

export interface IVehicleStatsData {
  bikes: IVehicleStats;
  cars: IVehicleStats;
  cycles: IVehicleStats;
  summary: IVehicleSummary;
}

export interface IGetVehicleStatsResponse {
  data: IVehicleStatsData;
  message: string;
  success: boolean;
}

export const vehiclesStatsApis = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getVehiclesStats: builder.query<IGetVehicleStatsResponse, void>({
      query: () => ({
        url: '/vehiclesStats',
      }),
    }),

    getVehicleById: builder.query({
      query: (id: string) => ({
        url: `/vehicle/${id}`,
      }),
    }),
  }),
});

export const { useGetVehiclesStatsQuery, useGetVehicleByIdQuery } = vehiclesStatsApis;
