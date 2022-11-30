import rootDirectory from '../../settings.mjs';
import { join } from 'node:path'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'


// Configure lowdb to write to JSONFile
const file = join(rootDirectory, 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Clear transactions
await db.read()
db.data.transactions = [];
await db.write()