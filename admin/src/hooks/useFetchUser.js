import { useEffect, useState } from "react";

import axiosClient from "utils/AxiosClient";

const useFetchUser = (_id) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (_id) {
      axiosClient(`admin/get_user?_id=${_id}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => setUser("not found"));
    }
  }, [_id]);
  return [user, setUser];
};

export default useFetchUser;
