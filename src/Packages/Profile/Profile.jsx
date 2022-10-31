import {
  Button,
  IconButton,
  Dialog,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { useAuthContext } from "../../Context";
import { CourcesList } from "../Cources";
import { EditProfileDialog } from "./EditProfileDialog/EditProfileDialog";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const bull = (
  <span className="mx-2 scale-60 inline-block text-gray-700">•</span>
);

export const Profile = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState();
  const { logout } = useAuthContext();
  const token = localStorage.getItem("token");
  const AuthorizationHeader = `Bearer ${token}`;
  const [userDetail, setUserDetail] = useState([]);
  const userDetailHandler = async () => {
    const data = await axios({
      method: "get",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: AuthorizationHeader,
      },
      url: "http://localhost:8000/student/detail/",
    });
    setUserDetail(data.data.user_detail[0]);

    console.log("user detail data", data.data.user_detail);
  };

  useEffect(() => {
    toast.promise(userDetailHandler(), {
      loading: "Saving...",
      success: <b>Registraton Successful!</b>,
      error: (err) => err.message,
    });
  }, []);

  if (!userDetail) {
    return null;
  }

  const logout_function = () => {
    logout();
    navigate('/login');
  
  };

  const { first_name, last_name, username, email } = userDetail;
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <IconButton onClick={() => setShowDialog(true)}>
              <FiEdit2 />
            </IconButton>
            <Dialog
              open={showDialog}
              fullWidth
              onClose={() => setShowDialog(false)}
            >
              <DialogTitle>
                <div className="flex justify-between">
                  <p>Edit Profile</p>
                  <IconButton onClick={() => setShowDialog(false)}>
                    <FiX />
                  </IconButton>
                </div>
              </DialogTitle>
              <EditProfileDialog
                initialValue={{ first_name, last_name, username, email }}
              />
            </Dialog>
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">
              {first_name} {last_name}
            </p>
            <div className="flex items-center">
              <p className="text-indigo-700 text-sm font-medium tracking-wider">
                @{username}
              </p>
              {bull}
              <p className=" text-sm font-medium text-gray-500">{email}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button color="error" onClick={logout_function}>
            Logout
          </Button>
        </div>
      </div>
      <CourcesList />
    </div>
  );
};
