import PolicyPage from '../components/PolicyPage'
import { termsPolicy } from '../data/legalPolicies'
export const TERMS_TITLE = termsPolicy.title + ' | Virtual Assistant Medical'
export const TERMS_DESCRIPTION = termsPolicy.description
export default function TermsPage() { return <PolicyPage policy={termsPolicy} /> }
