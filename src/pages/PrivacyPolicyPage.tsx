import PolicyPage from '../components/PolicyPage'
import { privacyPolicy } from '../data/legalPolicies'
export const PRIVACY_TITLE = privacyPolicy.title + ' | Virtual Assistant Medical'
export const PRIVACY_DESCRIPTION = privacyPolicy.description
export default function PrivacyPolicyPage() { return <PolicyPage policy={privacyPolicy} /> }
