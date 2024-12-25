import { useState, useEffect } from 'react';
import { Bounce, toast } from "react-toastify";
import Loader from './../Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LuPencil } from "react-icons/lu";
import { SlTrash } from "react-icons/sl";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  function handelShow(user: any) {
    setOpenModal(true);
    setUserId(user.id);
    setUserData(user);
  }

  function navigateToAddUser() {
    navigate("/dashboard/add-user");
  }

  async function getUsers() {
    try {
      const res = await axios.get(`https://dummyjson.com/users`);
      setUsers(res?.data?.users);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteUser() {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      setOpenModal(false);
      toast.success("User is deleted successfully!", {
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        transition: Bounce,
      });
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="w-full bg-[#f8f8f8] py-4">
          <div className="flex justify-between items-center m-5 flex-col sm:flex-row">
            <h3 className="font-bold text-lg mb-3 sm:mb-0">User List</h3>
            <button
              onClick={navigateToAddUser}
              className="font-medium text-sm px-5 bg-[#FEAF00] py-2 rounded-sm"
            >
              Add New User
            </button>
          </div>
          <hr className="m-5" />

          <div className="relative overflow-x-auto m-5 shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Profile</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Email</th>
                  <th scope="col" className="px-6 py-3">Phone</th>
                  <th scope="col" className="px-6 py-3">Enroll Number</th>
                  <th scope="col" className="px-6 py-3">Date of Admission</th>
                  <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, idx: number) => (
                  <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50"
                  >
                    <th scope="row" className="px-6 py-4">
                      <img src={user.image} className="w-10 h-10 rounded-full" alt="" />
                    </th>
                    <td className="px-6 py-4">{user.firstName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">{user.ein || "N/A"}</td>
                    <td className="px-6 py-4">{user.birthDate}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`/dashboard/update-user/${user.id}`}>
                        <LuPencil size={17} color="#FEAF00" className="cursor-pointer" />
                      </Link>
                      <SlTrash
                        onClick={() => handelShow(user)}
                        size={17}
                        color="#FEAF00"
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Modal
            show={openModal}
            size="md"
            onClose={() => setOpenModal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  Are you sure you want to delete {userData?.firstName} {userData?.lastName}?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={() => deleteUser()}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </section>
      )}
    </>
  );
}
