import { inject } from '@angular/core/testing';
import { ProviderSuite as Provider } from '@angeeks/testing';

import { windowToken } from '@angeeks/globals';
import { Gtag } from './gtag';

function mockDoc() {
    return {
        createElement() { return {}; },
        head: {
            appendChild() { }
        }
    };
}

class MockDate { }

function mockWindow() {
    const document = mockDoc();
    return { document, Date: MockDate };
}

Provider.suite<Gtag>(Gtag, (spec) => {
    spec.init({
        providers: [
            { provide: windowToken, useFactory: mockWindow }
        ]
    });

    it('should have command for "js" first', inject([windowToken], (wnd) => {
        expect(wnd.dataLayer[0][0]).toEqual('js');
    }));
    it('should have command for "config" second', inject([windowToken], (wnd) => {
        expect(wnd.dataLayer[1][0]).toEqual('config');
    }));
    const expectLastArguments = (data) => {
        const desc = `last arguments equals ${JSON.stringify(data)}`;
        it(desc, inject([windowToken], (wnd) => {
            const args = Array.from(wnd.dataLayer.pop());
            expect(args).toEqual(data);
        }));
    };
    describe('.event(name, params)', () => {
        describe('with params not given', () => {
            beforeEach(() => {
                spec.subject.event('test-event');
            });
            expectLastArguments(['event', 'test-event', undefined]);
        });
        describe('with params given', () => {
            beforeEach(() => {
                spec.subject.event('test-event', { a: 1 });
            });
            expectLastArguments(['event', 'test-event', { a: 1 }]);
        });
    });
    describe('.set(params)', () => {
        beforeEach(() => {
            spec.subject.set({ key: 'value' });
        });
        expectLastArguments(['set', { key: 'value' }]);
    });
    describe('.config(params)', () => {
        beforeEach(() => {
            spec.subject.config({ key: 'value' });
        });
        expectLastArguments(['config', '__gtag.id__', { key: 'value' }]);
    });
});
