import { Database } from '@nozbe/watermelondb';
import { appSchema, tableSchema } from '@nozbe/watermelondb/Schema';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Contact } from '../watermelonDB/modals/Contact';

// Define schema for the contact table
const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'contacts',
            columns: [
                { name: 'name', type: 'string' },
                { name: 'phone', type: 'string' },
                { name: 'image', type: 'string' },
            ],
        }),
    ],
});

const adapter = new SQLiteAdapter({
    dbName: 'contactsDB',
    schema,
});

const database = new Database({
    adapter,
    modelClasses: [Contact],
    actionsEnabled: true,
});

export { database };
