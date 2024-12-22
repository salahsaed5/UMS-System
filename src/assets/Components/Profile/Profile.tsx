import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authContext } from "../Context/AuthContext";
import { useContext } from "react";

interface userFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phoneNumber: string;
  birthData: string;
}

export default function Profile() {
  const [userData1, setUserData1] = useState<any>(null);
  const { userData }: any = useContext(authContext);

  const userId =
    userData?.id ||
    JSON.parse(localStorage.getItem("userData") || "{}").id;

  const { register, setValue } = useForm<userFormData>({
    defaultValues: {
      firstName: userData1?.firstName || "",
      lastName: userData1?.lastName || "",
      email: userData1?.email || "",
      age: userData1?.age || 0,
      phoneNumber: userData1?.phone || "",
      birthData: userData1?.birthDate || "",
    },
  });

  async function getUser() {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/users/${userId}`
      );
      setUserData1(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, [userId]);

  useEffect(() => {
    if (userData1) {
      setValue("firstName", userData1.firstName);
      setValue("lastName", userData1.lastName);
      setValue("email", userData1.email);
      setValue("age", userData1.age);
      setValue("phoneNumber", userData1.phone);
      setValue("birthData", userData1.birthDate);
    }
  }, [userData1, setValue]);

  return (
    <>
      <section className="w-screen h-screen bg-[#f8f8f8] py-2">
        <div className="flex justify-between items-center m-5">
          <h3 className="font-bold">Profile</h3>
        </div>
        <hr className="m-5" />
        <div className="p-6">
          <form
            className="shadow-xl bg-white rounded-xl m-3 p-5 grid grid-cols-1 lg:grid-cols-2 gap-7 "
          >
            <div className="mb-5">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                First Name
              </label>
              <input
                disabled
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Last Name
              </label>
              <input
                disabled
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("lastName", { required: "Last Name is required" })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                disabled
                type="text"
                id="email"
                placeholder="Enter Email"
                className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter valid email",
                  },
                })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="age"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Age
              </label>
              <input
                disabled
                type="number"
                id="age"
                placeholder="Enter Age"
                className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("age", {
                  required: "Age is required",
                  max: { value: 50, message: "Max age is 50" },
                })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone Number
              </label>
              <input
                disabled
                type="text"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("phoneNumber", {
                  required: "Phone Number is required",
                })}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="birthData"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Birth Data
              </label>
              <input
                disabled
                type="text"
                id="birthData"
                placeholder="Enter Birth Data"
                className="bg-[#f8f8f8] border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                {...register("birthData", {
                  required: "Birth Data is required",
                })}
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
