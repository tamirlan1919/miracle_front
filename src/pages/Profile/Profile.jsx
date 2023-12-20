import React, { useEffect, useState } from 'react';
import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { authMe, updateProfile } from '../../redux/slice/authSlice';
import { useDropzone } from 'react-dropzone';
import { userData } from '../../helper';
import { FaUser } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import {Link} from 'react-router-dom'
import './Profile.css'
const Profile = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.auth);
   const {jwt} = userData()
  useEffect(() => {
    dispatch(authMe());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: data?.name || '',
    secondname: data?.secondname || '',
    lastname: data?.lastname || '',
    phone: data?.phoneNumber || '',
    date: data?.bd || '',
    user_picture: data?.avatarUrl || null,
    notification_settings: data?.notification_settings || true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    try {
      const formData = new FormData();
      formData.append('files', file);
      console.log(formData)
      const response = await fetch('http://localhost:1337/upload', {
        method: 'POST',
        body: formData,
        headers: {
            Authorization: `Bearer cc67839e13fb0704ac91b7eddc18679aab3154051e7eb35411441ffddebeb2a058d969176dc4e9da075499a0ed19f303950fb1e678ed1eae0576ec96b38b17e74cc9bb11298819184381f25ec4ef554fb07c39ad315fd85048976aa3fe0c55fbbf336c00d8468c515f16038977034459833bd356887c613d1dfed016bee51f89`, // Replace with your actual access token
          },
      });
      console.log(formData)
      const data = await response.json();

      setFormData((prevData) => ({
        ...prevData,
        user_picture: data[0]?.url || null,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="container profile">
      <div className="row">
        <h1>Личная информация</h1>
      <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <aside>
        <div class="profile-card">
        <Link to={`/profile`}>
            <button class="btn btn--icon text-5xl profile-card__logout-btn">
                <FaUser/>
            </button>
            </Link>
            
            <Link to={`/logout`}>
            <button class="btn btn--icon text-5xl profile-card__logout-btn">
                <IoIosExit/>
            </button>
            </Link>
        </div>
        <div class="links">
            <a href="/profile">Личная информация</a>
            <a href="/orders">Заказы</a>
            <a href="/favorites">Избранное</a>
        </div>
    </aside>

      </div>
        <div className="col-xl-8 col-lg-7 col-md-6 col-sm-12">
          <form onSubmit={handleSubmit}>
            <TextField
              label="Имя"
              name="name"
              className="mb-3"
              type="text"
              defaultValue={data?.name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Фамилия"
              name="secondname"
              className="mb-3"
              type="text"
              defaultValue={data?.secondname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Отчество"
              name="lastname"
              className="mb-3"
              type="text"
              defaultValue={data?.lastname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              type="date"
              name="date"
              className="mb-3"
              defaultValue={data?.bd}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Телефон"
              name="phone"
              className="mb-3"
              type="tel"
              defaultValue={data?.phoneNumber}
              onChange={handleInputChange}
              fullWidth
            />

            {/* ... Other input fields ... */}
   
            <br />
            <button type='sumbit' className='text-1xl text-white bg-black uppercase px-8 py-2 rounded-lg'>
              Сохранить
            
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
