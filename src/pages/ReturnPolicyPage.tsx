import PolicyPage from '../components/PolicyPage'
import { returnPolicy } from '../data/legalPolicies'
export const RETURN_TITLE = returnPolicy.title + ' | Virtual Assistant Medical'
export const RETURN_DESCRIPTION = returnPolicy.description
export default function ReturnPolicyPage() { return <PolicyPage policy={returnPolicy} /> }
