import FormComponent from "./FormComponent"
import FormDate from "./FormDate"

export default function ApplicationForm(){
    return(
        <div className="flex flex-col">
            <FormComponent label="Company Name"></FormComponent> 

            <FormComponent label="Role Title"></FormComponent>

            <FormDate />

            <FormComponent label="Source"></FormComponent>

            <FormComponent label="Status"></FormComponent>

            <button className="bg-black px-3 py-1 mt-2 rounded text-white"> Submit </button>
        </div>
    );
}