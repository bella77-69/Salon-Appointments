import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchUserAppointments } from '../api/fetchItems';
import AppointmentItem from '../components/AppointmentItem';

const AppointmentLists = () => {
  const appointments = useSelector((state) => state.appointmentItems.appointmentItems);
  const logIn = useSelector((state) => state.user.logIn);

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  const heatMap = () => (
    <div>
      <h1>
        Loading...
      </h1>
    </div>
  );

  const appointmentMap = () => (
    <>
      {
       appointments && appointments.length
         ? appointments.map((item) => (
           <AppointmentItem key={item.id} items={item} />
         ))
         : (heatMap())
      }
    </>
  );

  return (
    <div className="Appointments">
      <h1 className="d-flex justify-content-center mb-3">Your Appointments:</h1>
      <div className="Appointments_Grid">
        {
          !logIn ? <Redirect to="/login" /> : (
            appointmentMap()
          )
        }
      </div>
    </div>
  );
};

export default AppointmentLists;
