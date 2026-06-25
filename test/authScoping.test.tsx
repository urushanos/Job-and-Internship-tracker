import { describe, it, expect, vi } from "vitest";
import { getUserApplications } from "../lib/dashboardUser";
import Application from "../models/Application";

vi.mock("../models/Application", () => ({
    default: {
        find: vi.fn(),
    },
}));

describe("Auth Scoping", () => {

    it("queries only current user's applications", async () => {

        vi.mocked(Application.find).mockResolvedValue([]);

        await getUserApplications("user123");

        expect(Application.find).toHaveBeenCalledWith({ userId: "user123" });

    });

});