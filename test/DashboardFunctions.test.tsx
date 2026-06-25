import { buildDashboard } from "../lib/dashboard"

describe ("dashboard aggregation" , () =>{

    it("counts total applications", () =>{
        const result = buildDashboard([
            {status : "Applied" , dateApplied : new Date()},
            {status : "Interviewing" , dateApplied : new Date()}
        ]);
        expect(result.total).toBe(2);
    })

    it("counts each status properly" , ()=> {
         const result = buildDashboard([
            {status : "Applied" , dateApplied : new Date()},
            {status : "Interviewing" , dateApplied : new Date()},
            {status : "Interviewing" , dateApplied : new Date()}
        ]);

        expect(
            result.statusCount.find(s => s.status === "Applied")?.count
        ).toBe(1);

        expect(
            result.statusCount.find(s => s.status === "Interviewing")?.count
        ).toBe(2);
    })

    it("calculates correct response rate", ()=>{
        const result = buildDashboard([
            {status : "Applied" , dateApplied : new Date()},
            {status : "Interviewing" , dateApplied : new Date()},
            {status : "Interviewing" , dateApplied : new Date()},
            {status : "Applied" , dateApplied : new Date()}
        ]);

        expect( result.responseRate).toBe(0.5);
    })

    it("returns response rate = 0 when no applications", ()=>{
        const result = buildDashboard([]);
        expect(result.total).toBe(0);
        expect(result.responseRate).toBe(0);
    })

})