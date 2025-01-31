import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from './schema';
import Note from './Note';

const adapter = new SQLiteAdapter({
    schema: mySchema,
});

const database = new Database({
    adapter,
    modelClasses: [Note],
    actionsEnabled: true,

});

export default database;
