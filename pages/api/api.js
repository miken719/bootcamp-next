import { API_URL } from "@/config";

export const registerUser = async (body) => {
  const api = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await api.json();
  return data;
};

export const loginUser = async (body) => {
  const api = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await api.json();
  return data;
};

export const fetchBootcampByRadius = async (body) => {
  const api = await fetch(
    `${API_URL}/bootcamps/radius/${body.zipcode}/${body.distance}`
  );
  const data = await api.json();
  return data;
};

export const fetchBootcamps = async (page, pageSize) => {
  const api = await fetch(
    `${API_URL}/bootcamps?limit=${pageSize}&page=${page}`
  );
  const data = await api.json();
  return data;
};

export const fetchBootcampById = async (id) => {
  const api = await fetch(`${API_URL}/bootcamps/${id}`);
  const data = await api.json();
  return data;
};
export const fetchCoursesByBootcamp = async (id) => {
  const api = await fetch(`${API_URL}/bootcamps/${id}/courses`);
  const data = await api.json();
  return data;
};
