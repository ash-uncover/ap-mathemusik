// Default hard-coded values
export const CONFIG: {
  AP_MATHEMUSIK_PUBLIC: string
  AP_MATHEMUSIK_ENVIRONMENT: string
} = {
  AP_MATHEMUSIK_PUBLIC: '',
  AP_MATHEMUSIK_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.AP_MATHEMUSIK_PUBLIC) {
    CONFIG.AP_MATHEMUSIK_PUBLIC = process.env.AP_MATHEMUSIK_PUBLIC
  }
  if (process.env.AP_MATHEMUSIK_ENVIRONMENT) {
    CONFIG.AP_MATHEMUSIK_ENVIRONMENT = process.env.AP_MATHEMUSIK_ENVIRONMENT
  }
} catch (error) {
  console.warn('Failed to load from process.env')
}

console.log('CONFIG')
Object.keys(CONFIG).forEach((confKey) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})
