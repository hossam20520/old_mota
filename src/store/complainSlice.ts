import { Success } from "@/api/toastServices";
import { apiInstance, apiInstanceFetch } from "@/utils/ApiInstance";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserState {
  userPendingComplain: any[];
  userSolvedComplain: any[];
  doctorPendingComplain: any[];
  doctorSolvedComplain: any[];
  isLoading: boolean;
  isSkeleton: boolean;
}

const initialState: UserState = {
  userPendingComplain: [],
  userSolvedComplain: [],
  doctorPendingComplain: [],
  doctorSolvedComplain: [],
  isLoading: false,
  isSkeleton: false,
};

interface AllUsersPayload {
  start?: number;
  limit?: number;
  search: string;
  startDate?: string;
  endDate?: string;
  type?: string;
  meta: any;
  id?: string;
  data?: any;
  formData?: any;
  payload?: any;
}

export const getUserPendingComplain = createAsyncThunk(
  "admin/complain/get/userpending ",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/complain/get?type=1&person=2`);
  }
);
export const getUserSolvedComplain = createAsyncThunk(
  "admin/complain/get/usersolved",
  async (payload: AllUsersPayload | undefined) => {
    return apiInstanceFetch.get(`admin/complain/get?type=2&person=2`);
  }
);

export const getDoctorPendingComplain = createAsyncThunk(
  "admin/complain/get/doctorpending",
  async (payload: AllUsersPayload | undefined) => {
  
    console.log("payload" , payload)

    return apiInstanceFetch.get(`admin/complain/get?type=1&person=1`);
  }
);
export const getDoctorSolvedComplain = createAsyncThunk(
  "admin/complain/get/docotrsolved",
  async (payload: AllUsersPayload | undefined) => {

    console.log("payload" , payload)
    return apiInstanceFetch.get(`admin/complain/get?type=2&person=1`);
  }
);

export const deleteDoctorPendingComplain = createAsyncThunk(
  "admin/complain/delete/doctorpending",
  async (id) => {
    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)


export const deleteUserPendingComplain = createAsyncThunk(
  "admin/complain/delete/userpending",
  async (id) => {

    console.log("id" , id)

    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)

export const deleteUserSolveComplain = createAsyncThunk(
  "admin/complain/delete/userSolve",
  async (id) => {

    console.log("id" , id)

    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)


export const deleteDoctorSolveComplain = createAsyncThunk(
  "admin/complain/delete/doctorsolve",
  async (id) => {

    console.log("id" , id)

    return apiInstanceFetch.delete(`admin/complain/delete?complainId=${id}`);
  }
)

export const pendingToSolveUserComplain = createAsyncThunk(
  "admin/complain/solveUserComplain?",
  async (id)  => {
    console.log("id" , id)
    return apiInstance.put(`admin/complain/solveComplain?complainId=${id}`)
  }
)

export const pendingToSolveDoctorComplain = createAsyncThunk(
 
  "admin/complain/solveDoctorComplain?",
  async (id)  => {
    console.log("id" , id)
    return apiInstance.put(`admin/complain/solveComplain?complainId=${id}`)
  }
)


const complainSlice = createSlice({
  name: "complain",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getUserPendingComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );

    builder.addCase(
      getUserPendingComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.userPendingComplain = action.payload.data;
        }

        return state
      }
    );

    builder.addCase(
      getUserPendingComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
        return state
      }

    );

    builder.addCase(
      getUserSolvedComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getUserSolvedComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.userSolvedComplain = action.payload.data;
        }
      }
    );
    builder.addCase(
      getUserSolvedComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      getDoctorPendingComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getDoctorPendingComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.doctorPendingComplain = action.payload.data;
        }
      }
    );
    builder.addCase(
      getDoctorPendingComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      getDoctorSolvedComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = true;
      }
    );
    builder.addCase(
      getDoctorSolvedComplain.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.status) {
          state.isSkeleton = false;
          state.doctorSolvedComplain = action.payload.data;
        }
      }
    );
    builder.addCase(
      getDoctorSolvedComplain.rejected,
      (state, action: PayloadAction<any>) => {
        state.isSkeleton = false;
      }
    );

    builder.addCase(
      deleteDoctorPendingComplain.pending,
      (state, action: PayloadAction<any>) => {
        state.isLoading = true;
      }
    );


    builder.addCase(
      deleteDoctorPendingComplain.fulfilled,
      (state, action: any) => {

        console.log(action.payload)

        if (action.payload.status) {

          state.doctorPendingComplain = state.doctorPendingComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");


          console.log( state.doctorPendingComplain )
        }

        state.isLoading = false
      }
    );

    builder.addCase(
      deleteUserPendingComplain.fulfilled,
      (state, action: any) => {
        if (action.payload.status) {

          state.userPendingComplain = state.userPendingComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }

        state.isLoading = false
      }
    );

    builder.addCase(
      deleteUserSolveComplain.fulfilled,
      (state, action: any) => {

        console.log("deleteUserSolveComplain" , action.payload)

        if (action.payload.status) {

          state.userSolvedComplain = state.userSolvedComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }

        state.isLoading = false
      }
    )

    builder.addCase(
      deleteDoctorSolveComplain.fulfilled,
      (state, action: any) => {

        console.log("deleteDoctorSolveComplain" , action.payload)

        if (action.payload.status) {

          state.doctorSolvedComplain = state.doctorSolvedComplain.filter((complain) => complain._id !== action?.meta?.arg)
          Success("Complain Delete Successfully");
        }

        state.isLoading = false
      }
    )

    builder.addCase(
      pendingToSolveUserComplain.fulfilled ,
      (state, action: any) => {
        console.log(action.payload.data)
        if (action.payload.status) {
          state.userPendingComplain = state.userPendingComplain.filter((usercomplain) => usercomplain._id !== action?.meta?.arg)
          state.userSolvedComplain = state.userSolvedComplain.concat(action?.payload?.data)
          Success("Complain Solve Successfully");
        }
        state.isLoading = false
      }
    )

    builder.addCase(
      pendingToSolveDoctorComplain.fulfilled ,
      (state, action: any) => {
        console.log(action.payload.data)
        if (action.payload.status) {
          state.doctorPendingComplain = state.doctorPendingComplain.filter((doctorcomplain) => doctorcomplain._id !== action?.meta?.arg)
          state.doctorSolvedComplain = state.doctorSolvedComplain.concat(action?.payload?.data)
          Success("Complain Solve Successfully");
        }
        state.isLoading = false
      }
    )
  },
});

export default complainSlice.reducer;
