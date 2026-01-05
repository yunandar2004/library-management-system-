export const apiURL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const userLogin = async (payload) => {
  const res = await fetch(`${apiURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // return both res and parsed JSON
  const data = await res.json();
  return { res, data };
};

export const userRegister = async (payload) => {
  const res = await fetch(`${apiURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return res.json();
};
