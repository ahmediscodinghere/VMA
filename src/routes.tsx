import { createBrowserRouter, Navigate } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import FAQsPage from './pages/FAQsPage'
import PricingPage from './pages/PricingPage'
import BlogPage from './pages/BlogPage'
import HiringYourVAPage from './pages/HiringYourVAPage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import MedicalAdminPage from './pages/MedicalAdminPage'
import MedicalCoderPage from './pages/MedicalCoderPage'
import MedicalBillingPage from './pages/MedicalBillingPage'
import VirtualMedicalScribePage from './pages/VirtualMedicalScribePage'

import VirtualMedicalReceptionistPage from './pages/VirtualMedicalReceptionistPage'

function NotFound() {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="text-6xl mb-6">🔍</div>
      <h1 className="text-3xl font-extrabold mb-3" style={{ fontFamily: 'Outfit, sans-serif', color: '#1B3A7A' }}>Page Not Found</h1>
      <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
      <a href="/" className="px-7 py-3 rounded-xl font-bold text-white" style={{ background: '#2DC5B0' }}>Return Home</a>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'services', Component: ServicesPage },
      { path: 'about-us', Component: AboutPage },
      { path: 'hiring-your-va', Component: HiringYourVAPage },
      { path: 'contact-us', Component: ContactPage },
      { path: 'faqs', Component: FAQsPage },
      { path: 'pricing', Component: PricingPage },
      { path: 'blog', Component: BlogPage },
      { path: 'virtual-medical-scribe', Component: VirtualMedicalScribePage },
      { path: 'services/virtual-medical-scribe', element: <Navigate to="/virtual-medical-scribe/" replace /> },
      { path: 'virtual-medical-receptionist', Component: VirtualMedicalReceptionistPage },
      { path: 'services/virtual-medical-receptionist', element: <Navigate to="/virtual-medical-receptionist/" replace /> },
      { path: 'services/medical-admin-assistant', Component: MedicalAdminPage },
      { path: 'services/medical-billing-assistant', Component: MedicalBillingPage },
      { path: 'services/virtual-medical-coder', Component: MedicalCoderPage },
      { path: 'services/:slug', Component: ServiceDetailPage },
      { path: '*', Component: NotFound },
    ],
  },
])
