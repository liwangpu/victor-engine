import { DynamicComponent } from 'victor-core';

export interface OptionalComponentDefinition {
    type: any;
    title: string;
}

export interface OptionalComponentGroup {
    title: string;
    components: OptionalComponentDefinition[];
}
