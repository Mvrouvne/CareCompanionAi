export function auth() {
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  const checkIfAuth = async () => {
    let response;
    if (access_token || refresh_token) {
      response = await fetch(`http://localhost:8000/auth/jwt/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: `{"token": "${access_token}"}`,
      });
      if (response.ok) {
        return true;
      } else if (!response.ok && refresh_token) {
        response = await fetch(`http://localhost:8000/auth/jwt/refresh/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: `{"refresh": "${refresh_token}"}`,
        });
        if (response.ok) {
          const res = await response.json();
          console.log(res);
          localStorage.setItem("access_token", res.access);
          return true;
        } else {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          return false;
        }
      } else {
        console.log(response);
        localStorage.removeItem("access_token");
        return false;
      }
    }
    return false;
  };
  return checkIfAuth();
}
