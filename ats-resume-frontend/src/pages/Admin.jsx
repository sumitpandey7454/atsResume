import { useState, useEffect } from 'react'
import API from '../api/axios'
import Navbar from '../components/common/Navbar'

const Admin = () => {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    API.get('/api/admin/stats').then(r => setStats(r.data))
    API.get('/api/admin/users').then(r => setUsers(r.data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        {stats && (
          <div className="grid grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
              <p className="text-gray-500 mt-2">Total Users</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
              <p className="text-4xl font-bold text-green-600">
                {stats.totalResumes}
              </p>
              <p className="text-gray-500 mt-2">Total Resumes</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Name</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Email</th>
                <th className="text-left p-4 text-sm font-medium text-gray-600">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-50">
                  <td className="p-4 text-sm text-gray-800">{user.name}</td>
                  <td className="p-4 text-sm text-gray-500">{user.email}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs">
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Admin