import {DotEnvEntry} from "./dotEnvEntry";
import {DotEnvEntryValueType} from "./dotEnvEntryValueType";

export class DotEnv {
    protected entries: Array<DotEnvEntry>;

    constructor(contents?: string) {
        this.entries = (contents ?? '').split(/\r?\n/)?.map((rawEntry: string) => {
            let entry = new DotEnvEntry();

            if (!rawEntry.startsWith('#')) {
                if (rawEntry.indexOf('=') >= 0) {
                    const rawEntryKeyValue = rawEntry.split('=', 2);

                    entry.key = rawEntryKeyValue[0].trim();
                    entry.value = rawEntryKeyValue[1].match(/("?.*"?(?=#))|"?.*"?/)?.shift()?.trim().replaceAll(/^"+|"+$/g, '') ?? null;
                    entry.comment = rawEntryKeyValue[1].match(/#(.*$)/)?.shift()?.trim().replace(/^#+/, '').trimLeft();
                } else {
                    entry.comment = rawEntry; // empty lines
                }
            } else {
                entry.comment = rawEntry.trim().replace(/^#+/, '');
            }

            return entry;
        }) ?? [];
    }

    public get<T extends DotEnvEntryValueType>(key: string): DotEnvEntry<T> | undefined {
        return this.entries.find((entry) => entry.key === key) as DotEnvEntry<T>;
    }

    public set<T extends DotEnvEntryValueType>(key: string, value?: T | null, comment?: string): DotEnvEntry<T> {
        let entryIndex = this.entries.findIndex((entry) => entry.key === key);

        if (entryIndex < 0) {
            const entry = new DotEnvEntry(key, value, comment);

            this.entries.push(entry);

            return entry;
        } else {
            this.entries[entryIndex].value = value;

            return this.entries[entryIndex] as DotEnvEntry<T>;
        }
    }

    public merge(env: DotEnv): this {
        for (const envEntry of env.all()) {
            this.set(envEntry.key!, envEntry.value, envEntry.comment);
        }

        return this;
    }

    public setComment<T extends DotEnvEntryValueType>(key: string, comment: string | undefined): DotEnvEntry<T> {
        let entryIndex = this.entries.findIndex((entry) => entry.key === key);

        if (entryIndex < 0) {
            throw new Error(`Unable to find entry with the given key: ${key}`);
        }

        this.entries[entryIndex].comment = comment;

        return this.entries[entryIndex] as DotEnvEntry<T>;
    }

    public remove<T extends DotEnvEntryValueType>(key: string): DotEnvEntry<T> {
        let entryIndex = this.entries.findIndex((entry) => entry.key === key);

        if (entryIndex < 0) {
            throw new Error(`Unable to find entry with the given key: ${key}`);
        }

        return this.entries.splice(entryIndex, 1)[0] as DotEnvEntry<T>;
    }

    public all(): Array<DotEnvEntry> {
        return this.entries;
    }

    public toString(): string {
        return this.entries.map((entry) => entry.toString()).join('\n');
    }
}
