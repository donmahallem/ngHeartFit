import { AnalyzeDatabase } from "./analyze-database";

describe("analyze-database", () => {
    it("should build", () => {
        let db: AnalyzeDatabase = new AnalyzeDatabase();
        expect(db).toBeDefined();
    });
});