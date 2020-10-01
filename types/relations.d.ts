import { Model } from './model';

type RelationDeleteMode = null | 'cascade';

export abstract class Relation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> {

    public name: string;
    public related: Related[] | Related | null;
    public loaded: boolean;
    public parent: Parent;
    public relatedClass: RelatedClass;
    public foreignKeyName: string;
    public localKeyName: string;
    public deleteMode: RelationDeleteMode;

    public constructor(
        parent: Parent,
        relatedClass: RelatedClass,
        foreignKeyName: string,
        localKeyName?: string,
    );

    public abstract resolve(): Promise<Related[] | Related | null>;

    public unload(): void;

    public onDelete(mode: RelationDeleteMode): this;

}

export abstract class SingleModelRelation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> extends Relation<Parent, Related, RelatedClass> {

    public related: Related | null;

    public constructor(
        parent: Parent,
        relatedClass: RelatedClass,
        foreignKeyName: string,
        localKeyName?: string,
    );

    public abstract resolve(): Promise<Related | null>;

}

export abstract class MultiModelRelation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> extends Relation<Parent, Related, RelatedClass> {

    public related: Related[] | null;

    public constructor(
        parent: Parent,
        relatedClass: RelatedClass,
        foreignKeyName?: string,
        localKeyName?: string,
    );

    public abstract resolve(): Promise<Related[]>;

}

export class HasOneRelation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> extends SingleModelRelation<Parent, Related, RelatedClass> {

    public resolve(): Promise<Related | null>;

}

export class BelongsToOneRelation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> extends SingleModelRelation<Parent, Related, RelatedClass> {

    public resolve(): Promise<Related | null>;

}

/**
 * @deprecated use BelongsToOneRelation instead.
 */
export class BelongsToRelation extends BelongsToOneRelation {}

export class HasManyRelation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> extends MultiModelRelation<Parent, Related, RelatedClass> {

    public resolve(): Promise<Related[]>;

}

export class BelongsToManyRelation<
    Parent extends Model = Model,
    Related extends Model = Model,
    RelatedClass extends typeof Model = typeof Model,
> extends MultiModelRelation<Parent, Related, RelatedClass> {

    public resolve(): Promise<Related[]>;

}
