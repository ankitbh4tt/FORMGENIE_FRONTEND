import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApi } from "../../services/api";

interface DashboardData {
  totalForms: number;
  totalResponses: number;
  recentForms: Array<{
    formId: string;
    title: string;
    description?: string;
    createdAt: string;
    fieldCount: number;
  }>;
  recentResponses: Array<{
    responseId: string;
    formTitle: string;
    createdAt: string;
    responseCount: number;
  }>;
  formsByMonth: Array<{ month: string; count: number }>;
  responsesByMonth: Array<{ month: string; count: number }>;
  averageFieldsPerForm: number;
  mostActiveForm: {
    formId: string;
    title: string;
    responseCount: number;
  } | null;
  totalFields: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { getDashboardStats } = useApi();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const response = await getDashboardStats();
      if (response.success && response.data) {
        setDashboardData(response.data);
      } else {
        setError(response.error || "Failed to load dashboard data");
      }
    } catch (err) {
      setError("Failed to load dashboard data");
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-slate-600">
        <div className="relative w-15 h-15">
          <div className="absolute w-full h-full border-3 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
        </div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl">
            <span className="material-symbols-outlined">error</span>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16 text-slate-600">
            <h3 className="text-2xl font-semibold mb-2 text-slate-700">
              No Data Available
            </h3>
            <p className="text-base mb-8">Unable to load dashboard data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-slate-600 text-lg">
              Overview of your AI form builder activity
            </p>
          </div>

          <div className="w-full flex flex-col gap-2 sm:flex-row sm:gap-3 sm:w-auto max-w-full overflow-x-auto">
  <div className="flex flex-row gap-2 sm:gap-3 w-full sm:w-auto">
    <button
      onClick={() => navigate("/forms")}
      className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:transform hover:-translate-y-0.5"
    >
      <span className="material-symbols-outlined">list</span>
      View All Forms
    </button>
    <button
      onClick={() => navigate("/responses")}
      className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:transform hover:-translate-y-0.5"
    >
      <span className="material-symbols-outlined">assignment</span>
      View Responses
    </button>
  </div>
  <div className="w-full sm:w-auto">
    <button
      onClick={() => navigate("/builder")}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40 w-full sm:w-auto"
    >
      <span className="material-symbols-outlined">add</span>
      Create New Form
    </button>
  </div>
</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Forms
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {dashboardData.totalForms}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600 text-xl">
                  description
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Responses
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {dashboardData.totalResponses}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600 text-xl">
                  assignment
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Fields
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {dashboardData.totalFields}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-xl">
                  format_list_bulleted
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Avg Fields/Form
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {dashboardData.averageFieldsPerForm}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-600 text-xl">
                  analytics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Most Active Form */}
        {dashboardData.mostActiveForm && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-yellow-600">
                  trending_up
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Most Active Form
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-slate-800">
                  {dashboardData.mostActiveForm.title}
                </p>
                <p className="text-slate-600">
                  {dashboardData.mostActiveForm.responseCount} responses
                </p>
              </div>
              <button
                onClick={() =>
                  navigate(`/form/${dashboardData.mostActiveForm?.formId}`)
                }
                className="px-4 py-2 bg-yellow-50 text-yellow-700 border border-yellow-200 rounded-lg font-medium hover:bg-yellow-100 transition-colors"
              >
                View Form
              </button>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent Forms */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-600">
                  description
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Recent Forms</h3>
            </div>
            <div className="space-y-4">
              {dashboardData.recentForms.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  No forms created yet
                </p>
              ) : (
                dashboardData.recentForms.map((form) => (
                  <div
                    key={form.formId}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {form.title}
                      </p>
                      <p className="text-sm text-slate-600">
                        {form.fieldCount} fields •{" "}
                        {new Date(form.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => navigate(`/form/${form.formId}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Recent Responses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-600">
                  assignment
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">
                Recent Responses
              </h3>
            </div>
            <div className="space-y-4">
              {dashboardData.recentResponses.length === 0 ? (
                <p className="text-slate-500 text-center py-4">
                  No responses received yet
                </p>
              ) : (
                dashboardData.recentResponses.map((response) => (
                  <div
                    key={response.responseId}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">
                        {response.formTitle}
                      </p>
                      <p className="text-sm text-slate-600">
                        {response.responseCount} fields •{" "}
                        {new Date(response.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-green-600 text-sm">
                        check
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 sm:p-8 border border-purple-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              Ready to create something amazing?
            </h3>
            <p className="text-slate-600 mb-6">
              Use AI to build intelligent forms in minutes
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-stretch">
              <button
                onClick={() => navigate("/builder")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-lg shadow-purple-500/30 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/40"
              >
                <span className="material-symbols-outlined mr-2">add</span>
                Create New Form
              </button>
              <button
                onClick={() => navigate("/forms")}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined mr-2">list</span>
                Manage Forms
              </button>
              <button
                onClick={() => navigate("/responses")}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-semibold cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md hover:transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined mr-2">
                  assignment
                </span>
                View Responses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
