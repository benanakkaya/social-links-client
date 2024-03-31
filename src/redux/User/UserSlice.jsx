import cookieSet from "@/hooks/cookieSet";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import mongoose from "mongoose";
import { toast } from "react-toastify";

export const loginSubmit = createAsyncThunk("/user/login", async (values, thunkAPI) => {
    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, values)
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const registerSubmit = createAsyncThunk("/user/register", async (values, thunkAPI) => {
    try {
        const registerValues = { username: values.username, email: values.email, password: values.password }
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, registerValues);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getUser = createAsyncThunk("/get-user/", async (username) => {
    const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user/${username}`);
    return res.data;
})

export const updateUserDetails = createAsyncThunk("/user/updateUserDetails", async (_, { getState }) => {
    const { user } = getState();
    const values = user.userInformation;
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/update-user-details`, { id: values.id, firstName: values.firstName, lastName: values.lastName, email: values.email, profilePicture: values.profilePicture, profileColor: values.profileColor, isHiddenEmail: values.isHiddenEmail })
    return res.data;
})

export const updateLinks = createAsyncThunk("/user/updateLinks", async (_, { getState }) => {
    const { user } = getState();
    const values = user.userInformation;
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/update-links`, { id: values.id, links: values.links })
    return res.data;
})


const initialState = {
    isLoginned: false,
    userInformation: { id: "", email: "", username: "", firstName: "", lastName: "", profilePicture: "", isHiddenEmail: false, profileColor: "#FFFF", links: [] },
    backupInformation: { id: "", email: "", username: "", firstName: "", lastName: "", profilePicture: "", isHiddenEmail: false, profileColor: "#FFFF", links: [] },
    newProfilePicture: "",
    buttonStatus: true,
    isChanged: false
}

const UserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addLink: (state) => {
            const newID = new mongoose.Types.ObjectId().toString();
            state.userInformation = {
                ...state.userInformation,
                links: [
                    ...state.userInformation.links,
                    {
                        _id: newID,
                        platform: "Twitter",
                        link: ""
                    }
                ]
            }
        },
        editLink: (state, action) => {
            const newLinks = state.userInformation.links.map((li, ind) => {
                if (ind !== action.payload.index) {
                    return li
                }
                return { _id: li._id, platform: action.payload.platform, link: action.payload.link }
            })

            state.userInformation = { ...state.userInformation, links: newLinks }
        },
        deleteLink: (state, action) => {
            const newLinks = state.userInformation.links.filter((li, ind) => {
                return ind !== action.payload
            })
            state.userInformation = { ...state.userInformation, links: newLinks }
        },
        swapLinks: (state, action) => {
            state.userInformation = { ...state.userInformation, links: action.payload }
        },
        editProfile: (state, action) => {
            if (action.payload.type === "checkbox") {
                state.userInformation = { ...state.userInformation, [action.payload.name]: action.payload.checked }
            } else {
                state.userInformation = { ...state.userInformation, [action.payload.name]: action.payload.value }
            }
        },
        setNewProfilePicture: (state, action) => {
            state.newProfilePicture = action.payload;
        },
        setLogout: (state) => {
            state.isLoginned = false;
            state.userInformation = { id: "", email: "", username: "", firstName: "", lastName: "", profilePicture: "", links: [] };
            state.backupInformation = { id: "", email: "", username: "", firstName: "", lastName: "", profilePicture: "", links: [] };
            Cookies.remove("token");
        },
        setIsChanged: (state, action) => {
            state.isChanged = action.payload;
        },
        setUserInformation: (state, action) => {
            state.userInformation = action.payload;
            state.backupInformation = action.payload;
            state.newProfilePicture = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerSubmit.fulfilled, (state, action) => {
            state.isLoginned = true;
            state.userInformation = action.payload.user;
            cookieSet("token", action.payload.token)
            toast.success(action.payload.message);
            state.buttonStatus = true;
        }).addCase(registerSubmit.rejected, (state, action) => {
            toast.error(action.payload.response.data.message);
            state.buttonStatus = true;
        }).addCase(registerSubmit.pending, (state) => {
            state.buttonStatus = false;
        }),
            builder.addCase(loginSubmit.fulfilled, (state, action) => {
                state.isLoginned = true;
                state.userInformation = action.payload.user;
                cookieSet("token", action.payload.token)
                toast.success(action.payload.message);
                state.buttonStatus = true;
            }).addCase(loginSubmit.rejected, (state, action) => {
                toast.error(action.payload.response.data.message)
                state.buttonStatus = true;
            }).addCase(loginSubmit.pending, (state) => {
                state.buttonStatus = false;
            }),
            builder.addCase(updateUserDetails.fulfilled, (state, action) => {
                state.userInformation = action.payload.user;
                state.backupInformation = action.payload.user;
                toast.success(action.payload.message);
                state.buttonStatus = true;
            }).addCase(updateUserDetails.pending, (state) => {
                state.buttonStatus = false;
            }),
            builder.addCase(updateLinks.fulfilled, (state, action) => {
                state.userInformation = action.payload.user;
                state.backupInformation = action.payload.user;
                toast.success(action.payload.message);
                state.buttonStatus = true;
            }).addCase(updateLinks.pending, (state) => {
                state.buttonStatus = false;
            }),
            builder.addCase(getUser.fulfilled, (state, action) => {
                state.userInformation = action.payload.user;
                state.backupInformation = action.payload.user;
            }).addCase(getUser.rejected, (state) => {
                state.userInformation = { id: "", email: "", username: "", firstName: "", lastName: "", profilePicture: "", isHiddenEmail: false, profileColor: "#FFFF", links: [] }
                state.backupInformation = { id: "", email: "", username: "", firstName: "", lastName: "", profilePicture: "", isHiddenEmail: false, profileColor: "#FFFF", links: [] }
            })
    }
})

export default UserSlice.reducer;

export const { addLink, editLink, deleteLink, swapLinks, editProfile, setNewProfilePicture, setLogout, setIsChanged, setUserInformation } = UserSlice.actions;