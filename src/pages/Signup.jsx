import { useState } from "react";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon, EnvelopeIcon, LockClosedIcon, BuildingOfficeIcon,
  MapPinIcon, PhoneIcon, IdentificationIcon, CogIcon, CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Signup() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "", role: "", email: "",
    company: "", fleetSize: "", location: "", phone: "",
    licenseNumber: "", password: "", confirmPassword: "", notifications: true
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const steps = [
    { id: 0, title: "Personal Info", subtitle: "Basic details", icon: UserIcon },
    { id: 1, title: "Role Details", subtitle: "Professional info", icon: BuildingOfficeIcon },
    { id: 2, title: "Account Setup", subtitle: "Security & preferences", icon: CogIcon }
  ];

  const nextStep = () => {
    if (step < 2) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError("");
    setLoading(true);
    
    try {
      // 🔥 SAVE ALL DATA TO FIREBASE AUTH + FIRESTORE
      await signup(formData.email, formData.password, formData);
      navigate('/dashboard');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Email already registered. Please login instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password must be at least 6 characters.');
      } else {
        setError('Signup failed. Please try again.');
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Branding */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-r from-white via-blue-50 to-indigo-100 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="w-28 h-28 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <span className="text-4xl font-bold text-white">FM</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent mb-6">
              FleetMatrix
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Complete fleet management platform for modern logistics
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
            
            {/* PROGRESS BAR */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 px-8 pt-8 pb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">{steps[step].title}</h1>
                  <p className="text-indigo-100">{steps[step].subtitle}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-white mb-1">Step {step + 1} of 3</div>
                  <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full transition-all duration-1000" 
                         style={{ width: `${((step + 1) / 3) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-between">
                {steps.map((s, index) => (
                  <div key={s.id} className="flex flex-col items-center space-y-1 flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shadow-lg transition-all duration-300 ${
                      index < step 
                        ? 'bg-white text-indigo-600 transform scale-110' 
                        : index === step 
                        ? 'bg-white border-2 border-white/50 backdrop-blur-sm text-indigo-700 shadow-xl' 
                        : 'bg-white/60 text-white/80'
                    }`}>
                      {index < step ? <CheckCircleIcon className="w-6 h-6" /> : index + 1}
                    </div>
                    <div className={`text-xs font-medium transition-colors ${
                      index <= step ? 'text-white' : 'text-white/60'
                    }`}>
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="p-8 pb-12 space-y-6">
              {/* STEP 1: Personal Info */}
              {step === 0 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <UserIcon className="w-5 h-5 inline mr-2 text-indigo-500" />
                      Full Name
                    </label>
                    <input name="name" value={formData.name} onChange={handleChange} 
                           placeholder="John Doe" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Role in Fleet Operations
                    </label>
                    <select name="role" value={formData.role} onChange={handleChange} 
                            className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" required>
                      <option value="">Select your role</option>
                      <option value="manager">Fleet Manager / Owner</option>
                      <option value="dispatcher">Dispatcher / Operations</option>
                      <option value="maintenance">Maintenance / Workshop</option>
                      <option value="safety">Safety Officer / HR</option>
                    </select>
                  </div>
                </>
              )}

              {/* STEP 2: Role-based Questions */}
              {step === 1 && (
                <>
                  {formData.role === 'manager' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Company Name
                        </label>
                        <input name="company" value={formData.company} onChange={handleChange} 
                               placeholder="ABC Logistics Pvt Ltd" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Fleet Size
                        </label>
                        <select name="fleetSize" value={formData.fleetSize} onChange={handleChange} 
                                className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md">
                          <option value="">Select fleet size</option>
                          <option value="1-10">1-10 vehicles</option>
                          <option value="11-50">11-50 vehicles</option>
                          <option value="50+">50+ vehicles</option>
                        </select>
                      </div>
                    </>
                  )}
                  {formData.role === 'maintenance' && (
                    <>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Workshop Name
                        </label>
                        <input name="company" value={formData.company} onChange={handleChange} 
                               placeholder="ABC Auto Workshop" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          License Number
                        </label>
                        <input name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} 
                               placeholder="GJ1234567" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" />
                      </div>
                    </>
                  )}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <MapPinIcon className="w-5 h-5 inline mr-2 text-indigo-500" />
                      Location
                    </label>
                    <input name="location" value={formData.location} onChange={handleChange} 
                           placeholder="Ahmedabad, Gujarat" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <PhoneIcon className="w-5 h-5 inline mr-2 text-indigo-500" />
                      Phone Number
                    </label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" 
                           placeholder="+91 98765 43210" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" />
                  </div>
                </>
              )}

              {/* STEP 3: Account Setup */}
              {step === 2 && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <EnvelopeIcon className="w-5 h-5 inline mr-2 text-indigo-500" />
                      Email Address
                    </label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" 
                           placeholder="manager@company.com" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <LockClosedIcon className="w-5 h-5 inline mr-2 text-indigo-500" />
                      Password
                    </label>
                    <input name="password" value={formData.password} onChange={handleChange} type="password" 
                           placeholder="At least 6 characters" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" required />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <LockClosedIcon className="w-5 h-5 inline mr-2 text-indigo-500" />
                      Confirm Password
                    </label>
                    <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" 
                           placeholder="Repeat your password" className="w-full px-4 py-4 border border-gray-200 rounded-2xl bg-white/50 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm hover:shadow-md" required />
                  </div>
                </>
              )}

              {/* ERROR */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </div>
                </div>
              )}

              {/* NAVIGATION */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                {step > 0 && (
                  <button type="button" onClick={prevStep} 
                          className="px-8 py-3 text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200 flex items-center space-x-2 disabled:opacity-50" 
                          disabled={loading}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span>Previous</span>
                  </button>
                )}
                
                <div className="flex-1 text-right">
                  {step < 2 ? (
                    <button type="button" onClick={nextStep} 
                            className="ml-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50" 
                            disabled={loading || !formData[step === 0 ? 'role' : 'location']}>
                      <span>Next Step</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button type="submit" 
                            className="ml-auto px-12 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:to-blue-700 focus:ring-4 focus:ring-indigo-500/50 transform hover:-translate-y-1 transition-all duration-400 text-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                            disabled={loading}>
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <span>🚀</span>
                          Create My Account
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
