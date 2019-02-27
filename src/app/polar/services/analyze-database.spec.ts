import { AnalyzeDatabase } from './analyze-database';

describe('analyze-database', () => {
    it('should build', () => {
        const db: AnalyzeDatabase = new AnalyzeDatabase();
        expect(db).toBeDefined();
    });
});
