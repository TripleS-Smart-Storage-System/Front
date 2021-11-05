import * as dotenv from 'dotenv'

const configPath = process.env.CONFIG_PATH || './env/.env'
console.log(`Loading environment config from '${configPath}'...`)
dotenv.config({ path: configPath } )
class Config {
  public serverUrl = process.env.SERVER_URL || 'localhost:5001'
}

const singleton = new Config()
export default singleton