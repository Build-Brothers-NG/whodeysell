import React, { useState, useEffect, createContext } from "react";
import { getCookie, setCookie, delCookie } from "./useCookie";
export const GlobalContext = createContext();
import { useRouter } from "next/router";
export const GlobalProvider = ({ children, loading, load, changeTheme }) => {
  const router = useRouter();
  const def = {
    authenticated: false,
    token: null,
    name: "",
    id: "",
    email: "",
  };
  const [user, setUser] = useState({});
  const [location, setLocation] = useState({ location: "all" });
  const [loads, setLoads] = useState(false);
  const [theme, setTheme] = useState(getCookie("wds_theme"));
  const [search, setSearch] = useState("");
  const [video, showVideo] = useState(false);

  useEffect(() => {
    setCookie("wds_theme", theme || "dark");
    changeTheme(theme || "dark");
  }, [theme]);

  const logOut = () => {
    setUser(def);
    delCookie("wds_user");
    setTimeout(() => {
      if (getCookie("wds_user")) {
        delCookie("wds_user");
      }
    }, 1000);
  };
  const makeSearch = () => {
    if (search.trim().length !== 0) {
      router.push(
        `/search?q=${search.trim()}&api=true&city=${
          location.location === "all" ? "" : location.location
        }`
      );
    }
  };

  useEffect(() => {
    loading(loads);
  }, [loads]);

  useEffect(() => {
    if (getCookie("wds_user")) {
      setUser(getCookie("wds_user"));
    } else {
      setUser(def);
    }
    if (getCookie("wds_location")) {
      setLocation(getCookie("wds_location"));
    }
    if (getCookie("wds_theme")) {
      changeTheme(getCookie("wds_theme"));
    }
  }, []);

  useEffect(() => {
    if (!getCookie("wds_user") && user.authenticated) {
      setCookie("wds_user", user);
    }
  }, [user]);

  const changeLocation = (loc) => {
    setCookie("wds_location", loc);
    setLocation(loc);
    const temp = { ...router.query };
    temp.city = loc.location;
    if (loc.location === "all") {
      delete temp.city;
    }
    router.replace({ path: router.pathname, query: { ...temp } });
  };

  // useEffect(() => {
  //   setCookie("wds_location", location);
  //   const temp = { ...router.query };
  //   temp.city = location.location;
  //   if (location.location === "all") {
  //     delete temp.city;
  //   }
  //   router.replace({ path: router.pathname, query: { ...temp } });
  // }, [location]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        location,
        setLocation,
        loads,
        setLoads,
        logOut,
        theme,
        setTheme,
        search,
        setSearch,
        makeSearch,
        changeLocation,
        video,
        showVideo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
