import {DotEnvEntryValueType} from "./dotEnvEntryValueType";

export class DotEnvEntry<T = DotEnvEntryValueType> {
    constructor(public key?: string, public value?: T | null, public comment?: string) {
    }

    public toString(): string {
        let formattedEntry = '';

        if (this.key) {
            let formattedValue = '';

            if (typeof this.value === 'string') {
                formattedValue = /[\s"']/.test(this.value) ? JSON.stringify(this.value) : this.value;
            }

            formattedEntry = `${this.key}=${formattedValue}`;
        }

        if (this.comment) {
            formattedEntry += ` # ${this.comment}`;
        }

        return formattedEntry;
    }
}
