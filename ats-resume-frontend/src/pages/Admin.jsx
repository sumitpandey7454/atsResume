import { useState, useEffect } from 'react'
import API from '../api/axios'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import toast from 'react-hot-toast'

const Admin = () => {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [activeTab, setActiveTab] = useState('stats')

  useEffect(() => {
    API.get('/api/admin/stats').then(r => setStats(r.data))
    API.get('/api/admin/users').then(r => setUsers(r.data))
    API.get('/api/messages/all').then(r => setMessages(r.data))
  }, [])

  const handleMarkRead = async (id) => {
    try {
      await API.put(`/api/messages/${id}/read`)
      setMessages(messages.map(m => m.id === id ? { ...m, isRead: true } : m))
    } catch (e) {
      toast.error('Failed')
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/messages/${id}`)
      setMessages(messages.filter(m => m.id !== id))
      toast.success('Deleted')
    } catch (e) {
      toast.error('Failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10 flex-1 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          👑 Admin Dashboard
        </h1>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-3xl font-bold text-blue-600">{stats.totalUsers || 0}</p>
              <p className="text-gray-500 mt-1 text-sm">Total Users</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-3xl font-bold text-green-600">{stats.totalResumes || 0}</p>
              <p className="text-gray-500 mt-1 text-sm">Total Resumes</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <p className="text-3xl font-bold text-purple-600">
                {messages.filter(m => !m.isRead).length}
              </p>
              <p className="text-gray-500 mt-1 text-sm">Unread Messages</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center border-2 border-orange-100">
              <p className="text-3xl font-bold text-orange-600">
                {stats.totalVisitors || 0}
              </p>
              <p className="text-gray-500 mt-1 text-sm">Total Visitors</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center border-2 border-red-100">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-3xl font-bold text-red-500">
                  {stats.liveUsers || 0}
                </p>
              </div>
              <p className="text-gray-500 text-sm">Live Now</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {['stats', 'messages', 'users'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {tab === 'messages'
                ? `Messages (${messages.filter(m => !m.isRead).length} unread)`
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                <p className="text-4xl mb-2">💬</p>
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id}
                  className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
                    msg.isRead ? 'border-gray-200' : 'border-blue-500'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-semibold text-gray-800">{msg.name}</p>
                        {!msg.isRead && (
                          <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      {msg.email && (
                        <p className="text-sm text-gray-500 mb-2">📧 {msg.email}</p>
                      )}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {msg.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(msg.createdAt).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {!msg.isRead && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="bg-green-50 text-green-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-100"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="bg-red-50 text-red-500 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
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
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        user.role === 'ADMIN'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-center py-8">
              Platform statistics shown in cards above ☝️
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Admin