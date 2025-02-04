import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

class Contact extends Model {
    static table = 'contacts';

    @field('name') name;
    @field('phone') phone;
    @field('image') image;
}

export { Contact };
