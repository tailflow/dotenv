import {DotEnvEntryValueType} from "./dotEnvEntryValueType";

export class DotEnvEntry<T = DotEnvEntryValueType> {
    constructor(public key?: string, public value?: T | null, public comment?: string) {
    }

    public toString(): string {
        let formattedEntry = '';

        if (this.key) {
            let formattedValue = this.value ? String(this.value) : '';

            if (/[\s"'=$.@]/.test(formattedValue)) {
                formattedValue = JSON.stringify(formattedValue);
            }

            formattedEntry = `${this.key}=${formattedValue}`;
        }

        if (this.comment) {
            if (this.key)  {
                formattedEntry += ' ';
            }

            formattedEntry += `# ${this.comment}`;
        }

        return formattedEntry;
    }
}
