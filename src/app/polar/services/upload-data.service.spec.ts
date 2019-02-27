import { UploadDataService } from './upload-data.service';
import * as sinon from 'sinon';
import { forEach } from '@angular/router/src/utils/collection';

describe('app/polar/services/upload-data.service', () => {
    let sand: sinon.SinonSandbox;
    let testInstance: UploadDataService;
    beforeAll(() => {
        sand = sinon.createSandbox();
        testInstance = new UploadDataService();
    });
    afterEach(() => {
        sand.restore();
    });
    describe('UploadDataService', () => {
        describe('uploadedFiles', () => {
            const testValues: any[] = [
                {
                    test: 1
                },
                {
                    test: 2
                },
                {
                    test: 3
                }
            ];
            describe('getter', () => {
                testValues.forEach((testValue: any) => {
                    it('should return the value of the uploadFilesSubject', () => {
                        sand.stub((<any>testInstance).uploadFilesSubject, 'value').get(() => testValue);
                        expect(testInstance.uploadedFiles).toEqual(testValue);
                    });
                });
            });
            describe('setter', () => {
                testValues.forEach((testValue: any) => {
                    it('should return the value of the uploadFilesSubject', () => {
                        const nextStub: sinon.SinonStub = sand.stub((<any>testInstance).uploadFilesSubject, 'next');
                        testInstance.uploadedFiles = testValue;
                        expect(nextStub.callCount).toEqual(1);
                        expect(nextStub.getCall(0).args).toEqual([testValue]);
                    });
                });
            });
        });
    });
});
