type ResposeRateProps ={
    responseCount : number;
}

export default function ResponseRate({responseCount}:ResposeRateProps){

const formattedPercent = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(responseCount);

    return(
        <div className="bg-white p-2 px-6 my-4 shadow-sm rounded-md">
            <div className="flex justify-between">
                <label>Response Rate {"  "}</label> <label>{formattedPercent}</label>
            </div>
        </div>
    );
}