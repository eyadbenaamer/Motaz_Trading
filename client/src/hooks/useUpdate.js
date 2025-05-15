import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logout, setAuthStatus, setProfile } from "state";

import axiosClient from "utils/AxiosClient";

const useUpdate = () => {
  const { isLoggedin } = useSelector((state) => state.authStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedin) {
      return;
    }
    axiosClient(`/login`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(setProfile(response.data.profile));
          dispatch(setAuthStatus({ isLoggedin: true }));
        }
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [isLoggedin]);
};

export default useUpdate;
