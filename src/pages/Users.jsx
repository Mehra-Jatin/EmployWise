import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists, otherwise redirect to login
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.clear(); // Clear local storage
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(res.data.data);
        setFilteredUsers(res.data.data); // Initialize with full user list
        setTotalPages(res.data.total_pages);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, navigate]);

  // Listen for token removal and redirect to login if deleted
  useEffect(() => {
    const checkToken = setInterval(() => {
      if (!localStorage.getItem("token")) {
        toast.warn("Session expired. Please log in again.");
        localStorage.clear();
        navigate("/");
      }
    }, 1000);

    return () => clearInterval(checkToken);
  }, [navigate]);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users); // Reset to full user list if search is empty
    } else {
      setFilteredUsers(
        users.filter((user) =>
          `${user.first_name} ${user.last_name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, users]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://reqres.in/api/users/${id}`);
      if (response.status === 204) {
        toast.success("User deleted successfully!");
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete user");
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Users List</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {loading && (
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:px-20 gap-12">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-white shadow-lg rounded-lg p-4 text-center relative hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-3">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-20 h-20 rounded-full border-4 border-gray-300 object-cover"
                />
              </div>

              <h3 className="text-lg font-bold text-gray-800">
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">{user.email}</p>

              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => navigate(`/edit/${user.id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No users found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || loading}
          className={`px-4 py-2 rounded-lg ${
            page === 1 || loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Previous
        </button>

        <span className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages || loading}
          className={`px-4 py-2 rounded-lg ${
            page === totalPages || loading ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Users;
