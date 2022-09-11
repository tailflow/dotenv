import {DotEnv} from "../src/dotEnv";

describe('DotEnv tests', () => {
    test('parsing entries', () => {
        const dotEnv = new DotEnv(`keyA=a\nkeyB=b`);

        const keyAEntry = dotEnv.get('keyA')!;
        const keyBEntry = dotEnv.get('keyB')!;

        expect(keyAEntry.key).toBe('keyA');
        expect(keyAEntry.value).toBe('a');
        expect(keyAEntry.comment).toBeUndefined();

        expect(keyBEntry.key).toBe('keyB');
        expect(keyBEntry.value).toBe('b');
        expect(keyBEntry.comment).toBeUndefined();
    });

    test('parsing entries with spaces', () => {
        const dotEnv = new DotEnv(`keyA = a\nkeyB = b`);

        const keyAEntry = dotEnv.get('keyA')!;
        const keyBEntry = dotEnv.get('keyB')!;

        expect(keyAEntry.key).toBe('keyA');
        expect(keyAEntry.value).toBe('a');
        expect(keyAEntry.comment).toBeUndefined();

        expect(keyBEntry.key).toBe('keyB');
        expect(keyBEntry.value).toBe('b');
        expect(keyBEntry.comment).toBeUndefined();
    });

    test('parsing encapsulated entry', () => {
        const dotEnv = new DotEnv(`keyA="a"`);

        const keyAEntry = dotEnv.get('keyA')!;

        expect(keyAEntry.key).toBe('keyA');
        expect(keyAEntry.value).toBe('a');
        expect(keyAEntry.comment).toBeUndefined();
    });

    test('parsing encapsulated entry with a comment', () => {
        const dotEnv = new DotEnv(`keyA="a" #example comment`);

        const keyAEntry = dotEnv.get('keyA')!;

        expect(keyAEntry.key).toBe('keyA');
        expect(keyAEntry.value).toBe('a');
        expect(keyAEntry.comment).toBe('example comment');
    });

    test('parsing entry with a comment', () => {
        const dotEnv = new DotEnv(`keyA=a #example comment`);

        const keyAEntry = dotEnv.get('keyA')!;

        expect(keyAEntry.key).toBe('keyA');
        expect(keyAEntry.value).toBe('a');
        expect(keyAEntry.comment).toBe('example comment');
    });

    test('parsing entry that is a comment in itself', () => {
        const dotEnv = new DotEnv(`#example comment`);

        const keyAEntry = dotEnv.all().shift()!;

        expect(keyAEntry.key).toBeUndefined();
        expect(keyAEntry.value).toBeUndefined();
        expect(keyAEntry.comment).toBe('example comment');
    });

    test('parsing entries with empty lines in between', () => {
        const dotEnv = new DotEnv(`keyA=a\n\nkeyB=b`);

        const entries = dotEnv.all();
        expect(entries).toHaveLength(3);
    });

    test('setting entry value', () => {
        const dotEnv = new DotEnv(`keyA=a`);

        const updatedEntry = dotEnv.set('keyA', 'updated');

        const entry = dotEnv.get('keyA');

        expect(entry?.value).toBe('updated');
        expect(updatedEntry?.value).toBe('updated');
    });

    test('removing an entry', () => {
        const dotEnv = new DotEnv(`keyA=a`);

        const removedEntry = dotEnv.remove('keyA');

        const entry = dotEnv.get('keyA');

        expect(entry).toBeUndefined();
        expect(removedEntry.value).toBe('a');
    });

    test('converting to string', () => {
        const dotEnv = new DotEnv(`keyA=a\nkeyB=b`);

        const formattedEntries = dotEnv.toString();

        expect(formattedEntries).toBe('keyA=a\nkeyB=b');
    });

    test('converting to string with a comment', () => {
        const dotEnv = new DotEnv(`keyA=a\nkeyB=b # example comment`);

        const formattedEntries = dotEnv.toString();

        expect(formattedEntries).toBe('keyA=a\nkeyB=b # example comment');
    });

    test('converting to string with encapsulation', () => {
        const dotEnv = new DotEnv(`keyA="a with spaces"\nkeyB=b`);

        const formattedEntries = dotEnv.toString();

        expect(formattedEntries).toBe('keyA="a with spaces"\nkeyB=b');
    });
});
