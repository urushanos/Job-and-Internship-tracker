type labelName = {
  label: string;
}

export default function FormComponent({label} : labelName){

    return(
        <div className="flex justify-between items-center">

            <label className="mr-10 my-10">
                {label}
            </label>

            <input type="text" className="border rounded w-80 h-10">
            </input>
        </div>
    );

}