import devConfig from './dev.json'
import prodConfig from './production.json'

const config = process.env.NODE_ENV !== 'production' ? devConfig : prodConfig
export default config
