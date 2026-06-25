import Dashboard from "../components/Dashboard";
import { render, screen } from "@testing-library/react";

//all mock functions
vi.mock("next-auth/react" , ()=> ({
    signOut : vi.fn(),
}));

vi.mock("next/images" , ()=> ({
    default : (props: any) => <img {...props} />,
}));

vi.mock("../components/StatusCard", () => ({
  default: ({ statusName, statusCount }: any) => (
    <div>
      {statusName}: {statusCount}
    </div>
  ),
}));

vi.mock("../components/WeeklyActivity", () => ({
  default: () => <div>Weekly Activity</div>,
}));

vi.mock("../components/ResposeRate", () => ({
  default: ({ responseCount }: any) => (
    <div>Response Rate: {responseCount}</div>
  ),
}));

describe("Dashboard UI" , ()=> {
    beforeEach(() => { vi.clearAllMocks(); 

    });

    // checking loading, empty, normal and error states

it("shows loading state while fetching data" , () => {
    global.fetch = (vi.fn(() => new Promise(() => {}))) as typeof fetch;
    render (<Dashboard refresh={0} />);

    expect(
        screen.getByText(/loading/i)
    ).toBeInTheDocument();
});

it("Shows no appliactions yet message" , async() =>{
    global.fetch = vi.fn().mockResolvedValueOnce({
        ok : true,
        json : async () => ({
            user : {
                name : "Urvi Mapsenkar",
                image : null
            },
        }),
    })

    .mockResolvedValueOnce({
        ok : true,
        json : async () => ({
            total : 0,
            statusCount : [],
            last7Days : [],
            ResponseRate : 0
        })
    });

    render(<Dashboard refresh={0} />);

    expect(
        await screen.findByText("Urvi Mapsenkar")
    ).toBeInTheDocument();
    
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

    expect(
        await screen.findByText(/no applications yet/i)
    ).toBeInTheDocument();
});

it("displays dashboard data" , async() =>{
    global.fetch = vi.fn().mockResolvedValueOnce({
        ok : true,
        json: async () => ({
            user : {
                name : "Urvi Mapsenkar",
                image : null                
            },
        }),
    })
    .mockResolvedValueOnce({
        ok : true,
        json : async () => ({
            total : 5,
            statusCount : [
                {status : "Applied" , count : 2},
                {status : "Interviewing" , count : 1},
                {status : "Rejected" , count : 2}
            ],
            last7Days : [ {day : "Mon" , count : 2}],
            responseRate : 0.6
        }),
    });

    render (<Dashboard refresh={0} />);

    expect(
        await screen.findByText("Urvi Mapsenkar")
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();   

    expect(
        screen.getByText("Total: 5")
    ).toBeInTheDocument();

    expect(
        screen.getByText("Applied: 2")
    ).toBeInTheDocument();

    expect(
        screen.getByText("Interviewing: 1")
    ).toBeInTheDocument();    

    expect(
        screen.getByText("Rejected: 2")
    ).toBeInTheDocument();        

    expect(
      screen.getByText("Weekly Activity")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Response Rate: 0.6")
    ).toBeInTheDocument();
});

it("shows error message", async () => {
    global.fetch = vi.fn()
    .mockResolvedValueOnce({
        ok : true,
        json : async () => ({
            user : {
            name : "Urvi Mapsenkar",
            image : null
            },
        })
    })
    .mockResolvedValueOnce({
        ok : false,
        status : 500
    });

    render( <Dashboard refresh={0} />);
    expect(
        await screen.findByText(/failed to load dashboard/i)
    ).toBeInTheDocument();
});

});