const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// const authentication = JSON.parse(localStorage.getItem("authentication"));

// const { token } = authentication?.authentication

const token = localStorage.getItem("adminToken") || "";

const customFetch = async (endpoint, options = {}) => {
  if (!BASE_URL && !token) {
    console.error("BASE_URL is not defined in the environment variables.");
    return null;
  }

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers, // Allow overriding headers if needed
    },
    body: options.body ? JSON.stringify(options.body) : undefined, // Automatically stringify body
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during fetch:", error.message);
    return null;
  }
};

export default customFetch;
