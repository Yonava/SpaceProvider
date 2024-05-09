import { getOfficialCapacity } from '../src/capacities';
import { getDistanceInMeters } from '../src/location';

describe('testing capacities', () => {
    test('empty string (not in capacities obj) should result in undefined', () => {
        expect(getOfficialCapacity("","")).toBe(undefined);
    });
    test('valid input should result in corresponding capacity', () => {
        expect(getOfficialCapacity("TOBN","204")).toBe(64);
    });
});

describe('testing location', () => {
    test('get distance in meters from two sets of [0,0] coordinates', () => {
        expect(getDistanceInMeters([0, 0], [0, 0])).toBe(0);
    });
    test('get distance in meters from two sets of more complex coordinates', () => {
        expect(getDistanceInMeters([-72, 42], [-74, 45])).toBe(Math.round(242766.44));
    });
});