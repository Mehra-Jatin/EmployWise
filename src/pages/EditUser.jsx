import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "", avatar: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkToken = setInterval(() => {
      if (!localStorage.getItem("token")) {
        toast.warn("Session expired. Please log in again.");
        localStorage.clear(); // Clear local storage
        navigate("/");
      }
    }, 1000); // Check every second

    return () => clearInterval(checkToken);
  }, [navigate]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://reqres.in/api/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch user data");
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!user.first_name || !user.last_name || !user.email) {
      toast.warning("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      
      if (response.status === 200) {
        toast.success("User updated successfully!");
        navigate("/users");
      }
    } catch (error) {
      toast.error("Failed to update user");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  if (loading && !user.first_name) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center mb-4">
          <img src={user.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border border-gray-300" />
          <h2 className="text-xl font-semibold mt-2">Edit User</h2>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" value={user.email} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500" />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => navigate("/users")} className="px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md">{loading ? "Saving..." : "Save Changes"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
