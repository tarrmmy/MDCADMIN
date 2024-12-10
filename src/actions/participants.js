import customFetch from "../config/fetchConfig";

export const handleGetAllParticipants = async ({ page, size }) => {
  const endpoint = `/camp/admin/participant?page=${page}&size=${size}`;

  try {
    const data = await customFetch(endpoint, { method: "GET" });
    console.log("Fetch Successful", data);
    return data;
  } catch (error) {
    console.error("Error fetching participants:", error.message);
    return null;
  }
};

export const handleGetParticipantStat = async () => {
  const endpoint = `/camp/admin/participant/stat`;

  try {
    const data = await customFetch(endpoint, { method: "GET" });
    console.log("Fetch Successful", data);
    return data;
  } catch (error) {
    console.error("Error fetching participants:", error.message);
    return null;
  }
};
