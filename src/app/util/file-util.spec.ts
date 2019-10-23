
import * as sinon from 'sinon';
import { FileUtil } from './file-util';
describe('/util/file-util', () => {
    let sandbox: sinon.SinonSandbox;
    beforeAll(() => {
        sandbox = sinon.createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('FileUtil', () => {
        describe('createFileReader()', () => {
            it('should return a FileReader Instance', () => {
                expect(FileUtil.createFileReader() instanceof FileReader).toBeTruthy();
            });
        });
        describe('readFileAsText(file:File)', () => {
            let createFileReaderStub: sinon.SinonStub;
            let stubInstance: sinon.SinonStubbedInstance<FileReader>;
            let nextSpy: sinon.SinonSpy;
            beforeEach(() => {
                createFileReaderStub = sandbox.stub(FileUtil, 'createFileReader');
                stubInstance = sinon.createStubInstance(FileReader);
                createFileReaderStub.callsFake(() =>
                    stubInstance);
                nextSpy = sinon.spy();
            });
            describe('reading the file fails', () => {
                it('needs to be implemented',/*, (done) => {
                    let testFile: File;
                    const testError: Error = new Error("test error");
                    FileUtil
                        .readFileAsText(testFile)
                        .subscribe(nextSpy, (err) => {
                            console.error(err);
                            expect(err).toEqual(testError);
                            done();
                        }, () => {
                            throw Error("should not be called");
                        });
                    console.log("IAIAIA2", stubInstance.onerror);
                    stubInstance.onerror(testError);
                }*/);
            });
            describe('reading the file succeeds', () => {
                it('needs to be implemented');
            });
        });
    });
});
