import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function Profile() {
  const user = JSON.parse(sessionStorage.getItem("innocomm_auth")) || {};
  const [editInfo, setEditInfo] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [newProfileData, setNewProfileData] = useState({});
  const [profileLoading, setProfileLoading] = useState(true);

  const getProfile = async () => {
    await axios({
      method: "get",
      url: "http://localhost:8000/accounts/api/users/profile",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response)
        setProfileData(response.data);
        setNewProfileData(response.data);
        setProfileLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        setProfileLoading(false);
      });
  };
  useEffect(() => {
    getProfile();
  }, []);

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setNewProfileData({
      ...newProfileData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    console.log(newProfileData);
    await axios({
      method: "put",
      url: "http://localhost:8000/accounts/api/users/profile",
      data: newProfileData,
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response);
        getProfile()
        setEditInfo(false)
      })
      .catch((error) => {
        // console.log(error);
      });
  };
  return (
    <div className="w-screen h-screen border">
      <div
        className="w-full mt-[56px] overflow-y-scroll"
        style={{ height: "calc(100% - 56px)" }}
      >
        <div className="w-fit m-auto flex">
          <h2 className="text-2xl font-medium text-center my-4 mx-3">
            Your Account
          </h2>
          <button
            className="text-green-700"
            onClick={() => {
              setEditInfo(!editInfo);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        <div className="w-full">
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            <span className="font-medium">Name</span>
            <span className="font-medium">{user.name}</span>
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            <span className="font-medium">Email</span>
            <span className="font-medium">{user.email}</span>
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            <span className="font-medium">Phone</span>
            <span className="font-medium">{user.contact}</span>
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12  sm:w-1/2 m-auto my-3 rounded-3xl">
            {editInfo ? (
              <input
                type="text"
                name="address"
                value={newProfileData.address || ""}
                placeholder="Address"
                className="bg-transparent outline-none w-full"
                onChange={handleProfileDataChange}
              />
            ) : (
              <>
                <span className="font-medium">Address</span>
                {profileLoading ? (
                  <p>Loading...</p>
                ) : (
                  <p className="font-medium mx-3">{profileData.address || "-----"}</p>
                )}
              </>
            )}
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            {editInfo ? (
              <input
                type="text"
                name="city"
                value={newProfileData.city || ""}
                placeholder="City"
                onChange={handleProfileDataChange}
                className="bg-transparent outline-none w-full"
              />
            ) : (
              <>
                <span className="font-medium">City</span>
                {profileLoading ? (
                  <p>Loading...</p>
                ) : (
                  <span className="font-medium">{profileData.city || "-----"}</span>
                )}
                
              </>
            )}
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            {editInfo ? (
              <input
                type="text"
                name="pin_code"
                value={newProfileData.pin_code || ""}
                placeholder="Zip"
                onChange={handleProfileDataChange}
                className="bg-transparent outline-none w-full"
              />
            ) : (
              <>
                <span className="font-medium">Zip</span>
                {profileLoading ? (
                  <p>Loading...</p>
                ) : (
                  <span className="font-medium">{profileData.pin_code || "-----"}</span>
                )}
                
              </>
            )}
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            {editInfo ? (
              <input
                type="text"
                name="state"
                value={newProfileData.state || ""}
                placeholder="State"
                onChange={handleProfileDataChange}
                className="bg-transparent outline-none w-full"
              />
            ) : (
              <>
                <span className="font-medium">State</span>
                {profileLoading ? (
                  <p>Loading...</p>
                ) : (
                  <span className="font-medium">{profileData.state || "-----"}</span>
                )}
              </>
            )}
          </div>
          <div className="p-3 bg-gray-100 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
            {editInfo ? (
              <input
                type="text"
                value={newProfileData.country || ""}
                placeholder="Country"
                name="country"
                onChange={handleProfileDataChange}
                className="bg-transparent outline-none w-full"
              />
            ) : (
              <>
                <span className="font-medium">Country</span>
                {profileLoading ? (
                  <p>Loading...</p>
                ) : (
                  <span className="font-medium">{profileData.country || "-----"}</span>
                )}
              </>
            )}
          </div>
          {editInfo && (
            <div className="p-3 flex justify-between w-11/12 sm:w-1/2 m-auto my-3 rounded-3xl">
              <button
                onClick={() => {
                  handleSubmit();
                }}
                className="bg-orange-300 p-3 rounded-lg hover:bg-orange-600 transition ease-in-out duration-700"
              >
                change
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
