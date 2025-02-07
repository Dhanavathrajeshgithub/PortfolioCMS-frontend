const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.post("http://localhost:5000/api/auth/login", {
    email,
    password,
  });
  localStorage.setItem("token", res.data.token);
};
