const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const handleLoginAdmin = async ({ email, password }) => {
  if (!BASE_URL) {
    console.error("BASE_URL is not defined in the environment variables.");
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/camp/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login Successful:", data);

    return data;
  } catch (error) {
    console.error("Error during login:", error.message);
    return null;
  }
};
