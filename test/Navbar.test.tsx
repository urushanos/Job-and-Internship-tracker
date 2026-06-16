import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import Navbar from "../components/Navbar"

describe('Navbar', ()=>{
    test('Navbar renders correctly', ()=>{
        render(<Navbar statusFilter="All" setStatusFilter={vi.fn()} />);

        expect( screen.getByText("Job and Internship Application Tracker")).toBeInTheDocument();
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        expect(screen.getByRole("button", {name : /add/i})).toBeInTheDocument();
    });

    test('All filter options show', ()=>{
        render(<Navbar statusFilter="All" setStatusFilter={vi.fn()} />);

        expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Applied" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "In Review" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Interviewing" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Rejected" })).toBeInTheDocument();
        expect(screen.getByRole("option", { name: "Offered" })).toBeInTheDocument();
    });

    test("calls setStatusFilter when filter changed", async ()=>{
        const user= userEvent.setup();
        const mockFunction = vi.fn();
        render(<Navbar statusFilter="All" setStatusFilter={mockFunction} />);
        
        const select = screen.getByRole("combobox");

        await user.selectOptions(select, "Applied");
        expect(mockFunction).toHaveBeenCalledWith("Applied");
    });



    
})