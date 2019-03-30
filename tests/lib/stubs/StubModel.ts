import Faker from 'faker';

import Model, { FieldType } from '@/models/Model';
import Soukai from '@/Soukai';

export default class extends Model {

    public static collection = Faker.lorem.word();

    public static fields = {
        birthDate: FieldType.Date,
        contact: {
            email: FieldType.String,
            phone: FieldType.String,
        },
        name: {
            type: FieldType.String,
            required: true,
        },
        surname: FieldType.String,
        social: {
            facebook: FieldType.String,
            twitter: FieldType.String,
        },
    };

    public static load() {
        if (!this.loaded) {
            this.loaded = true;
            Soukai.loadModel('Stub', this);
        }
    }

    private static loaded: boolean = false;

    public getAliasAttribute(): string {
        return this.getAttribute('name');
    }

}
