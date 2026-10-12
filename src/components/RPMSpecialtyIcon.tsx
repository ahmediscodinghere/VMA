import { useId } from 'react'

const colors: Record<string, [string, string]> = {
  primary: ['#37bca7', '#087e7b'],
  heart: ['#fa8c97', '#d54962'],
  glucose: ['#a897ee', '#7360bc'],
  lungs: ['#80c5ea', '#368db7'],
  kidneys: ['#f3aa85', '#c76656'],
  discharge: ['#66c9b1', '#218b7b'],
  clinic: ['#8daee7', '#5579b9'],
}

/** Small shaded medical illustrations that remain sharp at every screen size. */
export default function RPMSpecialtyIcon({ name }: { name: string }) {
  const id = useId()
  const [light, dark] = colors[name] || colors.primary
  const fill = 'url(#' + id + ')'
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
    <defs><linearGradient id={id} x1="10" y1="8" x2="37" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor={light} /><stop offset="1" stopColor={dark} /></linearGradient></defs>
    <ellipse cx="24" cy="43" rx="16" ry="2" fill={dark} opacity=".12" />
    {name === 'primary' && <>
      <path d="M12 8v11a8 8 0 0 0 16 0V8" stroke={dark} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 27v6a8 8 0 0 0 16 0v-4" stroke={dark} strokeWidth="3.5" strokeLinecap="round" />
      <rect x="9" y="5" width="6" height="9" rx="3" fill={fill} /><rect x="25" y="5" width="6" height="9" rx="3" fill={fill} />
      <circle cx="36" cy="25" r="7" fill={fill} /><circle cx="36" cy="25" r="3.5" fill="#eefbf7" /><circle cx="36" cy="25" r="1.5" fill={dark} />
      <path d="M13 17v3a6 6 0 0 0 6 6" stroke="white" strokeOpacity=".5" strokeLinecap="round" />
    </>}
    {name === 'heart' && <>
      <path d="M24 40C19 37 5 28 5 17a11 11 0 0 1 19-7 11 11 0 0 1 19 7c0 11-14 20-19 23Z" fill={fill} stroke={dark} strokeWidth="1.2" />
      <path d="M10 17c0-5 5-8 9-5" stroke="white" strokeOpacity=".6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 24h9l4-8 5 16 4-8h10" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>}
    {name === 'glucose' && <>
      <path d="M24 5c-4 6-14 17-14 25a14 14 0 0 0 28 0c0-8-10-19-14-25Z" fill={fill} stroke={dark} strokeWidth="1.2" />
      <path d="M16 24c-3 4-3 8-1 11" stroke="white" strokeOpacity=".6" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m25 21 7 4v8l-7 4-7-4v-8Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="25" cy="29" r="2" fill="white" />
    </>}
    {name === 'lungs' && <>
      <path d="M20 15c-3-8-9-3-13 5-3 6-4 18 2 19 4 1 10-3 11-6V15Zm8 0c3-8 9-3 13 5 3 6 4 18-2 19-4 1-10-3-11-6V15Z" fill={fill} stroke={dark} strokeWidth="1.2" />
      <path d="M24 5v14m0-1-10 9m10-9 10 9" stroke={dark} strokeWidth="3" strokeLinecap="round" />
      <path d="m15 25-4 6m4-6 2 8m16-8 4 6m-4-6-2 8" stroke="white" strokeOpacity=".8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 17c-3 4-5 9-5 14" stroke="white" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
    </>}
    {name === 'kidneys' && <>
      <path d="M16 9C7 7 4 18 5 26s7 13 12 9c4-3 2-7-1-10-3-3 4-6 3-10 0-3-1-5-3-6Zm16 0c9-2 12 9 11 17s-7 13-12 9c-4-3-2-7 1-10 3-3-4-6-3-10 0-3 1-5 3-6Z" fill={fill} stroke={dark} strokeWidth="1.2" />
      <path d="M16 21c5 1 6 6 6 19m10-19c-5 1-6 6-6 19" stroke={dark} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 12c-4 2-5 8-4 13m28-13c4 2 5 8 4 13" stroke="white" strokeOpacity=".55" strokeWidth="2" strokeLinecap="round" />
    </>}
    {name === 'discharge' && <>
      <rect x="8" y="8" width="27" height="34" rx="4" fill={fill} stroke={dark} strokeWidth="1.2" />
      <rect x="12" y="12" width="19" height="26" rx="2" fill="#f4fffb" />
      <rect x="16" y="5" width="11" height="7" rx="2" fill={dark} /><path d="M20 8h3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m16 20 3 3 5-6M16 29h10M16 33h7" stroke={dark} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="32" r="9" fill={fill} stroke="white" strokeWidth="2" /><path d="M31 32h10m-4-4 4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>}
    {name === 'clinic' && <>
      <path d="M7 21h34v20H7Z" fill={fill} stroke={dark} strokeWidth="1.2" /><path d="M14 9h20v32H14Z" fill={fill} stroke={dark} strokeWidth="1.2" />
      <rect x="18" y="12" width="12" height="12" rx="3" fill="#f2f6ff" /><path d="M24 15v6m-3-3h6" stroke={dark} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M21 41V29h6v12" fill="#f2f6ff" stroke={dark} strokeWidth="1.2" />
      <path d="M10 26h1m-1 6h1m26-6h1m-1 6h1" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M6 42h36" stroke={dark} strokeWidth="2" strokeLinecap="round" />
    </>}
  </svg>
}
