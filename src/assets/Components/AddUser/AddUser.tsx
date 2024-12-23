import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface userFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: string;
  birthData: string;
}

export default function AddUser() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userFormData>();

  const onSubmit: SubmitHandler<userFormData> = async (data) => {
    try {
      await axios.post(`https://dummyjson.com/users/add`, data);

      toast.success("User is added successfully!");
      navigate("/dashboard/users-list");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="w-full min-h-screen bg-[#f8f8f8] py-8">
      <div className="flex justify-between items-center px-8 mb-6">
        <h3 className="text-3xl font-bold">Add User</h3>
      </div>
      <hr className="mb-8 mx-8" />
      <div className="px-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow-xl bg-white rounded-xl mx-auto max-w-7xl p-10 grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          <div>
            <label
              htmlFor="firstName"
              className="block mb-3 text-lg font-medium text-gray-900"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Enter First Name"
              className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 focus:ring-blue-500 focus:border-blue-500"
              {...register("firstName", { required: "First Name is required" })}
            />
            {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-3 text-lg font-medium text-gray-900"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Enter Last Name"
              className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 focus:ring-blue-500 focus:border-blue-500"
              {...register("lastName", { required: "Last Name is required" })}
            />
            {errors.lastName && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-3 text-lg font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter Email"
              className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="age"
              className="block mb-3 text-lg font-medium text-gray-900"
            >
              Age
            </label>
            <input
              type="number"
              id="age"
              placeholder="Enter Age"
              className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 focus:ring-blue-500 focus:border-blue-500"
              {...register("age", {
                required: "Age is required",
                max: { value: 50, message: "Max age is 50" },
              })}
            />
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-3 text-lg font-medium text-gray-900"
            >
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 focus:ring-blue-500 focus:border-blue-500"
              {...register("phoneNumber", {
                required: "Phone Number is required",
              })}
            />
            {errors.phoneNumber && (
              <span className="text-red-500">{errors.phoneNumber.message}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="birthData"
              className="block mb-3 text-lg font-medium text-gray-900"
            >
              Birth Date
            </label>
            <input
              type="date"
              id="birthData"
              className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-lg rounded-lg block w-full p-4 focus:ring-blue-500 focus:border-blue-500"
              {...register("birthData", { required: "Birth Date is required" })}
            />
            {errors.birthData && (
              <span className="text-red-500">{errors.birthData.message}</span>
            )}
          </div>
          <div className="lg:col-span-2 flex justify-center mt-5">
          <button                 className="text-white bg-[#FEAF00] px-5 py-2 rounded lg:w-[30%]"
          >
  Save
</button>

          </div>
        </form>
      </div>
    </section>
  );
}
